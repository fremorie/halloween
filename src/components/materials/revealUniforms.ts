import { Uniform, Vector3 } from "three";

import { getStationOrigin } from "@/utils/journey";

export const revealUniforms = {
  uRevealCenter: new Uniform(new Vector3(...getStationOrigin(0))),
  uRevealRadius: new Uniform(8),
};
