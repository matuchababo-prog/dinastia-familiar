const dagre = require('@dagrejs/dagre');

const g = new dagre.graphlib.Graph({ compound: true });
g.setGraph({ rankdir: 'TB' });
g.setDefaultEdgeLabel(() => ({}));

// Add branches
g.setNode('branchA', {});
g.setNode('branchB', {});
g.setNode('branchC', {});

// Add persons
g.setNode('p1', { width: 100, height: 100 });
g.setParent('p1', 'branchA');

g.setNode('p2', { width: 100, height: 100 });
g.setParent('p2', 'branchB');

g.setNode('u1', { width: 50, height: 50 }); // union

g.setNode('c1', { width: 100, height: 100 });
g.setParent('c1', 'branchC');

// Edges
g.setEdge('p1', 'u1');
g.setEdge('p2', 'u1');
g.setEdge('u1', 'c1');

dagre.layout(g);

console.log('p1:', g.node('p1'));
console.log('p2:', g.node('p2'));
console.log('u1:', g.node('u1'));
console.log('c1:', g.node('c1'));
console.log('branchA:', g.node('branchA'));
