const pathNode = require('path');

const classHasRenderMethod = require('./classHasRenderMethod');
const { setDisplayName, resetCache } = require('./setDisplayName');

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

const getComplexDisplayName = (nameNodes, types, state) => {
    const literalName = nameNodes
        .reduce(
            (result, node) =>
                `${result}${processName(getNodeId(node, types), types.isObjectProperty(node) && node.computed, types)}`,
            ''
        )
        .slice(1);

    return appendComponentPath(literalName, state);
}

const getObjectPropertyNameNodes = (path, types) => {
    const namePaths = [path.node];

    const next = path.findParent((path) => path.isObjectProperty() && !types.isObjectPattern(path.parentPath.node));

    if (next) {
        return namePaths.concat(getObjectPropertyNameNodes(next, types));
    }

    return namePaths;
};

const isProgramScope = (path) => path.scope.path.isProgram() || (path.isDeclaration() && path.parentPath.isProgram());

const isDirectlyExported = (path) => path.parentPath.isExportDeclaration();

const isInClassBody = (path) => !!path.findParent((item) => item.isClassBody());

const findNameCandidates = (parentPath, types) => {
    let candidates = [];

    parentPath.findParent((path) => {
        if (path.isFunctionDeclaration() && (isProgramScope(path) || isDirectlyExported(path))) {
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
            candidates = candidates.filter((item) => !item.isVariableDeclarator() && !item.isAssignmentExpression());
            candidates.push(path);
            return false;
        }

        return false;
    });

    return candidates;
}

function transform({ types }) {
    const parseElement = (path, state) => {
        const candidates = findNameCandidates(path, types)

        if (!candidates.length) {
            return;
        }

        const displayNamePlacements = []
        const processedDeclarationPaths = [];

        for (const candidatePath of candidates) {
            if (candidatePath.isFunctionDeclaration()) {
                if (!candidatePath.node.id) {
                    /* anonymous function */
                    candidatePath.node.id = candidatePath.scope.generateUidIdentifier('uid');
                    displayNamePlacements.push({
                        id: candidatePath.node.id,
                        path: candidatePath,
                        name: appendComponentPath('NoName', state)
                    });
                } else {
                    displayNamePlacements.push({
                        id: candidatePath.node.id,
                        path: candidatePath,
                        name: appendComponentPath(candidatePath.node.id.name, state)
                    });
                }
            }

            if (candidatePath.isClassDeclaration()) {
                displayNamePlacements.push({
                    id: candidatePath.node.id,
                    path: candidatePath,
                    name: appendComponentPath(candidatePath.node.id.name, state)
                });
            }

            if (candidatePath.isAssignmentExpression() && !processedDeclarationPaths.includes(candidatePath)) {
                displayNamePlacements.push({
                    id: candidatePath.node.left,
                    path: candidatePath.parentPath,
                    name: appendComponentPath(candidatePath.node.left.name, state)
                });
            }

            if (candidatePath.isVariableDeclarator() && !processedDeclarationPaths.includes(candidatePath)) {
                displayNamePlacements.push({
                    id: candidatePath.node.id,
                    path: candidatePath.parentPath,
                    name: appendComponentPath(candidatePath.node.id.name, state)
                });
            }

            if (candidatePath.isObjectProperty()) {
                const objectNamePath = candidatePath.findParent((path) => {
                    return path.isVariableDeclarator() || path.isAssignmentExpression()
                });

                if (objectNamePath) {
                    processedDeclarationPaths.push(objectNamePath);

                    const nameNodes = [objectNamePath.node].concat(getObjectPropertyNameNodes(candidatePath, types).reverse());

                    displayNamePlacements.push({
                        id: nameNodes.map((item) => getNodeId(item, types)),
                        path: objectNamePath,
                        name: getComplexDisplayName(nameNodes, types, state),
                    })
                }
            }
        }

        displayNamePlacements.forEach(({id, path, name}) => {
            setDisplayName(path, id, types, name);
        });
    }

    return {
        name: '@hh.ru/babel-plugin-react-displayname',
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
