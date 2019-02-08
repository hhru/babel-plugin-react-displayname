const pathNode = require('path');

const classHasRenderMethod = require('./classHasRenderMethod');
const bodyHasJSX = require('./bodyHasJSX');
const setDisplayName = require('./setDisplayName');

function transform({ types }) {
    return {
        visitor: {
            ClassDeclaration: function(path) {
                if (classHasRenderMethod(path)) {
                    setDisplayName(path, path.node.id, types);
                }
            },
            FunctionDeclaration: function(path, state) {
                if (bodyHasJSX(path.node.body || (path.node.id && path.node.id.name), types)) {
                    if (types.isExportDefaultDeclaration(path.parentPath.node)) {
                        let displayName;

                        if (path.node.id == null) {
                            const extension = pathNode.extname(state.file.opts.filename);
                            const name = pathNode.basename(state.file.opts.filename, extension);
                            const id = path.scope.generateUidIdentifier('uid');

                            path.node.id = id;
                            displayName = name;
                        }
                        setDisplayName(path, path.node.id, types, displayName);
                    } else if (
                        types.isProgram(path.parentPath.node) ||
                        types.isExportNamedDeclaration(path.parentPath.node)
                    ) {
                        setDisplayName(path, path.node.id, types);
                    }
                }
            },
            FunctionExpression: function(path) {
                if (shouldSetDisplayNameForFuncExpr(path, types)) {
                    const id = findCandidateNameForExpression(path);

                    if (id) {
                        setDisplayName(path, id, types);
                    }
                }
            },
            ArrowFunctionExpression: function(path) {
                if (shouldSetDisplayNameForFuncExpr(path, types)) {
                    const id = findCandidateNameForExpression(path);

                    if (id) {
                        setDisplayName(path, id, types);
                    }
                }
            },
        },
    };
}

function shouldSetDisplayNameForFuncExpr(path, types) {
    let id;

    if (
        types.isAssignmentExpression(path.parentPath.node) &&
        !types.isMemberExpression(path.parentPath.node.left) &&
        types.isExpressionStatement(path.parentPath.parentPath.node) &&
        types.isProgram(path.parentPath.parentPath.parentPath.node)
    ) {
        id = path.parentPath.node.left;
    } else if (
        types.isVariableDeclarator(path.parentPath.node) &&
        (types.isExportNamedDeclaration(path.parentPath.parentPath.parentPath.node) ||
            types.isProgram(path.parentPath.parentPath.parentPath.node))
    ) {
        id = path.parentPath.node.id;
    }

    if (id) {
        return bodyHasJSX(path.node.body, types);
    }

    return false;
}

// https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-react-display-name/src/index.js#L80
// crawl up the ancestry looking for possible candidates for displayName inference
function findCandidateNameForExpression(path) {
    let id;
    
    path.find(function(path) {
        if (path.isAssignmentExpression()) {
            id = path.node.left;
        } else if (path.isObjectProperty()) {
            id = path.node.key;
        } else if (path.isVariableDeclarator()) {
            id = path.node.id;
        } else if (path.isStatement()) {
            // we've hit a statement, we should stop crawling up
            return true;
        }

        // we've got an id! no need to continue
        if (id) return true;
    });
    
    return id;
}

module.exports = transform;
