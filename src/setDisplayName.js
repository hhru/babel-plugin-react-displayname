let displayNames = {};

const TRANSPILE_ANONYMOUS_FUNCTION_NAME_START_SYMBOL = '_';

module.exports = {
    resetCache() {
        displayNames = {};
    },
    setDisplayName(path, nameNodeId, types, name) {
        let abortAppend;

        if (Array.isArray(nameNodeId)) {
            abortAppend = nameNodeId.some(
                (node) => !node || types.isThisExpression(node.object) || (node.object && node.object.name === '_this') || types.isStringLiteral(node)
            );
        } else {
            const getName = (node) => (types.isMemberExpression(node) ? node.object.name : node.name);
            const declarationName = getName(nameNodeId);

            abortAppend =
                TRANSPILE_ANONYMOUS_FUNCTION_NAME_START_SYMBOL !== declarationName.charAt(0) &&
                declarationName.charAt(0) === declarationName.charAt(0).toLocaleLowerCase();
        }

        if (abortAppend || !name || displayNames[name]) {
            return;
        }

        const blockLevelStatement = path.find((path) => path.parentPath.isBlock());

        if (!blockLevelStatement) {
            return;
        }

        let node;

        if (Array.isArray(nameNodeId)) {
            for (let i = 0; i < nameNodeId.length; i += 2) {
                const propertyId = node ? nameNodeId[i] : nameNodeId[i + 1];
                node = types.memberExpression(node || nameNodeId[i], propertyId, types.isMemberExpression(propertyId));
            }
        } else {
            node = nameNodeId;
        }

        const displayNameStatement = types.expressionStatement(
            types.assignmentExpression(
                '=',
                types.memberExpression(node, types.identifier('displayName')),
                types.stringLiteral(name)
            )
        );

        displayNames[name] = true;
        blockLevelStatement.insertAfter(displayNameStatement);
    },
};
