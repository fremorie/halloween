import { type Texture, Uniform, Vector3 } from "three";

import { levels } from "@/data/levels";
import {
  REVEAL_EDGE_SOFTNESS,
  REVEAL_EDGE_WIDTH,
  REVEAL_INITIAL_SPEED,
  REVEAL_MAX_RADIUS,
  REVEAL_NOISE_SCALE,
} from "@/settings/revealSettings";
import { getStationOrigin } from "@/utils/journey";

const REVEAL_NOT_STARTED = -1;

export const revealTimeUniform = new Uniform(0);
export const revealNoiseTextureUniform = new Uniform<Texture | null>(null);

const revealStartTimesUniform = new Uniform(
  levels.map(() => REVEAL_NOT_STARTED),
);

export const revealUniforms = {
  uRevealTime: revealTimeUniform,
  uRevealNoiseTexture: revealNoiseTextureUniform,
  uRevealStartTimes: revealStartTimesUniform,
  uRevealCenters: new Uniform(
    levels.map(
      (_, stationIndex) => new Vector3(...getStationOrigin(stationIndex)),
    ),
  ),
  uRevealMaxRadius: new Uniform(REVEAL_MAX_RADIUS),
  uRevealInitialSpeed: new Uniform(REVEAL_INITIAL_SPEED),
  uRevealNoiseScale: new Uniform(REVEAL_NOISE_SCALE),
  uRevealEdgeWidth: new Uniform(REVEAL_EDGE_WIDTH),
  uRevealEdgeSoftness: new Uniform(REVEAL_EDGE_SOFTNESS),
};

export function isStationRevealStarted(stationIndex: number) {
  return revealStartTimesUniform.value[stationIndex] !== REVEAL_NOT_STARTED;
}

export function startStationReveal(stationIndex: number) {
  revealStartTimesUniform.value[stationIndex] = revealTimeUniform.value;
}

export function clearStationReveal(stationIndex: number) {
  revealStartTimesUniform.value[stationIndex] = REVEAL_NOT_STARTED;
}
