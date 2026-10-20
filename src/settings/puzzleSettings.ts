import type { Refusal } from "@/types/puzzle";

export const DRAG_LINE_COLOR = "#448c2e";
export const DRAG_LINE_RADIUS = 0.05;
export const DRAG_LINE_MIN_LENGTH = 0.05;

export const HIT_SPHERE_RADIUS = 0.6;

export const CURRENT_NODE_SCALE = 1.22;
export const VISITED_NODE_SCALE = 1.08;

export const BRANCH_THREAD_DURATION = 0.25;
export const UNTHREADED_BRANCH_TINT = "#6e6e6e";

export const REFUSAL_MESSAGES = {
  noBranch: "No branch joins those two",
  alreadyThreaded: "That branch is already threaded",
} satisfies Record<Refusal, string>;

export const NODE_SCALE_SETTLE_DURATION = 0.5;

export const HOVER_TURN = 0.6;
export const HOVER_LEAN = 0.18;
export const HOVER_SETTLE_DURATION = 1.2;
export const HOVER_WOBBLE_ANGLE = 0.16;
export const HOVER_WOBBLE_DURATION = 0.7;
export const HOVER_WOBBLE_WIGGLES = 5;

export const REJECT_SHAKE_DISTANCE = 0.07;
export const REJECT_SHAKE_DURATION = 0.4;
export const REJECT_SHAKE_WIGGLES = 6;

export const REWARD_WIGGLE_DISTANCE = 0.06;
export const REWARD_WIGGLE_WIGGLES = 14;
