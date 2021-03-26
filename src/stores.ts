import {derived, writable} from 'svelte/store';
import type HyperGraphRule from "./hypergraphs/hyperGraphRule";
import {ALL_RULES} from "./hypergraphs/rules";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

export const activeRule = writable<HyperGraphRule>(ALL_RULES[0]);
export const prevRule = writable<HyperGraphRule|null>(null);
export const currentTick = writable<number>(1);
export const isPlaying = writable<boolean>(false);
export const ruleProgress = tweened(0, {
    duration: 400,
    easing: cubicOut
});
export const autoZoom = writable<boolean>(true);
export const isBloom = writable<boolean>(true);
export const hiddenUI = writable<boolean>(false);