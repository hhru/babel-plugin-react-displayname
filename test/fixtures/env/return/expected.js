"use strict";

var emptyReturnFunctionComponent = function emptyReturnFunctionComponent() {
  return;
};

var FunctionComponentConditionalReturn = function FunctionComponentConditionalReturn(value) {
  return true ? React.createElement("div", null, value) : null;
};

FunctionComponentConditionalReturn.displayName = "env/return/input/FunctionComponentConditionalReturn";
