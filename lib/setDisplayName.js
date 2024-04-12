"use strict";

var displayNames = {};
var TRANSPILE_ANONYMOUS_FUNCTION_NAME_START_SYMBOL = '_';
var GENERATED_CONSTANT_NAME = 'generatedConstant';
module.exports = {
  GENERATED_CONSTANT_NAME: GENERATED_CONSTANT_NAME,
  resetCache: function resetCache() {
    displayNames = {};
  },
  setDisplayName: function setDisplayName(path, nameNodeId, types, name) {
    var abortAppend;
    var isGenerated;
    if (Array.isArray(nameNodeId)) {
      abortAppend = nameNodeId.some(function (node) {
        return !node || types.isThisExpression(node.object) || node.object && node.object.name === '_this' || types.isStringLiteral(node);
      });
    } else {
      var getName = function getName(node) {
        return types.isMemberExpression(node) ? node.object.name : node.name;
      };
      var declarationName = getName(nameNodeId);
      abortAppend = TRANSPILE_ANONYMOUS_FUNCTION_NAME_START_SYMBOL !== declarationName.charAt(0) && declarationName.charAt(0) === declarationName.charAt(0).toLocaleLowerCase();
    }
    if (abortAppend || !name || displayNames[name] || isGenerated) {
      return;
    }
    var blockLevelStatement = path.find(function (path) {
      return path.parentPath.isBlock();
    });
    if (!blockLevelStatement) {
      return;
    }
    var node;
    if (Array.isArray(nameNodeId)) {
      for (var i = 0; i < nameNodeId.length; i += 2) {
        var propertyId = node ? nameNodeId[i] : nameNodeId[i + 1];
        node = types.memberExpression(node || nameNodeId[i], propertyId, types.isMemberExpression(propertyId));
      }
    } else {
      node = nameNodeId;
    }
    var displayNameStatement = types.expressionStatement(types.assignmentExpression('=', types.memberExpression(node, types.identifier('displayName')), types.stringLiteral(name)));
    displayNames[name] = true;
    blockLevelStatement.insertAfter(displayNameStatement);
  }
};