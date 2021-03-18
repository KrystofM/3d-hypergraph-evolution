import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y, z}} -> {{x, y, w}, {y, w, z}}
class HyperGraphRule2 implements HyperGraphRule {
    name: string = "Rule #2";
    optimalInitialPositions: HyperGraph = new HyperGraph([0], [[0,0,0]]);
    optimalTicksAmount: number = 8;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        hyperGraph.edges.forEach((edge, index) => {
            let w = generateUUID();
            let x = edge[0];
            let y = edge[1];
            let z = edge[2];

            result.nodes.push(w);
            result.edges.splice(index, 1);
            result.edges.push([x, y, w], [y, w, z]);
        })

        return result;
    }
}

export default HyperGraphRule2;