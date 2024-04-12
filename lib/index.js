"use strict";

var pathNode = require('path');
var classHasRenderMethod = require('./classHasRenderMethod');
var _require = require('./setDisplayName'),
  setDisplayName = _require.setDisplayName,
  resetCache = _require.resetCache,
  GENERATED_CONSTANT_NAME = _require.GENERATED_CONSTANT_NAME;
var processedDeclarationNodes = [];
var appendComponentPath = function appendComponentPath(componentName, state) {
  var extension = pathNode.extname(state.file.opts.filename);
  var name = pathNode.basename(state.file.opts.filename, extension);
  var lastTwoFoldersWithFileName = state.file.opts.filename.match("([^/]+)/([^/]+)/".concat(name));
  return "".concat(lastTwoFoldersWithFileName ? lastTwoFoldersWithFileName[0] : '', "/").concat(componentName);
};
var getNodeId = function getNodeId(node, types) {
  if (types.isObjectProperty(node)) {
    return node.key;
  }
  if (types.isAssignmentExpression(node)) {
    return node.left;
  }
  return node.id;
};
var processName = function processName(node, isComputed, types) {
  var name = types.isMemberExpression(node) ? "".concat(node.object.name, ".").concat(node.property.name) : node.name;
  return isComputed ? "[".concat(name, "]") : ".".concat(name);
};
var getComplexDisplayName = function getComplexDisplayName(nameNodes, types) {
  return nameNodes.reduce(function (result, node) {
    return "".concat(result).concat(processName(getNodeId(node, types), types.isObjectProperty(node) && node.computed, types));
  }, '').slice(1);
};
var getObjectPropertyNameNodes = function getObjectPropertyNameNodes(path, types) {
  var nameNodes = [path.node];
  var next = path.findParent(function (path) {
    return path.isObjectProperty() && !types.isObjectPattern(path.parentPath.node);
  });
  if (next) {
    return nameNodes.concat(getObjectPropertyNameNodes(next, types));
  }
  return nameNodes;
};
var isProgramScope = function isProgramScope(path) {
  return path.scope.path.isProgram() || path.isDeclaration() && path.parentPath.isProgram();
};
var isDirectlyExported = function isDirectlyExported(path) {
  return path.parentPath.isExportDeclaration();
};
var isInClassBody = function isInClassBody(path) {
  return !!path.findParent(function (item) {
    return item.isClassBody();
  });
};
var findNameCandidates = function findNameCandidates(parentPath, types) {
  var candidates = [];
  parentPath.findParent(function (path) {
    if (path.isExportDefaultDeclaration()) {
      candidates.push(path);
      return true;
    }
    if (path.isFunctionDeclaration() && (isProgramScope(path) || isDirectlyExported(path))) {
      /* We're interested only in top one, remove previous declarations */
      candidates = candidates.filter(function (item) {
        return !item.isVariableDeclarator() && !item.isAssignmentExpression() && !item.isFunctionDeclaration();
      });
      candidates.push(path);
      return true;
    }
    if (path.isClassDeclaration()) {
      candidates.push(path);
      return false;
    }

    /* We filter ObjectPattern as it's an object destructuring */
    if (path.isObjectProperty() && !types.isObjectPattern(path.parentPath.node)) {
      if (candidates.some(function (item) {
        return item.isObjectProperty();
      })) {
        /* We're interested only in bottom one, will traverse up anyway */
        return false;
      }
      candidates.push(path);
      return false;
    }
    if ((path.isVariableDeclarator() || path.isAssignmentExpression()) && !isInClassBody(path)) {
      /* We're interested only in top one, remove previous declarations */
      candidates = candidates.filter(function (item) {
        return !item.isVariableDeclarator() && !item.isAssignmentExpression() && !item.isFunctionDeclaration();
      });
      candidates.push(path);
      return false;
    }
    return false;
  });
  return candidates;
};
var traverseParents = function traverseParents(path) {
  var result = [path];
  var nextParent = path.parentPath;
  while (nextParent && !nextParent.isProgram()) {
    result.push(nextParent);
    nextParent = nextParent.parentPath;
  }
  return result;
};
var cloneAsConstant = function cloneAsConstant(node, path, types) {
  var newNode = types.cloneNode(node);
  if (types.isFunctionDeclaration(newNode)) {
    /* Can not assign FunctionDeclaration to a constant, converting to FunctionExpression */
    newNode = types.functionExpression(newNode.id, newNode.params, newNode.body);
  }
  var id = path.scope.generateUidIdentifier(GENERATED_CONSTANT_NAME);
  var variableDeclaratorNode = types.variableDeclarator(id, newNode);
  var inserted = path.insertBefore(types.variableDeclaration('const', [variableDeclaratorNode]));
  return {
    id: id,
    variableDeclaratorNode: variableDeclaratorNode,
    insertedPath: inserted[0]
  };
};
var getCallExpressionFunctionParamIndex = function getCallExpressionFunctionParamIndex(parentsList, callerPath, callExpressionArguments) {
  var callerIndex = parentsList.indexOf(callerPath);
  var closestChildPath = parentsList[parentsList.findIndex(function (item, index) {
    return item.isCallExpression() && index < callerIndex;
  }) - 1];
  return callExpressionArguments.findIndex(function (item) {
    return item === closestChildPath.node;
  });
};
var isComponentCall = function isComponentCall(jsxElementPath, parents, types) {
  var openingElementNode = jsxElementPath.node.openingElement.name;
  while (types.isJSXMemberExpression(openingElementNode)) {
    openingElementNode = openingElementNode.object;
  }
  var elementName = openingElementNode.name;
  if (elementName === 'Fragment' || elementName.charAt(0) === elementName.charAt(0).toLocaleLowerCase()) {
    return false;
  }
  var firstFunctionParent = parents.findIndex(function (item) {
    return item.isArrowFunctionExpression() || item.isFunctionDeclaration() || item.isFunctionExpression();
  });
  if (firstFunctionParent === -1) {
    return true;
  }
  var firstDeclaratorParent = parents.findIndex(function (item) {
    return item.isVariableDeclarator() || item.isAssignmentExpression();
  });
  return firstDeclaratorParent !== -1 && firstDeclaratorParent < firstFunctionParent;
};
function transform(_ref) {
  var types = _ref.types;
  var parseElement = function parseElement(path, state) {
    var parents = traverseParents(path);
    if (path.isJSXElement() && (isComponentCall(path, parents, types) || parents.some(function (item) {
      return item !== path && (item.isJSXElement() || item.isJSXFragment());
    }))) {
      return;
    }
    var candidates = findNameCandidates(path, types);
    if (!candidates.length) {
      return;
    }
    var displayNamePlacements = [];
    candidates.forEach(function (candidatePath) {
      if (processedDeclarationNodes.includes(candidatePath.node)) {
        return;
      }

      /* Will only process default export if nothing worked so far */
      if (candidatePath.isExportDefaultDeclaration() && displayNamePlacements.length === 0) {
        if (types.isCallExpression(candidatePath.node.declaration)) {
          var callExpressionArguments = candidatePath.node.declaration.arguments;
          var paramIndex = getCallExpressionFunctionParamIndex(parents, candidatePath, callExpressionArguments);
          if (paramIndex === -1) {
            return;
          }
          var _cloneAsConstant = cloneAsConstant(callExpressionArguments[paramIndex], candidatePath, types),
            id = _cloneAsConstant.id,
            variableDeclaratorNode = _cloneAsConstant.variableDeclaratorNode,
            insertedPath = _cloneAsConstant.insertedPath;
          callExpressionArguments[paramIndex] = id;
          processedDeclarationNodes.push(variableDeclaratorNode);
          processedDeclarationNodes.push(candidatePath.node);
          displayNamePlacements.push({
            id: id,
            path: insertedPath,
            name: 'NoName'
          });
        } else {
          var _cloneAsConstant2 = cloneAsConstant(candidatePath.node.declaration, candidatePath, types),
            _id = _cloneAsConstant2.id,
            _variableDeclaratorNode = _cloneAsConstant2.variableDeclaratorNode,
            _insertedPath = _cloneAsConstant2.insertedPath;
          candidatePath.node.declaration = _id;
          processedDeclarationNodes.push(_variableDeclaratorNode);
          processedDeclarationNodes.push(candidatePath.node);
          displayNamePlacements.push({
            id: _id,
            path: _insertedPath,
            name: 'NoName'
          });
        }
        return;
      }
      if (candidatePath.isFunctionDeclaration()) {
        if (!candidatePath.node.id) {
          /* anonymous function */
          candidatePath.node.id = candidatePath.scope.generateUidIdentifier(GENERATED_CONSTANT_NAME);
          displayNamePlacements.push({
            id: candidatePath.node.id,
            path: candidatePath,
            name: 'NoName'
          });
        } else {
          displayNamePlacements.push({
            id: candidatePath.node.id,
            path: candidatePath,
            name: candidatePath.node.id.name
          });
        }
      }
      if (candidatePath.isClassDeclaration()) {
        displayNamePlacements.push({
          id: candidatePath.node.id,
          path: candidatePath,
          name: candidatePath.node.id.name
        });
      }
      if (candidatePath.isAssignmentExpression()) {
        displayNamePlacements.push({
          id: candidatePath.node.left,
          path: candidatePath.parentPath,
          name: candidatePath.node.left.name
        });
      }
      if (candidatePath.isVariableDeclarator()) {
        if (types.isCallExpression(candidatePath.node.init)) {
          var _callExpressionArguments = candidatePath.node.init.arguments;
          var _paramIndex = getCallExpressionFunctionParamIndex(parents, candidatePath, _callExpressionArguments);
          if (_paramIndex === -1) {
            return;
          }
          var _cloneAsConstant3 = cloneAsConstant(_callExpressionArguments[_paramIndex], candidatePath.parentPath, types),
            _id2 = _cloneAsConstant3.id,
            _variableDeclaratorNode2 = _cloneAsConstant3.variableDeclaratorNode,
            _insertedPath2 = _cloneAsConstant3.insertedPath;
          _callExpressionArguments[_paramIndex] = _id2;
          processedDeclarationNodes.push(_variableDeclaratorNode2);
          processedDeclarationNodes.push(candidatePath.node);
          displayNamePlacements.push({
            id: _id2,
            path: _insertedPath2,
            name: candidatePath.node.id.name
          });
        } else {
          displayNamePlacements.push({
            id: candidatePath.node.id,
            path: candidatePath.parentPath,
            name: candidatePath.node.id.name
          });
        }
      }
      if (candidatePath.isObjectProperty()) {
        var objectExpression = candidatePath.findParent(function (path) {
          return path.isObjectExpression() && !path.parentPath.isObjectProperty();
        });
        if (!objectExpression) {
          return;
        }
        var objectNamePath = objectExpression.parentPath;
        if (!objectNamePath.isVariableDeclarator() && !objectNamePath.isAssignmentExpression()) {
          return;
        }
        processedDeclarationNodes.push(objectNamePath.node);
        var nameNodes = [objectNamePath.node].concat(getObjectPropertyNameNodes(candidatePath, types).reverse());
        displayNamePlacements.push({
          id: nameNodes.map(function (item) {
            return getNodeId(item, types);
          }),
          path: objectNamePath,
          name: getComplexDisplayName(nameNodes, types)
        });
      }
    });
    displayNamePlacements.forEach(function (_ref2) {
      var id = _ref2.id,
        path = _ref2.path,
        name = _ref2.name;
      setDisplayName(path, id, types, appendComponentPath(name, state));
    });
  };
  return {
    name: '@hh.ru/babel-plugin-react-displayname',
    visitor: {
      // Root point
      Program: function Program() {
        resetCache();
        processedDeclarationNodes = [];
      },
      ClassDeclaration: function ClassDeclaration(path, state) {
        if (classHasRenderMethod(path)) {
          setDisplayName(path, path.node.id, types, appendComponentPath(path.node.id && path.node.id.name, state));
        }
      },
      JSXElement: parseElement,
      JSXFragment: parseElement
    }
  };
}
module.exports = transform;