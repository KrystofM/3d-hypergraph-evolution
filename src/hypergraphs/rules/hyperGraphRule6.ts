import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y}} -> {{x, z}, {x, z}, {z, y}}
class HyperGraphRule6 implements HyperGraphRule {
    name: string = "Rule #6";
    optimalInitialPositions: HyperGraph = new HyperGraph([0], [[0,0]]);
    optimalTicksAmount: number = 8;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        hyperGraph.edges.forEach((edge, index) => {
            let z = generateUUID();
            let x = edge[0];
            let y = edge[1];

            result.nodes.push(z);
            result.edges.push([x, z], [x, z], [z, y]);
        })

        result.edges.splice(0, hyperGraph.edges.length);

        return result;
    }
}

export default HyperGraphRule6;