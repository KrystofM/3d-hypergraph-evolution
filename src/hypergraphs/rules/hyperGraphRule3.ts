import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y, z}} -> {{x, z, w}, {u, w, y}}
class HyperGraphRule3 implements HyperGraphRule {
    name: string = "Rule #3";
    optimalInitialPositions: HyperGraph = new HyperGraph([0], [[0,0,0]]);
    optimalTicksAmount: number = 11;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        hyperGraph.edges.forEach((edge, index) => {
            let w = generateUUID();
            let u = generateUUID();
            let x = edge[0];
            let y = edge[1];
            let z = edge[2];

            result.nodes.push(w, u);
            result.edges.push([x, z, y], [u, w, y]);
        })

        result.edges.splice(0, hyperGraph.edges.length);

        return result;
    }
}

export default HyperGraphRule3;