import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y, z}} -> {{x, u, v}, {z, v, w}, {y, w, u}}
class HyperGraphRule10 implements HyperGraphRule {
    name: string = "Rule #10";
    optimalInitialPositions: HyperGraph = new HyperGraph([0, 1, 2], [[0, 1, 2]]);
    optimalTicksAmount: number = 7;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();


        hyperGraph.edges.forEach((edge, index) => {
            let x = edge[0];
            let y = edge[1];
            let z = edge[2];
            let u = generateUUID();
            let v = generateUUID();
            let w = generateUUID();

            result.nodes.push(u, v, w);
            result.edges.push([x, u, v], [z, v, w], [y, w, u]);
        })

        result.edges.splice(0, hyperGraph.edges.length);


        return result;
    }
}

export default HyperGraphRule10;