import { Uniform } from "three";

import {
  CAPE_HEM_HEIGHT,
  CAPE_STILL_FRONT_DEPTH,
  CAPE_WAVE_AMPLITUDE,
  CAPE_WAVE_FRONT_DEPTH,
  CAPE_WAVE_NUMBER,
  CAPE_WAVE_SPEED,
  CAPE_WAVE_TOP_HEIGHT,
} from "@/settings/catSettings";

export const capeWaveTimeUniform = new Uniform(0);

export const capeWaveUniforms = {
  uCapeWaveTime: capeWaveTimeUniform,
  uCapeHemHeight: new Uniform(CAPE_HEM_HEIGHT),
  uCapeWaveTopHeight: new Uniform(CAPE_WAVE_TOP_HEIGHT),
  uCapeStillFrontDepth: new Uniform(CAPE_STILL_FRONT_DEPTH),
  uCapeWaveFrontDepth: new Uniform(CAPE_WAVE_FRONT_DEPTH),
  uCapeWaveAmplitude: new Uniform(CAPE_WAVE_AMPLITUDE),
  uCapeWaveNumber: new Uniform(CAPE_WAVE_NUMBER),
  uCapeWaveSpeed: new Uniform(CAPE_WAVE_SPEED),
};
