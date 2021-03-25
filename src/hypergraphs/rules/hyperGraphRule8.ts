import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y}} -> {{y, z}, {y, z}, {z, x}, {z, x}}
class HyperGraphRule8 implements HyperGraphRule {
    name: string = "Rule #8";
    optimalInitialPositions: HyperGraph = new HyperGraph([0], [[0,0]]);
    optimalTicksAmount: number = 6;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        hyperGraph.edges.forEach((edge, index) => {
            let z = generateUUID();
            let x = edge[0];
            let y = edge[1];

            result.nodes.push(z);
            result.edges.push([y, z], [y, z], [z, x], [z, x]);
        })

        result.edges.splice(0, hyperGraph.edges.length);

        return result;
    }
}

export default HyperGraphRule8;