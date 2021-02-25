
class HyperGraphInitialPositions {

}

interface GraphData {
    nodes: object[],
    links: object[],
}

class HyperGraph {
    public nodes: Array<number>
    public edges: Array<Array<number>>

    static EXPANDED_EDGES_SIGNATURE: string = 'expanded';
    static EXPANDED_EDGES_COLOR: string = '#000';

    constructor(nodes: Array<number>, edges: Array<Array<number>>) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public convertToGraph(): GraphData {
        let result: GraphData  = {nodes: [], links: []};

        for (let i of this.nodes) {
            result.nodes.push({id: i});
        }

        for (let edge of this.edges){
            if(edge.length >= 3) {
                let newNodeId = result.nodes.length;
                result.nodes.push({id: newNodeId, [HyperGraph.EXPANDED_EDGES_SIGNATURE]: HyperGraph.EXPANDED_EDGES_COLOR});

                for(let i of edge) {
                    result.links.push({source: i, target: newNodeId})
                }
            }

            if(edge.length < 3) {
                result.links.push({source: edge[0], target: edge[1]})
            }
        }

        return result;
    }

    // public applyRule1(graph: HyperGraph): HyperGraph {
    //     let result:
    // }

}

export default HyperGraph;
