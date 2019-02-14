const pathNode = require('path');

const classHasRenderMethod = require('./classHasRenderMethod');
const setDisplayName = require('./setDisplayName');

function transform({ types }) {
    return {
        name: 'babel-plugin-transform-es2015-unicode-regex',
        visitor: {
            ClassDeclaration: function(path, state) {
                if (classHasRenderMethod(path)) {
                    setDisplayName(
                      path,
                      path.node.id,
                      types,
                      getComponentName(path.node.id && path.node.id.name, state)
                    );
                }
            },
            JSXElement: function(path, state) {
                const { id, displayNamePath } = findCandidate(path);
                
                if (displayNamePath) {
                    let generateId;
                    let name = id && id.name;
                    
                    if (displayNamePath.container && types.isExportDefaultDeclaration(displayNamePath.container)) {
                        if (displayNamePath.node.id == null) {
                            generateId = displayNamePath.scope.generateUidIdentifier('uid');
                            displayNamePath.node.id = generateId;
                            name = 'noName';
                        }
                    }
                    
                    
                    
                    if (name) {
                        setDisplayName(
                          displayNamePath,
                          id || generateId,
                          types,
                          getComponentName(name, state)
                        );
                    }
                }
            },
        },
    };
}

function getComponentName(componentName='noName', state) {
    const extension = pathNode.extname(state.file.opts.filename);
    const name = pathNode.basename(state.file.opts.filename, extension);
    const lastTwoFoldersWithFileName = state.file.opts.filename.match(`([^/]+)\/([^/]+)\/${name}`);
    
    return `${lastTwoFoldersWithFileName && lastTwoFoldersWithFileName[0]}/${componentName}`;
}

function findCandidate(parentPath) {
    let id;
    let displayNamePath;
    
    const findExpression = (path) => {
        let expressionId;
        let expressionPath;
        
        expressionPath = path.findParent((path) => {
            if (path.isCallExpression()) {
                if (
                  path.node &&
                  path.node.arguments &&
                  path.node.arguments[0] &&
                  path.node.arguments[0].type === 'Identifier'
                ) {
                    expressionId = path.node.arguments[0].name;
                }
                return true;
            }
        });
        
        if (!expressionId) {
            expressionPath = path.findParent(function(path) {
                if (path.isAssignmentExpression()) {
                    expressionId = path.node.left;
                    return true;
                }
                
                if (path.isObjectProperty()) {
                    expressionId = path.node.key;
                    return true;
                }
                
                if (path.isVariableDeclarator()) {
                    expressionId = path.node.id;
                    return true;
                }
            });
        }
        
        return { expressionId, expressionPath };
    };
    
    parentPath.findParent(function(path) {
        if (path.isFunctionExpression()) {
            const { expressionId, expressionPath } = findExpression(path);
            id = expressionId;
            displayNamePath = expressionPath;
            return !!id;
        }
        
        if (path.isArrowFunctionExpression()) {
            const { expressionId, expressionPath } = findExpression(path);
            id = expressionId;
            displayNamePath = expressionPath;
            return !!id;
        }
        
        if (path.isFunctionDeclaration()) {
            id = path.node.id;
            displayNamePath = path;
            return !!id;
        }
    });
    
    return {
        id,
        displayNamePath,
    };
}

module.exports = transform;
