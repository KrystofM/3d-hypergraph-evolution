import ForceGraph3D from '3d-force-graph';
import "./styles/style.sass";
import HyperGraph from "./initial-positions";

const someHyperGraph = new HyperGraph([0,1,2,3,4], [[0,1,2], [1,2,4], [0,2,3]])
const someGraph = someHyperGraph.convertToGraph();

console.log(someGraph);

const Graph = ForceGraph3D()
(document.body)
    .linkOpacity(0.5)
    .nodeColor(HyperGraph.EXPANDED_EDGES_SIGNATURE)
    .graphData(someGraph);

// setInterval(() => {
//     const { nodes, links } = Graph.graphData();
//     const id = nodes.length;
//     Graph.graphData({
//         nodes: [...nodes, { id }],
//         links: [...links, { source: id, target: Math.round(Math.random() * (id-1)) }]
//     });
// }, 10000);