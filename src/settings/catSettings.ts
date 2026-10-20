import type { Vec3 } from "@/types/math";

export const CAT_WALK_SPEED = 3.3;
export const CAT_TURN_SPEED = 10;
export const MAX_STEP_DURATION = 0.1;

export const CAT_WALK_NATURAL_SPEED = 0.7;
export const CAT_STILL_PACE = 0.05;
export const CAT_WALK_BLEND_SPEED = 12;

export const CAT_COLLIDER_HALF_EXTENTS: Vec3 = [0.6, 0.7, 1.1];
export const CAT_COLLIDER_CENTER: Vec3 = [0, 0.7, 0.25];

export const CAT_CONTROLLER_OFFSET = 0.02;
export const CAT_BLOCKING_LIFT = 0.1;

const [catHalfWidth, catHalfHeight, catHalfLength] = CAT_COLLIDER_HALF_EXTENTS;
const [catCentreX, catCentreY, catCentreZ] = CAT_COLLIDER_CENTER;

export const CAT_BLOCKING_HALF_EXTENTS: Vec3 = [
  catHalfWidth,
  catHalfHeight - CAT_BLOCKING_LIFT / 2,
  catHalfLength,
];
export const CAT_BLOCKING_CENTER: Vec3 = [
  catCentreX,
  catCentreY + CAT_BLOCKING_LIFT / 2,
  catCentreZ,
];
