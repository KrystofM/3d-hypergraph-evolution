import type HyperGraph from "./hyperGraph";

interface HyperGraphRule {
   name: string;
   optimalInitialPositions: HyperGraph;
   optimalTicksAmount: number;
   apply(hyperGraph: HyperGraph): HyperGraph;
}

export default HyperGraphRule;