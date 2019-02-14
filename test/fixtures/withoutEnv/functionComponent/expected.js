function FunctionComponent(value) {
  return React.createElement(
    "div",
    null,
    value
  );
}

FunctionComponent.displayName = "withoutEnv/functionComponent/input/FunctionComponent";
const FunctionComponentVariableDeclaration = function (value) {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentVariableDeclaration.displayName = "withoutEnv/functionComponent/input/FunctionComponentVariableDeclaration";
export function FunctionComponentNamedExport(value) {
  return React.createElement(
    "div",
    null,
    value
  );
}

FunctionComponentNamedExport.displayName = "withoutEnv/functionComponent/input/FunctionComponentNamedExport";
export const FunctionComponentVariableDeclarationNamedExport = function (value) {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentVariableDeclarationNamedExport.displayName = "withoutEnv/functionComponent/input/FunctionComponentVariableDeclarationNamedExport";
let FunctionComponentVariableDeclarationAssignmentExpression;
FunctionComponentVariableDeclarationAssignmentExpression = function (value) {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentVariableDeclarationAssignmentExpression.displayName = "withoutEnv/functionComponent/input/FunctionComponentVariableDeclarationAssignmentExpression";
const FunctionComponentVariableDeclarationReturnList = ({ list }) => {
  if (list.length === 0) {
    return null;
  }
  return list.map(({ url, id, text }) => React.createElement(
    "div",
    { className: "item", key: id },
    React.createElement(
      "a",
      { href: url, target: "_blank" },
      text
    )
  ));
};

FunctionComponentVariableDeclarationReturnList.displayName = "withoutEnv/functionComponent/input/FunctionComponentVariableDeclarationReturnList";
export default function FunctionComponentDefaultExport(value) {
  return React.createElement(
    "div",
    null,
    value
  );
}

FunctionComponentDefaultExport.displayName = "withoutEnv/functionComponent/input/FunctionComponentDefaultExport";
var FunctionComponentArrow = ({ value }) => {
  return React.createElement(
    "div",
    null,
    value
  );
};

FunctionComponentArrow.displayName = "withoutEnv/functionComponent/input/FunctionComponentArrow";
function FunctionComponentReturnList({ list }) {
  if (list.length === 0) {
    return null;
  }
  return list.map(({ url, id, text }) => React.createElement(
    "div",
    { className: "item", key: id },
    React.createElement(
      "a",
      { href: url, target: "_blank" },
      text
    )
  ));
}

FunctionComponentReturnList.displayName = "withoutEnv/functionComponent/input/FunctionComponentReturnList";
const FunctionComponentVariableDeclarationVariableContent = () => {
  const content = React.createElement(
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
FunctionComponentVariableDeclarationVariableContent.displayName = "withoutEnv/functionComponent/input/FunctionComponentVariableDeclarationVariableContent";
