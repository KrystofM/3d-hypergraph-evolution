import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y}} -> {{x, x}, {x, y}, {z, x}}
class HyperGraphRule5 implements HyperGraphRule {
    name: string = "Rule #5";
    optimalInitialPositions: HyperGraph = new HyperGraph([0], [[0,0]]);
    optimalTicksAmount: number = 8;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        hyperGraph.edges.forEach((edge, index) => {
            let z = generateUUID();
            let x = edge[0];

            result.nodes.push(z);
            result.edges.push([x, x], [z, x]);
        })

        return result;
    }
}

export default HyperGraphRule5;