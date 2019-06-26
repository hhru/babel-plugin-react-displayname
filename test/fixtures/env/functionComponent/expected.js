"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionComponentNamedExport = FunctionComponentNamedExport;
exports.default = FunctionComponentDefaultExport;
function FunctionComponent(value) {
  return React.createElement(
    "div",
    null,
    value
  );
}

FunctionComponent.displayName = "env/functionComponent/input/FunctionComponent";
var FunctionComponentVariableDeclaration = function FunctionComponentVariableDeclaration(value) {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentVariableDeclaration.displayName = "env/functionComponent/input/FunctionComponentVariableDeclaration";
function FunctionComponentNamedExport(value) {
  return React.createElement(
    "div",
    null,
    value
  );
}

FunctionComponentNamedExport.displayName = "env/functionComponent/input/FunctionComponentNamedExport";
var FunctionComponentVariableDeclarationNamedExport = exports.FunctionComponentVariableDeclarationNamedExport = function FunctionComponentVariableDeclarationNamedExport(value) {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentVariableDeclarationNamedExport.displayName = "env/functionComponent/input/FunctionComponentVariableDeclarationNamedExport";
var FunctionComponentVariableDeclarationAssignmentExpression = void 0;
FunctionComponentVariableDeclarationAssignmentExpression = function FunctionComponentVariableDeclarationAssignmentExpression(value) {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentVariableDeclarationAssignmentExpression.displayName = "env/functionComponent/input/FunctionComponentVariableDeclarationAssignmentExpression";
var FunctionComponentVariableDeclarationReturnList = function FunctionComponentVariableDeclarationReturnList(_ref) {
  var list = _ref.list;

  if (list.length === 0) {
    return null;
  }
  return list.map(function (_ref2) {
    var url = _ref2.url,
        id = _ref2.id,
        text = _ref2.text;
    return React.createElement(
      "div",
      { className: "item", key: id },
      React.createElement(
        "a",
        { href: url, target: "_blank" },
        text
      )
    );
  });
};

FunctionComponentVariableDeclarationReturnList.displayName = "env/functionComponent/input/FunctionComponentVariableDeclarationReturnList";
function FunctionComponentDefaultExport(value) {
  return React.createElement(
    "div",
    null,
    value
  );
}

FunctionComponentDefaultExport.displayName = "env/functionComponent/input/FunctionComponentDefaultExport";
var FunctionComponentArrow = function FunctionComponentArrow(_ref3) {
  var value = _ref3.value;

  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentArrow.displayName = "env/functionComponent/input/FunctionComponentArrow";
function FunctionComponentReturnList(_ref4) {
  var list = _ref4.list;

  if (list.length === 0) {
    return null;
  }
  return list.map(function (_ref5) {
    var url = _ref5.url,
        id = _ref5.id,
        text = _ref5.text;
    return React.createElement(
      "div",
      { className: "item", key: id },
      React.createElement(
        "a",
        { href: url, target: "_blank" },
        text
      )
    );
  });
}

FunctionComponentReturnList.displayName = "env/functionComponent/input/FunctionComponentReturnList";
var FunctionComponentVariableDeclarationVariableContent = function FunctionComponentVariableDeclarationVariableContent() {
  var content = React.createElement(
    Fragment,
    null,
    React.createElement(
      "p",
      null,
      "tets"
    )
  );

  return content;
};
FunctionComponentVariableDeclarationVariableContent.displayName = "env/functionComponent/input/FunctionComponentVariableDeclarationVariableContent";