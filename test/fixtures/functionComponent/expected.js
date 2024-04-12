import { jsx as _jsx } from "react/jsx-runtime";
function FunctionComponent(value) {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
}
FunctionComponent.displayName = "fixtures/functionComponent/input/FunctionComponent";
const FunctionComponentVariableDeclaration = function (value) {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
};
FunctionComponentVariableDeclaration.displayName = "fixtures/functionComponent/input/FunctionComponentVariableDeclaration";
export function FunctionComponentNamedExport(value) {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
}
FunctionComponentNamedExport.displayName = "fixtures/functionComponent/input/FunctionComponentNamedExport";
export const FunctionComponentVariableDeclarationNamedExport = function (value) {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
};
FunctionComponentVariableDeclarationNamedExport.displayName = "fixtures/functionComponent/input/FunctionComponentVariableDeclarationNamedExport";
let FunctionComponentVariableDeclarationAssignmentExpression;
FunctionComponentVariableDeclarationAssignmentExpression = function (value) {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
};
FunctionComponentVariableDeclarationAssignmentExpression.displayName = "fixtures/functionComponent/input/FunctionComponentVariableDeclarationAssignmentExpression";
const FunctionComponentVariableDeclarationReturnList = ({
  list
}) => {
  if (list.length === 0) {
    return null;
  }
  return list.map(({
    url,
    id,
    text
  }) => /*#__PURE__*/_jsx("div", {
    className: "item",
    children: /*#__PURE__*/_jsx("a", {
      href: url,
      target: "_blank",
      children: text
    })
  }, id));
};
FunctionComponentVariableDeclarationReturnList.displayName = "fixtures/functionComponent/input/FunctionComponentVariableDeclarationReturnList";
export default function FunctionComponentDefaultExport(value) {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
}
FunctionComponentDefaultExport.displayName = "fixtures/functionComponent/input/FunctionComponentDefaultExport";
var FunctionComponentArrow = ({
  value
}) => {
  return /*#__PURE__*/_jsx("div", {
    children: value
  });
};
FunctionComponentArrow.displayName = "fixtures/functionComponent/input/FunctionComponentArrow";
function FunctionComponentReturnList({
  list
}) {
  if (list.length === 0) {
    return null;
  }
  return list.map(({
    url,
    id,
    text
  }) => /*#__PURE__*/_jsx("div", {
    className: "item",
    children: /*#__PURE__*/_jsx("a", {
      href: url,
      target: "_blank",
      children: text
    })
  }, id));
}
FunctionComponentReturnList.displayName = "fixtures/functionComponent/input/FunctionComponentReturnList";
const FunctionComponentVariableDeclarationVariableContent = () => {
  const content = /*#__PURE__*/_jsx(Fragment, {
    children: /*#__PURE__*/_jsx("p", {
      children: "tets"
    })
  });
  return content;
};
FunctionComponentVariableDeclarationVariableContent.displayName = "fixtures/functionComponent/input/FunctionComponentVariableDeclarationVariableContent";