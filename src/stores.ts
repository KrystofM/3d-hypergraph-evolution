import {derived, writable} from 'svelte/store';
import type HyperGraphRule from "./hypergraphs/hyperGraphRule";
import {ALL_RULES} from "./hypergraphs/rules";
import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

export const activeRule = writable<HyperGraphRule>(ALL_RULES[0]);
export const currentTick = writable<number>(1);
export const ruleProgress = tweened(0, {
    duration: 400,
    easing: cubicOut
});