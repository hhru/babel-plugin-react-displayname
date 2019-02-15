let displayNames = {};

module.exports = {
    resetCache: function() {
        displayNames = {};
    },
    setDisplayName: function(path, nameNodeId, types, name) {
        const blockLevelStatement = path.find((path) => path.parentPath.isBlock());

        if (!blockLevelStatement || !name || displayNames[name]) {
            return;
        }

        const displayNameStatement = types.expressionStatement(
            types.assignmentExpression(
                '=',
                types.memberExpression(nameNodeId, types.identifier('displayName')),
                types.stringLiteral(name)
            )
        );

        displayNames[name] = true;
        blockLevelStatement.insertAfter(displayNameStatement);
    },
};
