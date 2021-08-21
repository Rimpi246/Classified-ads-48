// eslint-disable-next-line max-len
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Helpers @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/**
 * Setup adds funcs to nodes
 * to chain operations safely (if nodes don't exist in any HTML page)
 * @param {*} nodes
 * @param {*} funcs
 */
export function setup(nodes, funcs) {
    nodes = nodes.filter(Boolean);
    funcs = funcs.filter(Boolean);
    funcs.forEach((func) => {
        nodes.forEach((node) => {
            node[func.name] = (_) => func(node);
        });
    });
}