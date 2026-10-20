import type { Vec3 } from "@/types/math";
import { NODE_RADIUS } from "@/settings/graphSettings";

export const GROUND_COLLIDER_HALF_EXTENTS: Vec3 = [200, 0.1, 200];
export const GROUND_COLLIDER_CENTRE: Vec3 = [0, -0.1, 0];

export const PUMPKIN_COLLIDER_RADIUS = 0.9;
export const PUMPKIN_COLLIDER_HALF_HEIGHT = 0.75;
export const PUMPKIN_LINEAR_DAMPING = 1;
export const PUMPKIN_ANGULAR_DAMPING = 2;

export const YARN_BALL_COLLIDER_RADIUS = NODE_RADIUS * 1.1;
export const YARN_BALL_LINEAR_DAMPING = 0.3;
export const YARN_BALL_ANGULAR_DAMPING = 0.5;
export const YARN_BALL_FRICTION = 1;
export const YARN_BALL_RESTITUTION = 0.4;

export const SCATTER_UPWARD_SPEED = 5;
export const SCATTER_OUTWARD_SPEED_PER_UNIT = 1.4;
export const SCATTER_TOWARD_CAMERA_SPEED = 2;
export const SCATTER_SPEED_JITTER = 1;
export const SCATTER_MAX_SPIN_SPEED = 6;
