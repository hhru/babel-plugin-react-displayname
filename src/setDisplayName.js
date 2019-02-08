module.exports = function (path, nameNodeId, types, name) {
    const blockLevelStatement = path.find((path) => path.parentPath.isBlock());
    
    if (!blockLevelStatement) {
        return
    }

    const displayNameStatement = types.expressionStatement(
        types.assignmentExpression(
            '=',
            types.memberExpression(nameNodeId, types.identifier('displayName')),
            types.stringLiteral(name || nameNodeId.name)
        )
    );

    blockLevelStatement.insertAfter(displayNameStatement);
};
