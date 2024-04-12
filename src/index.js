const pathNode = require('path');

const classHasRenderMethod = require('./classHasRenderMethod');
const { setDisplayName, resetCache, GENERATED_CONSTANT_NAME } = require('./setDisplayName');

let processedDeclarationNodes = [];

const appendComponentPath = (componentName, state) => {
    const extension = pathNode.extname(state.file.opts.filename);
    const name = pathNode.basename(state.file.opts.filename, extension);
    const lastTwoFoldersWithFileName = state.file.opts.filename.match(`([^/]+)/([^/]+)/${name}`);

    return `${lastTwoFoldersWithFileName ? lastTwoFoldersWithFileName[0] : ''}/${componentName}`;
}

const getNodeId = (node, types) => {
    if (types.isObjectProperty(node)) {
        return node.key;
    }

    if (types.isAssignmentExpression(node)) {
        return node.left;
    }

    return node.id;
}

const processName = (node, isComputed, types) => {
    const name = types.isMemberExpression(node)
        ? `${node.object.name}.${node.property.name}`
        : node.name;

    return isComputed ? `[${name}]` : `.${name}`;
}

const getComplexDisplayName = (nameNodes, types) => {
    return nameNodes
        .reduce(
            (result, node) =>
                `${result}${processName(getNodeId(node, types), types.isObjectProperty(node) && node.computed, types)}`,
            ''
        )
        .slice(1);
}

const getObjectPropertyNameNodes = (path, types) => {
    const nameNodes = [path.node];

    const next = path.findParent((path) => path.isObjectProperty() && !types.isObjectPattern(path.parentPath.node));

    if (next) {
        return nameNodes.concat(getObjectPropertyNameNodes(next, types));
    }

    return nameNodes;
};

const isProgramScope = (path) => path.scope.path.isProgram() || (path.isDeclaration() && path.parentPath.isProgram());

const isDirectlyExported = (path) => path.parentPath.isExportDeclaration();

const isInClassBody = (path) => !!path.findParent((item) => item.isClassBody());

const findNameCandidates = (parentPath, types) => {
    let candidates = [];

    parentPath.findParent((path) => {
        if (path.isExportDefaultDeclaration() && candidates.length === 0) {
            /* We didn't find anything to hook on, let's go with default export */
            candidates.push(path);
            return true;
        }

        if (path.isFunctionDeclaration() && (isProgramScope(path) || isDirectlyExported(path))) {
            /* We're interested only in top one, remove previous declarations */
            candidates = candidates.filter(
                (item) => !item.isVariableDeclarator() && !item.isAssignmentExpression() && !item.isFunctionDeclaration()
            );
            candidates.push(path);
            return true;
        }

        if (path.isClassDeclaration()) {
            candidates.push(path);
            return false;
        }

        /* We filter ObjectPattern as it's an object destructuring */
        if (path.isObjectProperty() && !types.isObjectPattern(path.parentPath.node)) {
            if (candidates.some((item) => item.isObjectProperty())) {
                /* We're interested only in bottom one, will traverse up anyway */
                return false;
            }
            candidates.push(path);
            return false;
        }

        if ((path.isVariableDeclarator() || path.isAssignmentExpression()) && !isInClassBody(path)) {
            /* We're interested only in top one, remove previous declarations */
            candidates = candidates.filter(
                (item) => !item.isVariableDeclarator() && !item.isAssignmentExpression() && !item.isFunctionDeclaration()
            );
            candidates.push(path);
            return false;
        }

        return false;
    });

    return candidates;
}

const traverseParents = (path) => {
    const result = [path];
    let nextParent = path.parentPath;
    while (nextParent && !nextParent.isProgram()) {
        result.push(nextParent);
        nextParent = nextParent.parentPath;
    }

    return result;
}

const cloneAsConstant = (node, path, types) => {
    let newNode = types.cloneNode(node);
    if (types.isFunctionDeclaration(newNode)) {
        /* Can not assign FunctionDeclaration to a constant, converting to FunctionExpression */
        newNode = types.functionExpression(newNode.id, newNode.params, newNode.body)
    }

    const id = path.scope.generateUidIdentifier(GENERATED_CONSTANT_NAME);
    const variableDeclaratorNode = types.variableDeclarator(id, newNode);
    const inserted = path.insertBefore(types.variableDeclaration('const', [variableDeclaratorNode]));

    return { id, variableDeclaratorNode, insertedPath: inserted[0] }

}

const getCallExpressionFunctionParamIndex = (parentsList, callerPath, callExpressionArguments) => {
    const callerIndex = parentsList.indexOf(callerPath);
    const closestChildPath = parentsList[
        parentsList.findIndex((item, index) => item.isCallExpression() && index < callerIndex) - 1
    ];
    return callExpressionArguments.findIndex((item) => item === closestChildPath.node);
}

const isComponentCall = (jsxElementPath, parents, types) => {
    let openingElementNode = jsxElementPath.node.openingElement.name;
    while (types.isJSXMemberExpression(openingElementNode)) {
        openingElementNode = openingElementNode.object
    }

    const elementName = openingElementNode.name;
    if (elementName === 'Fragment' || elementName.charAt(0) === elementName.charAt(0).toLocaleLowerCase()) {
        return false;
    }

    const firstFunctionParent = parents.findIndex(
        (item) =>
            item.isArrowFunctionExpression()
            || item.isFunctionDeclaration()
            || item.isFunctionExpression()
    );

    if (firstFunctionParent === -1) {
        return true;
    }

    const firstDeclaratorParent = parents.findIndex(
        (item) => item.isVariableDeclarator() || item.isAssignmentExpression()
    );

    return (firstDeclaratorParent !== -1 && firstDeclaratorParent < firstFunctionParent)
}

