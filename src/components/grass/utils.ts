import * as THREE from "three";

import { levels } from "@/data/levels";
import { CAT_START, ROAM_MARGIN } from "@/settings/journeySettings";
import { getStationOrigin } from "@/utils/journey/getStationOrigin";

const CAT_START_Z = CAT_START[2];
const LAST_STATION_Z = getStationOrigin(levels.length - 1)[2];

export const GRASS_PATCH_SIZE = CAT_START_Z - LAST_STATION_Z + ROAM_MARGIN * 2;
export const GRASS_FIELD_CENTRE_Z = (CAT_START_Z + LAST_STATION_Z) / 2;

export function createGrassGeometry(segments: number, grassBladeCount: number) {
  const VERTICES = (segments + 1) * 2;
  const indices = [];

  for (let i = 0; i < segments; ++i) {
    const vi = i * 2;
    indices[i * 12 + 0] = vi + 0;
    indices[i * 12 + 1] = vi + 1;
    indices[i * 12 + 2] = vi + 2;

    indices[i * 12 + 3] = vi + 2;
    indices[i * 12 + 4] = vi + 1;
    indices[i * 12 + 5] = vi + 3;

    const fi = VERTICES + vi;

    indices[i * 12 + 6] = fi + 2;
    indices[i * 12 + 7] = fi + 1;
    indices[i * 12 + 8] = fi + 0;

    indices[i * 12 + 9] = fi + 3;
    indices[i * 12 + 10] = fi + 1;
    indices[i * 12 + 11] = fi + 2;
  }

  const geo = new THREE.InstancedBufferGeometry();
  geo.instanceCount = grassBladeCount;
  geo.setIndex(indices);
  geo.boundingSphere = new THREE.Sphere(
    new THREE.Vector3(0, 0, 0),
    1 + GRASS_PATCH_SIZE * 2,
  );

  return geo;
}
