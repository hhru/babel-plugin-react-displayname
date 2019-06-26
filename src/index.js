const pathNode = require('path');

const classHasRenderMethod = require('./classHasRenderMethod');
const { setDisplayName, resetCache } = require('./setDisplayName');

function transform({ types }) {
    return {
        name: 'babel-plugin-transform-es2015-unicode-regex',
        visitor: {
            // Root point
            Program() {
                resetCache();
            },
            ClassDeclaration(path, state) {
                if (classHasRenderMethod(path)) {
                    setDisplayName(
                        path,
                        path.node.id,
                        types,
                        getComponentName(path.node.id && path.node.id.name, state)
                    );
                }
            },
            JSXElement(path, state) {
                const { id, displayNamePath } = findCandidate(path, types);

                if (displayNamePath) {
                    let generateId;
                    let name = Array.isArray(id) ? id : id && id.name;

                    if (displayNamePath.container && types.isExportDefaultDeclaration(displayNamePath.container)) {
                        if (displayNamePath.node.id == null) {
                            generateId = displayNamePath.scope.generateUidIdentifier('uid');
                            displayNamePath.node.id = generateId;
                            name = 'noName';
                        }
                    }

                    if (name) {
                        setDisplayName(displayNamePath, id || generateId, types, getComponentName(name, state, types));
                    }
                }
            },
        },
    };
}

function getComponentName(componentName, state, types) {
    const extension = pathNode.extname(state.file.opts.filename);
    const name = pathNode.basename(state.file.opts.filename, extension);
    const lastTwoFoldersWithFileName = state.file.opts.filename.match(`([^/]+)\/([^/]+)\/${name}`);

    const proccessName = (node) => {
        if (types.isMemberExpression(node)) {
            return `${node.object.name}.${node.property.name}`;
        }

        return node.name;
    };

    const nameComponent = Array.isArray(componentName)
        ? componentName.reverse().reduce((result, node) => `${result}${result ? '.' : ''}${proccessName(node)}`, '')
        : componentName;
    
    return `${lastTwoFoldersWithFileName && lastTwoFoldersWithFileName[0]}/${nameComponent}`;
}

function findCandidate(parentPath, types) {
    let id;
    let displayNamePath;

    const findExpression = (path) => {
        let expressionId;
        let expressionPath;

        expressionPath = path.findParent((path) => {
            if (path.isCallExpression()) {
                if (
                    path.node &&
                    path.node.callee &&
                    path.node.callee.name &&
                    path.node.callee.name === '_createClass'
                ) {
                    expressionId = {};
                    return true;
                }
                return false;
            }
        });

        if (!expressionId) {
            expressionPath = path.findParent((path) => {
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

    function getMemberExpressionDeep(id, path, classPropertiesList = []) {
        if (types.isObjectProperty(path)) {
            if (classPropertiesList.length === 0) {
                classPropertiesList.push(id);
            }
            const { expressionId, expressionPath } = findExpression(path);
            classPropertiesList.push(expressionId);
            getMemberExpressionDeep(expressionId, expressionPath, classPropertiesList);
        }

        return classPropertiesList;
    }

    const getArrowId = (path) => {
        const { expressionId, expressionPath } = findExpression(path);
        const list = getMemberExpressionDeep(expressionId, expressionPath);

        id = expressionId;

        if (list.length > 0) {
            id = list;
        }

        displayNamePath = expressionPath;
        return !!id;
    };

    parentPath.findParent((path) => {
        if (path.isFunctionExpression()) {
            return getArrowId(path);
        }

        if (path.isArrowFunctionExpression()) {
            return getArrowId(path);
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
