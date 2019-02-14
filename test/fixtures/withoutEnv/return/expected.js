const emptyReturnFunctionComponent = () => {
    return;
};

const FunctionComponentConditionalReturn = function (value) {
    return true ? React.createElement(
        "div",
        null,
        value
    ) : null;
};
FunctionComponentConditionalReturn.displayName = "withoutEnv/return/input/FunctionComponentConditionalReturn";
