function FunctionComponent(value) {
  return <div>{value}</div>
}

const FunctionComponentVariableDeclaration = function (value) {
  return <div>{value}</div>
}

export function FunctionComponentNamedExport(value) {
  return <div>{value}</div>
}

export const FunctionComponentVariableDeclarationNamedExport = function (value) {
  return <div>{value}</div>
}

let FunctionComponentVariableDeclarationAssignmentExpression;
FunctionComponentVariableDeclarationAssignmentExpression = function (value) {
  return <div>{value}</div>
}

export default function FunctionComponentDefaultExport (value) {
  return <div>{value}</div>
}

var FunctionComponentArrow = ({value}) => {
  return (
    <div>{value}</div>
  )
}
