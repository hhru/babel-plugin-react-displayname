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

                if (!displayNamePath) {
                    return;
                }

                let generateId;
                let name;

                const proccessName = (node) =>
                    types.isMemberExpression(node) ? `${node.object.name}.${node.property.name}` : node.name;

                if (id) {
                    name = Array.isArray(id)
                        ? id.reduce((result, node) => `${result}${result ? '.' : ''}${proccessName(node)}`, '')
                        : proccessName(id);
                }

                if (types.isExportDefaultDeclaration(displayNamePath.container) && displayNamePath.node.id == null) {
                    generateId = displayNamePath.scope.generateUidIdentifier('uid');
                    displayNamePath.node.id = generateId;
                    name = 'noName';
                }

                if (name) {
                    setDisplayName(displayNamePath, id || generateId, types, getComponentName(name, state));
                }
            },
        },
    };
}

function getComponentName(componentName, state) {
    const extension = pathNode.extname(state.file.opts.filename);
    const name = pathNode.basename(state.file.opts.filename, extension);
    const lastTwoFoldersWithFileName = state.file.opts.filename.match(`([^/]+)\/([^/]+)\/${name}`);

    return `${lastTwoFoldersWithFileName && lastTwoFoldersWithFileName[0]}/${componentName}`;
}

function findCandidate(parentPath, types) {
    let id;
    let displayNamePath;

    const findExpression = (path) => {
        let expressionId;
        let expressionPath;

        expressionPath = path.findParent((path) => {
            if (
                path.isCallExpression() &&
                path.node &&
                path.node.callee &&
                path.node.callee.name &&
                path.node.callee.name === '_createClass'
            ) {
                expressionId = {};
                return true;
            }

            return false;
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

                return false;
            });
        }

        return { expressionId, expressionPath };
    };

    function getMemberExpressionNodes(id, path, classPropertiesList = []) {
        if (types.isObjectProperty(path)) {
            if (classPropertiesList.length === 0) {
                classPropertiesList.push(id);
            }
            const { expressionId, expressionPath } = findExpression(path);
            classPropertiesList.push(expressionId);
            getMemberExpressionNodes(expressionId, expressionPath, classPropertiesList);
        }

        return classPropertiesList;
    }

    const getFunctionExpressionId = (path) => {
        const { expressionId, expressionPath } = findExpression(path);
        const memberExpressionNodes = getMemberExpressionNodes(expressionId, expressionPath);

        id = expressionId;

        if (memberExpressionNodes.length > 0) {
            id = memberExpressionNodes.reverse();
        }

        displayNamePath = expressionPath;
        return !!id;
    };

    parentPath.findParent((path) => {
        if (path.isFunctionExpression()) {
            return getFunctionExpressionId(path);
        }

        if (path.isArrowFunctionExpression()) {
            return getFunctionExpressionId(path);
        }

        if (path.isFunctionDeclaration()) {
            id = path.node.id;
            displayNamePath = path;
            return !!id;
        }

        return false;
    });

    return {
        id,
        displayNamePath,
    };
}

module.exports = transform;
