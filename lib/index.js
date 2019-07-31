"use strict";

var pathNode = require('path');

var classHasRenderMethod = require('./classHasRenderMethod');

var _require = require('./setDisplayName'),
    setDisplayName = _require.setDisplayName,
    resetCache = _require.resetCache;

function transform(_ref) {
  var types = _ref.types;
  return {
    name: '@hh.ru/babel-plugin-react-displayname',
    visitor: {
      // Root point
      Program: function Program() {
        resetCache();
      },
      ClassDeclaration: function ClassDeclaration(path, state) {
        if (classHasRenderMethod(path)) {
          setDisplayName(path, path.node.id, types, getComponentName(path.node.id && path.node.id.name, state));
        }
      },
      JSXElement: function JSXElement(path, state) {
        var _findCandidate = findCandidate(path, types),
            id = _findCandidate.id,
            displayNamePath = _findCandidate.displayNamePath;

        if (!displayNamePath) {
          return;
        }

        var generateId;
        var name;

        var proccessName = function proccessName(node) {
          return types.isMemberExpression(node) ? "".concat(node.object.name, ".").concat(node.property.name) : node.name;
        };

        if (id) {
          name = Array.isArray(id) ? id.reduce(function (result, node) {
            return "".concat(result).concat(result ? '.' : '').concat(node ? proccessName(node) : '');
          }, '') : proccessName(id);
        }

        if (types.isExportDefaultDeclaration(displayNamePath.container) && displayNamePath.node.id == null && !types.isCallExpression(displayNamePath)) {
          generateId = displayNamePath.scope.generateUidIdentifier('uid');
          displayNamePath.node.id = generateId;
          name = 'noName';
        }

        if (name) {
          setDisplayName(displayNamePath, id || generateId, types, getComponentName(name, state));
        }
      }
    }
  };
}

function getComponentName(componentName, state) {
  var extension = pathNode.extname(state.file.opts.filename);
  var name = pathNode.basename(state.file.opts.filename, extension);
  var lastTwoFoldersWithFileName = state.file.opts.filename.match("([^/]+)/([^/]+)/".concat(name));
  return "".concat(lastTwoFoldersWithFileName && lastTwoFoldersWithFileName[0], "/").concat(componentName);
}

function findCandidate(parentPath, types) {
  var id;
  var displayNamePath;

  var findExpression = function findExpression(path) {
    var expressionId;
    var expressionPath;
    expressionPath = path.findParent(function (path) {
      if (path.isCallExpression() && path.node && path.node.callee && path.node.callee.name && path.node.callee.name === '_createClass') {
        expressionId = {};
        return true;
      }

      return false;
    });

    if (!expressionId) {
      expressionPath = path.findParent(function (path) {
        if (path.isAssignmentExpression()) {
          expressionId = path.node.left;
          return true;
        }

        if (path.isObjectProperty()) {
          expressionId = path.node.key;
          return true;
        }

        if (path.isCallExpression()) {
          expressionId = path.node.arguments[1];
          return true;
        }

        if (path.isVariableDeclarator()) {
          expressionId = path.node.id;
          return true;
        }

        return false;
      });
    }

    return {
      expressionId: expressionId,
      expressionPath: expressionPath
    };
  };

  function getMemberExpressionNodes(id, path) {
    var classPropertiesList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (types.isObjectProperty(path)) {
      if (classPropertiesList.length === 0) {
        classPropertiesList.push(id);
      }

      var _findExpression = findExpression(path),
          expressionId = _findExpression.expressionId,
          expressionPath = _findExpression.expressionPath;

      classPropertiesList.push(expressionId);
      getMemberExpressionNodes(expressionId, expressionPath, classPropertiesList);
    }

    return classPropertiesList;
  }

  var getFunctionExpressionId = function getFunctionExpressionId(path) {
    var _findExpression2 = findExpression(path),
        expressionId = _findExpression2.expressionId,
        expressionPath = _findExpression2.expressionPath;

    var memberExpressionNodes = getMemberExpressionNodes(expressionId, expressionPath);
    id = expressionId;

    if (memberExpressionNodes.length > 0) {
      id = memberExpressionNodes.reverse();
    }

    displayNamePath = expressionPath;
    return !!id;
  };

  parentPath.findParent(function (path) {
    if (path.isFunctionExpression()) {
      return getFunctionExpressionId(path);
    }

    if (path.isArrowFunctionExpression()) {
      return getFunctionExpressionId(path);
    }

    if (path.isFunctionDeclaration()) {
      id = path.node.id;
      displayNamePath = path;
      return !!id;
    }

    return false;
  });
  return {
    id: id,
    displayNamePath: displayNamePath
  };
}

module.exports = transform;