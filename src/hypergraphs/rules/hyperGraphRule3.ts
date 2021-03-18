import HyperGraph from "../hyperGraph";
import type HyperGraphRule from "../hyperGraphRule";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

// {{x, y}, {x, z}} -> {{x, y}, {x, w}, {y, w}, {z, w}}
// in a single step, we update as many edges as possible, while never updating any edge more than once.
class HyperGraphRule3 implements HyperGraphRule {
    name: string = "Rule #3";
    optimalInitialPositions: HyperGraph = new HyperGraph([0,1,2], [[0,1],[0,2]]);
    optimalTicksAmount: number = 11;

    apply(hyperGraph: HyperGraph): HyperGraph {
        let result: HyperGraph = hyperGraph.clone();

        let sameFirstIndexes: Array<Array<number>> = [];
        let alreadyMarked: Array<number> = [];
        for(let i = 0; i < hyperGraph.edges.length; i++) {
            let checkingFor = hyperGraph.edges[i][0];
            if(!alreadyMarked.includes(i)) {
                for (let j = 0; j < hyperGraph.edges.length; j++) {
                    if (checkingFor === hyperGraph.edges[j][0] && j != i && !alreadyMarked.includes(i) && !alreadyMarked.includes(j)) {
                        sameFirstIndexes.push([i, j]);
                        alreadyMarked.push(i, j);
                    }
                }
            }
        }

        for(let indexPair of sameFirstIndexes) {
            let firstEdge = hyperGraph.edges[indexPair[0]]
            let secondEdge = hyperGraph.edges[indexPair[1]]
            if(firstEdge[0] != secondEdge[0]) {
                throw Error('This should not happen');
            }

            let w = generateUUID();
            let x = firstEdge[0];
            let y = firstEdge[1];
            let z = secondEdge[1];

            result.nodes.push(w);
            // delete second edge & push 3 remaining edges
            result.edges.splice(indexPair[1], 1)
            result.edges.push([x,w], [y,w], [z,w]);
        }

        return result;
    }
}

export default HyperGraphRule3;