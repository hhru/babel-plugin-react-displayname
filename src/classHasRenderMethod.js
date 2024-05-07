module.exports = function(path) {
    if (!path.node.body) {
        return false;
    }

    return path.node.body.body.some(({ type, key }) => type === 'ClassMethod' && key.name === 'render');
};
