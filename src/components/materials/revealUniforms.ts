import { Uniform, Vector3 } from "three";

import {
  REVEAL_INITIAL_SPEED,
  REVEAL_MAX_RADIUS,
} from "@/settings/revealSettings";
import { getStationOrigin } from "@/utils/journey";

export const revealTimeUniform = new Uniform(0);

export const revealUniforms = {
  uRevealTime: revealTimeUniform,
  uRevealStartTime: new Uniform(0),
  uRevealCenter: new Uniform(new Vector3(...getStationOrigin(0))),
  uRevealMaxRadius: new Uniform(REVEAL_MAX_RADIUS),
  uRevealInitialSpeed: new Uniform(REVEAL_INITIAL_SPEED),
};
