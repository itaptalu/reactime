import { animate, type AnimationParams, type TargetsParam } from 'animejs'

export const useAnime = (target: TargetsParam, params: AnimationParams) => animate(target, params)
