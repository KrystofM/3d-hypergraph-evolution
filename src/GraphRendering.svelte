<script lang="ts">
    import ForceGraph3D, {ForceGraph3DInstance} from '3d-force-graph';
    import "./styles/style.sass";
    import HyperGraph from "./hypergraphs/hyperGraph";
    import {MathUtils} from "three";
    import generateUUID = MathUtils.generateUUID;
    import HyperGraphRule from "./hypergraphs/hyperGraphRule";
    import {activeRule, currentTick, isPlaying, prevRule, ruleProgress} from "./stores";
    import {onMount} from "svelte";

    const EXPANDED_EDGES_SIGNATURE: string = 'expanded';
    const EXPANDED_EDGES_COLOR: string = 'rbga(0,0,0,0)';
    const GRAPH_RENDER_ID: string = 'graph-rendering';
    const GRAPH_TICK_SPEED: number = 750;

    interface GraphData {
        nodes: object[],
        links: object[],
    }

    // * star expansion algorithm for converting hypergraphs to graphs
    function convertToGraph(hyperGraph: HyperGraph): GraphData {
        let result: GraphData = {nodes: [], links: []};

        for (let i of hyperGraph.nodes) {
            result.nodes.push({id: i});
        }

        for (let edge of hyperGraph.edges) {
            if (edge.length >= 3) {
                let newNodeId = generateUUID();
                result.nodes.push({
                    id: newNodeId,
                    [EXPANDED_EDGES_SIGNATURE]: EXPANDED_EDGES_COLOR
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

    let interval;

    function renderGraph(graph: ForceGraph3DInstance, rule: HyperGraphRule, speed: number) {
        clearInterval(interval);
        isPlaying.set(true);
        ruleProgress.set(0, {
            duration: 0
        });
        currentTick.set(1);

        let graphData = rule.optimalInitialPositions;
        graph.graphData(convertToGraph(graphData));

        interval = setInterval(() => {
            if($isPlaying) {
                if ($currentTick >= rule.optimalTicksAmount) {
                    clearInterval(interval);
                    isPlaying.set(false);
                }

                graphData = rule.apply(graphData);
                graph.graphData(convertToGraph(graphData));
                graph.zoomToFit(speed, 150);
                ruleProgress.set((100 / rule.optimalTicksAmount) * $currentTick);
                currentTick.update(n => n + 1);
            }
        }, speed);
    }

    onMount(async () => {
        const element = document.getElementById(GRAPH_RENDER_ID);
        const graph = ForceGraph3D()(element)
            .linkOpacity(0.5)
            .nodeColor(EXPANDED_EDGES_SIGNATURE);

        activeRule.subscribe(activeRule => {
            if($prevRule === activeRule && !($currentTick >= activeRule.optimalTicksAmount)) {
                isPlaying.set(true);
            } else {
                prevRule.set(activeRule);
                renderGraph(graph, activeRule, GRAPH_TICK_SPEED);
            }
        })
    })
</script>


<section id={GRAPH_RENDER_ID}></section>