function transform({ types }) {
    const parseElement = (path, state) => {
        const parents = traverseParents(path);
        if (
            path.isJSXElement() &&
            (
                isComponentCall(path, parents, types)
                || parents.some((item) => item !== path && (item.isJSXElement() || item.isJSXFragment()))
            )
        ) {
            return;
        }

        const readableParents = parents.map((item) => item.node.type);
        const candidates = findNameCandidates(path, types)

        if (!candidates.length) {
            return;
        }

        const displayNamePlacements = [];

        candidates.forEach((candidatePath) => {
            const currentIndex = parents.indexOf(candidatePath);
            if (processedDeclarationNodes.includes(candidatePath.node)) {
                return;
            }

            if (candidatePath.isExportDefaultDeclaration()) {
                if (types.isCallExpression(candidatePath.node.declaration)) {
                    const callExpressionArguments = candidatePath.node.declaration.arguments;
                    const paramIndex = getCallExpressionFunctionParamIndex(parents, candidatePath, callExpressionArguments);
                    if (paramIndex === -1) {
                        return;
                    }
                    const { id, variableDeclaratorNode, insertedPath } = cloneAsConstant(
                        callExpressionArguments[paramIndex],
                        candidatePath,
                        types
                    );
                    callExpressionArguments[paramIndex] = id;
                    processedDeclarationNodes.push(variableDeclaratorNode);
                    processedDeclarationNodes.push(candidatePath.node);

                    displayNamePlacements.push({id: id, path: insertedPath, name: 'NoName'});
                } else {
                    const { id, variableDeclaratorNode, insertedPath } = cloneAsConstant(
                        candidatePath.node.declaration,
                        candidatePath,
                        types
                    );
                    candidatePath.node.declaration = id;
                    processedDeclarationNodes.push(variableDeclaratorNode);
                    processedDeclarationNodes.push(candidatePath.node);

                    displayNamePlacements.push({id: id, path: insertedPath, name: 'NoName'});
                }

                return;
            }

            if (candidatePath.isFunctionDeclaration()) {
                if (!candidatePath.node.id) {
                    /* anonymous function */
                    candidatePath.node.id = candidatePath.scope.generateUidIdentifier(GENERATED_CONSTANT_NAME);
                    displayNamePlacements.push({id: candidatePath.node.id, path: candidatePath, name: 'NoName'});
                } else {
                    displayNamePlacements.push({
                        id: candidatePath.node.id,
                        path: candidatePath,
                        name: candidatePath.node.id.name
                    });
                }
            }

            if (candidatePath.isClassDeclaration()) {
                displayNamePlacements.push({
                    id: candidatePath.node.id,
                    path: candidatePath,
                    name: candidatePath.node.id.name
                });
            }

            if (candidatePath.isAssignmentExpression()) {
                displayNamePlacements.push({
                    id: candidatePath.node.left,
                    path: candidatePath.parentPath,
                    name: candidatePath.node.left.name
                });
            }

            if (candidatePath.isVariableDeclarator()) {
                if (types.isCallExpression(candidatePath.node.init)) {
                    const callExpressionArguments = candidatePath.node.init.arguments;
                    const paramIndex = getCallExpressionFunctionParamIndex(parents, candidatePath, callExpressionArguments);
                    if (paramIndex === -1) {
                        return;
                    }
                    const { id, variableDeclaratorNode, insertedPath } = cloneAsConstant(
                        callExpressionArguments[paramIndex],
                        candidatePath.parentPath,
                        types
                    );
                    callExpressionArguments[paramIndex] = id;
                    processedDeclarationNodes.push(variableDeclaratorNode);
                    processedDeclarationNodes.push(candidatePath.node);

                    displayNamePlacements.push({id: id, path: insertedPath, name: candidatePath.node.id.name});
                } else {
                    displayNamePlacements.push({
                        id: candidatePath.node.id,
                        path: candidatePath.parentPath,
                        name: candidatePath.node.id.name
                    });
                }
            }

            if (candidatePath.isObjectProperty()) {
                const objectExpression = candidatePath.findParent((path) => {
                    return path.isObjectExpression() && !path.parentPath.isObjectProperty()
                });

                if (!objectExpression) {
                    return;
                }

                const objectNamePath = objectExpression.parentPath;

                if (!objectNamePath.isVariableDeclarator() && !objectNamePath.isAssignmentExpression()) {
                    return;
                }

                processedDeclarationNodes.push(objectNamePath.node);

                const nameNodes = [objectNamePath.node].concat(getObjectPropertyNameNodes(candidatePath, types).reverse());

                displayNamePlacements.push({
                    id: nameNodes.map((item) => getNodeId(item, types)),
                    path: objectNamePath,
                    name: getComplexDisplayName(nameNodes, types),
                })
            }
        });

        displayNamePlacements.forEach(({id, path, name}) => {
            setDisplayName(path, id, types, appendComponentPath(name, state));
        });
    }

    return {
        name: '@hh.ru/babel-plugin-react-displayname',
        visitor: {
            // Root point
            Program() {
                resetCache();
                processedDeclarationNodes = [];
            },
            ClassDeclaration(path, state) {
                if (classHasRenderMethod(path)) {
                    setDisplayName(
                        path,
                        path.node.id,
                        types,
                        appendComponentPath(path.node.id && path.node.id.name, state)
                    );
                }
            },
            JSXElement: parseElement,
            JSXFragment: parseElement,
        },
    };
}

module.exports = transform;
