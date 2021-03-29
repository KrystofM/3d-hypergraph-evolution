<script lang="ts">
    import ForceGraph3D, {ForceGraph3DInstance} from '3d-force-graph';
    import "../styles/global.sass";
    import {MathUtils, Vector2} from "three";
    import HyperGraphRule from "../../hypergraphs/hyperGraphRule";
    import {
        activeRule,
        currentTick,
        isPlaying,
        prevRule,
        ruleProgress,
        autoZoom,
        isBloom,
        activeRender
    } from "../stores";
    import {onMount} from "svelte";
    import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass";
    import GraphRender from "./GraphRender";

    const GRAPH_RENDER_ID: string = 'graph-rendering';

    /*let interval;
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
                if ($autoZoom) graph.zoomToFit(speed, 200);
                ruleProgress.set((100 / rule.optimalTicksAmount) * $currentTick);
                currentTick.update(n => n + 1);
            }
        }, speed);
    }*/

    onMount(async () => {
        const element = document.getElementById(GRAPH_RENDER_ID);
        const graph = ForceGraph3D()(element)
            .linkOpacity(0.5)
            .nodeOpacity(1)
            .nodeColor(GraphRender.NODE_COLOR_SIGNATURE);

        const bloomPass = new UnrealBloomPass(
            new Vector2(),
            1,
            0.75,
            0.2
        );

        isBloom.subscribe(value => {
            value ? graph.postProcessingComposer().addPass(bloomPass)
                : graph.postProcessingComposer().removePass(bloomPass);
        })

        activeRender.update(graphRender => {
            graphRender.injectInstance(graph)
            graphRender.render();
            return graphRender;
        });

    })
</script>


<section id={GRAPH_RENDER_ID}></section>
