"use strict";

module.exports = function (path) {
  if (!path.node.body) {
    return false;
  }
  return path.node.body.body.some(function (_ref) {
    var type = _ref.type,
      key = _ref.key;
    return type == 'ClassMethod' && key.name == 'render';
  });
};