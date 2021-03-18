import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y}} -> {{x, y}, {y, z}}
class HyperGraphRule1 implements HyperGraphRule {
    name: string = "Rule #1";
    optimalInitialPositions: HyperGraph = new HyperGraph([0,1], [[0,1]]);
    optimalTicksAmount: number = 10;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        for(let edge of hyperGraph.edges) {
            let z = generateUUID();
            result.nodes.push(z)
            result.edges.push([edge[1], z])
        }

        return result;
    }
}

export default HyperGraphRule1;