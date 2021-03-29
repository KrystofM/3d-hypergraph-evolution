import type HyperGraphRule from "../../hypergraphs/hyperGraphRule";
import {ALL_RULES} from "../../hypergraphs/rules";
import type {ForceGraph3DInstance} from "3d-force-graph";
import type HyperGraph from "../../hypergraphs/hyperGraph";
import {MathUtils} from "three";
import generateUUID = MathUtils.generateUUID;
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

import {ruleProgress} from "../stores";

type tickCallback = (
    instance: ForceGraph3DInstance,
    progress: number,
) => void;

interface GraphData {
    nodes: object[],
    links: object[],
}

class GraphRender {
    private interval: number;
    private currentTick: number;

    public isPaused: boolean;

    public forceGraph3DInstance: ForceGraph3DInstance|null;
    public hyperGraph: HyperGraph;
    public hyperGraphRule: HyperGraphRule;
    public tickCallback: Function;

    static FIRST_GRAPH_RULE: HyperGraphRule = ALL_RULES[0];
    static NODE_COLOR_SIGNATURE: string = 'node_color';
    static CLASSIC_NODE_COLOR: string = '#FFF';
    static EXPANDED_NODE_COLOR: string = '#000';
    static GRAPH_TICK_SPEED: number = 1000;

    constructor(tickCallback: tickCallback, forceGraph3D?: ForceGraph3DInstance, hyperGraphRule?: HyperGraphRule) {
        this.forceGraph3DInstance = forceGraph3D ?? null;
        this.hyperGraphRule = hyperGraphRule ?? GraphRender.FIRST_GRAPH_RULE;
        this.hyperGraph = this.hyperGraphRule.optimalInitialPositions;
    }
    
    render(): void {
        this.updateInstanceData();
        this.currentTick = 1;
        this.interval = setInterval(async () => {
            if(this.isPaused) {
                return;
            }

            if(this.ruleEnded) {
                //some callback
                console.log('rule ended');
                return;
            }


            this.hyperGraph = this.hyperGraphRule.apply(this.hyperGraph);
            this.updateInstanceData();

            this.tickCallback(this.forceGraph3DInstance, this.progress());

            this.currentTick++;

        }, GraphRender.GRAPH_TICK_SPEED)
    }

    injectInstance(forceGraph3D: ForceGraph3DInstance): void {
        this.forceGraph3DInstance = forceGraph3D;
    }

    private updateInstanceData(): void {
        this.forceGraph3DInstance?.graphData(this.convertToGraph(this.hyperGraph));
    }

    get ruleEnded(): boolean {
        return this.currentTick >= this.hyperGraphRule.optimalTicksAmount;
    }

    pause(): void {
        this.isPaused = true;
    }

    progress(): number {
        return (100 / this.hyperGraphRule.optimalTicksAmount) * this.currentTick;
    }

    destroy() {
        clearInterval(this.interval);
    }

    // * star expansion algorithm for converting hypergraphs to graphs
    convertToGraph(hyperGraph: HyperGraph): GraphData {
        let result: GraphData = {nodes: [], links: []};

        for (let i of hyperGraph.nodes) {
            result.nodes.push({
                id: i,
                [GraphRender.NODE_COLOR_SIGNATURE]: GraphRender.CLASSIC_NODE_COLOR
            });
        }

        for (let edge of hyperGraph.edges) {
            if (edge.length >= 3) {
                let newNodeId = generateUUID();
                result.nodes.push({
                    id: newNodeId,
                    [GraphRender.NODE_COLOR_SIGNATURE]: GraphRender.EXPANDED_NODE_COLOR
                });

                for (let i of edge) {
                    result.links.push({source: i, target: newNodeId})
                }
            }

            if (edge.length == 2) {
                result.links.push({source: edge[0], target: edge[1]})
            }

            if (edge.length < 2) {
                throw Error('Edge must have at least two nodes');
            }
        }

        return result;
    }

}

export default GraphRender;