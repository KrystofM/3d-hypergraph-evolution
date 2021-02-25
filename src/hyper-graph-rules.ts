import HyperGraph from "./hyper-graph";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;

class HyperGraphRules {

    // {{x, y}} -> {{x, y}, {y, z}}
    static applyRule1(graph: HyperGraph): HyperGraph {
        let result: HyperGraph = graph.clone();

        for(let edge of graph.edges) {
            let z = generateUUID();
            result.nodes.push(z)
            result.edges.push([edge[1], z])
        }

        return result;
    }

    // {{x, y, z}} -> {{x, y, w}, {y, w, z}}
    static applyRule2(graph: HyperGraph): HyperGraph {
        let result: HyperGraph = graph.clone();

        graph.edges.forEach((edge, index) => {
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

    // {{x, y}, {x, z}} -> {{x, y}, {x, w}, {y, w}, {z, w}}
    // in a single step, we update as many edges as possible, while never updating any edge more than once.
    static applyRule3(graph: HyperGraph): HyperGraph {
        let result: HyperGraph = graph.clone();

        let sameFirstIndexes: Array<Array<number>> = [];
        let alreadyMarked: Array<number> = [];
        for(let i = 0; i < graph.edges.length; i++) {
            let checkingFor = graph.edges[i][0];
            if(!alreadyMarked.includes(i)) {
                for (let j = 0; j < graph.edges.length; j++) {
                    if (checkingFor === graph.edges[j][0] && j != i && !alreadyMarked.includes(i) && !alreadyMarked.includes(j)) {
                        sameFirstIndexes.push([i, j]);
                        alreadyMarked.push(i, j);
                    }
                }
            }
        }

        for(let indexPair of sameFirstIndexes) {
            let firstEdge = graph.edges[indexPair[0]]
            let secondEdge = graph.edges[indexPair[1]]
            console.log(firstEdge[0], secondEdge[0])
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

        console.log('Edges');
        console.log(result.edges);
        console.log('IndexPairs');
        console.log(sameFirstIndexes);

        let alreadyMarkedIndexes = [0,1]
        let sameFirstIndexesResult = [[0,1,4],[2,3]]

        return result;
    }

}

export default HyperGraphRules;