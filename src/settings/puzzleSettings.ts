import {
  BRANCH_STEM_END_RADIUS,
  BRANCH_TUCK_DISTANCE,
  NODE_RADIUS,
} from "@/settings/graphSettings";
import type { Refusal } from "@/types/puzzle";

export const DRAG_LINE_COLOR = "#448c2e";
export const DRAG_LINE_RADIUS = 0.05;
export const DRAG_LINE_MIN_LENGTH = 0.05;

export const HIT_SPHERE_RADIUS = 0.6;

export const CURRENT_NODE_SCALE = 1.22;
export const VISITED_NODE_SCALE = 1.08;

export const BRANCH_THREAD_DURATION = 0.25;
export const UNTHREADED_BRANCH_TINT = "#a8a8a8";
export const THREADED_BRANCH_BRIGHTNESS = 1.15;

export const REFUSAL_MESSAGES = {
  noBranch: "No branch joins those two!",
  alreadyThreaded: "That branch is already threaded!",
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

export const KNITTING_BALL_MIN_TURNS = 1;
export const KNITTING_BALL_MAX_TURNS = 3;
export const KNITTING_BALL_COVER_MARGIN = 1.03;
export const KNITTING_BALL_SMALLEST_RADIUS =
  Math.hypot(BRANCH_TUCK_DISTANCE, BRANCH_STEM_END_RADIUS) *
  KNITTING_BALL_COVER_MARGIN;
export const KNITTING_BALL_END_SCALE =
  KNITTING_BALL_SMALLEST_RADIUS / (NODE_RADIUS * VISITED_NODE_SCALE);
