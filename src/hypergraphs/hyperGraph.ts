class HyperGraph {
    public nodes: Array<number|string>
    public edges: Array<Array<number|string>>

    constructor(nodes?: Array<number|string>, edges?: Array<Array<number|string>>) {
        this.nodes = nodes ?? [];
        this.edges = edges ?? [];
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