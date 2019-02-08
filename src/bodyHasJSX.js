module.exports = function(body, types) {
    if (!body) {
        return false;
    }

    if (types.isJSXElement(body)) {
        return true;
    }

    const block = body.body;

    if (block && block.length) {
        const lastBlock = block.slice(0).pop();

        if (types.isReturnStatement(lastBlock)) {
            const { argument } = lastBlock;

            return (
                argument !== null &&
                (types.isJSXElement(argument) ||
                    (types.isConditionalExpression(argument) &&
                        (types.isJSXElement(argument.alternate) || types.isJSXElement(argument.consequent))))
            );
        }
    }

    return false;
};
