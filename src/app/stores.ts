import {writable} from 'svelte/store';
import type HyperGraphRule from "../hypergraphs/hyperGraphRule";
import {ALL_RULES} from "../hypergraphs/rules";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";
import GraphRender from "./parts/GraphRender";

export const activeRule = writable<HyperGraphRule>(ALL_RULES[0]);
export const prevRule = writable<HyperGraphRule|null>(null);
export const currentTick = writable<number>(1);
export const isPlaying = writable<boolean>(false);
export const ruleProgress = tweened(0, {
    duration: 400,
    easing: cubicOut
});
export const autoZoom = writable<boolean>(true);
export const isBloom = writable<boolean>(false);
export const hiddenUI = writable<boolean>(false);

export const activeRender = writable<GraphRender>(new GraphRender((graph) =>{
    if(autoZoom)
}));

