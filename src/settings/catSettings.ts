import type { Vec3 } from "@/types/math";

export const CAT_WALK_SPEED = 3.3;
export const CAT_TURN_SPEED = 10;
export const MAX_STEP_DURATION = 0.1;

export const CAT_WALK_NATURAL_SPEED = 0.7;
export const CAT_STILL_PACE = 0.05;
export const CAT_WALK_BLEND_SPEED = 12;
export const CAT_FLY_FADE_DURATION = 0.8;

export const CAT_COLLIDER_HALF_EXTENTS: Vec3 = [0.6, 0.7, 1.1];
export const CAT_COLLIDER_CENTER: Vec3 = [0, 0.7, 0.25];

export const CAT_CONTROLLER_OFFSET = 0.02;
export const CAT_BLOCKING_LIFT = 0.1;
export const CAT_BLOCKING_RADIUS = 0.9;

const [, catHalfHeight] = CAT_COLLIDER_HALF_EXTENTS;
const [, catCentreY] = CAT_COLLIDER_CENTER;

export const CAT_BLOCKING_HALF_HEIGHT = catHalfHeight - CAT_BLOCKING_LIFT / 2;
export const CAT_BLOCKING_CENTER: Vec3 = [
  0,
  catCentreY + CAT_BLOCKING_LIFT / 2,
  0,
];

export const CAPE_HEM_HEIGHT = 0.19;
export const CAPE_WAVE_TOP_HEIGHT = 1.1;
export const CAPE_STILL_FRONT_DEPTH = -0.55;
export const CAPE_WAVE_FRONT_DEPTH = -0.3;
export const CAPE_WAVE_AMPLITUDE = 0.05;
export const CAPE_WAVE_NUMBER = 6;
export const CAPE_WAVE_SPEED = 3;
