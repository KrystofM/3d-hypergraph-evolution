import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

interface GraphData {
    nodes: object[],
    links: object[],
}

class HyperGraph {
    public nodes: Array<number|string>
    public edges: Array<Array<number|string>>

    static EXPANDED_EDGES_SIGNATURE: string = 'expanded';
    static EXPANDED_EDGES_COLOR: string = 'rbga(0,0,0,0)';

    constructor(nodes?: Array<number|string>, edges?: Array<Array<number|string>>) {
        this.nodes = nodes ?? [];
        this.edges = edges ?? [];
    }

    public convertToGraph(): GraphData {
        let result: GraphData  = {nodes: [], links: []};

        for (let i of this.nodes) {
            result.nodes.push({id: i});
        }

        for (let edge of this.edges){
            if(edge.length >= 3) {
                let newNodeId = generateUUID();
                result.nodes.push({id: newNodeId, [HyperGraph.EXPANDED_EDGES_SIGNATURE]: HyperGraph.EXPANDED_EDGES_COLOR});

                for(let i of edge) {
                    result.links.push({source: i, target: newNodeId})
                }
            }

            if(edge.length == 2) {
                result.links.push({source: edge[0], target: edge[1]})
            }

            if(edge.length < 2) {
                throw Error('Edge must have at least two nodes');
            }
        }

        return result;
    }

    public clone(): HyperGraph {
        let result: HyperGraph = new HyperGraph();

        for(let node of this.nodes) {
            result.nodes.push(node);
        }

        for(let edge of this.edges) {
            result.edges.push(edge);
        }

        return result;
    }

}

export default HyperGraph;