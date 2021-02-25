import HyperGraph from "./hyper-graph";

class HyperGraphInitialPositions {
    static rule1 = new HyperGraph([0,1], [[0,1]]);
    static rule2 = new HyperGraph([0], [[0,0,0]]);
    static rule3 = new HyperGraph([0,1,2], [[0,1],[0,2]]);
}

export default HyperGraphInitialPositions;