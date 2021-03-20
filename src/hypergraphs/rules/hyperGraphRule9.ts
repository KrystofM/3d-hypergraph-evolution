import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y}} -> {{y, z}, {z, x}}
class HyperGraphRule9 implements HyperGraphRule {
    name: string = "Rule #9";
    optimalInitialPositions: HyperGraph = new HyperGraph([0, 1, 2, 3], [[0,1], [1,2], [2,3], [3,0]]);
    optimalTicksAmount: number = 8;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();


        hyperGraph.edges.forEach((edge, index) => {
            let x = edge[0];
            let y = edge[1];
            let z = generateUUID();

            result.nodes.push(z);
            result.edges.push([y, z], [z, x]);
        })

        result.edges.splice(0, hyperGraph.edges.length);


        return result;
    }
}

export default HyperGraphRule9;