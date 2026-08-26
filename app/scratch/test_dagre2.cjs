const dagre = require('@dagrejs/dagre');

const g = new dagre.graphlib.Graph({ compound: true });
g.setGraph({ rankdir: 'TB', marginx: 50, marginy: 50 });
g.setDefaultEdgeLabel(() => ({}));

g.setNode('branchA', {});

g.setNode('p1', { width: 100, height: 100 });
g.setParent('p1', 'branchA');

g.setNode('p2', { width: 100, height: 100 });
g.setParent('p2', 'branchA');

g.setEdge('p1', 'p2');

dagre.layout(g);
console.log('branchA:', g.node('branchA'));
console.log('p1:', g.node('p1'));
console.log('p2:', g.node('p2'));
