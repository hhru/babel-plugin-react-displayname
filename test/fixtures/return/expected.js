import { jsx as _jsx } from "react/jsx-runtime";
const emptyReturnFunctionComponent = () => {
  return;
};
const FunctionComponentConditionalReturn = function (value) {
  return true ? /*#__PURE__*/_jsx("div", {
    children: value
  }) : null;
};
FunctionComponentConditionalReturn.displayName = "fixtures/return/input/FunctionComponentConditionalReturn";