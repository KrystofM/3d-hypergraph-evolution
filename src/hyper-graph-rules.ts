import HyperGraph from "./hyper-graph";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

class HyperGraphRules {

    // {{x, y}} -> {{x, y}, {y, z}}
    static applyRule1(graph: HyperGraph): HyperGraph {
        let result: HyperGraph = graph.clone();

        for(let edge of graph.edges) {
            let newNodeId = generateUUID();
            result.nodes.push(newNodeId)
            result.edges.push([edge[1], newNodeId])
        }

        return result;
    }

    // {{x, y, z}} -> {{x, y, w}, {y, w, z}}
    static applyRule2(graph: HyperGraph): HyperGraph {
        let result: HyperGraph = graph.clone();

        for(let edge of graph.edges) {
            let newNodeId = generateUUID();
            result.nodes.push(newNodeId);
            result.edges.push([edge[0], edge[1], newNodeId], [edge[1], newNodeId, edge[2]]);
        }

        return result;
    }

    /*// {{x, y}, {x, z}} -> {{x, y}, {x, w}, {y, w}, {z, w}}
    static applyRule3(graph: HyperGraph): HyperGraph {
        let result: HyperGraph = graph.clone();

        for(let edge of graph.edges) {
            let newNodeId = generateUUID();
            result.nodes.push(newNodeId);
            result.edges.push([edge[0], edge[1], newNodeId], [edge[1], newNodeId, edge[2]]);
        }

        return result;
    }*/

}

export default HyperGraphRules;