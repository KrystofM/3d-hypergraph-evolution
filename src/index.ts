import ForceGraph3D from '3d-force-graph';
import "./styles/style.sass";
import HyperGraph from "./hyper-graph";
import HyperGraphInitialPositions from "./hyper-graph-initial-positions";
import HyperGraphRules from "./hyper-graph-rules";

//const someHyperGraph = new HyperGraph([0,1,2,3,4], [[0,1,2], [1,2,4], [0,2,3]])
//const someGraph = someHyperGraph.convertToGraph();

let graph = HyperGraphInitialPositions.rule3

const Graph = ForceGraph3D()
(document.body)
    .linkOpacity(0.5)
    .nodeColor(HyperGraph.EXPANDED_EDGES_SIGNATURE)
    .graphData(graph.convertToGraph());

let ticks = 0;
const interval = setInterval(() => {
    if(ticks >= 8) {
        clearInterval(interval);
    }

    graph = HyperGraphRules.applyRule3(graph);
    Graph.graphData(graph.convertToGraph());

    ticks++;
}, 500);
