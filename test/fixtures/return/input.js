const emptyReturnFunctionComponent = () => {
    return;
};

const FunctionComponentConditionalReturn = function (value) {
    return true ? <div>{value}</div> : null
}
