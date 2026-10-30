import type { FinaleBeat } from "@/types/finale";
import type { Vec3 } from "@/types/math";

export const FINALE_BEAT_ORDER: FinaleBeat[] = [
  "takeOff",
  "turnAround",
  "flight",
  "landing",
  "thankYou",
];

export const WINGS_FLAPPING_BEATS: FinaleBeat[] = [
  "takeOff",
  "turnAround",
  "flight",
  "landing",
];

export const FINALE_BEAT_DURATIONS: Record<
  Exclude<FinaleBeat, "thankYou">,
  number
> = {
  takeOff: 1,
  turnAround: 2,
  flight: 3.5,
  landing: 3.5,
};

export const THANK_YOU_LINE = "Thank you! Now I'm ready for Halloween.";

export const FINALE_HOVER_HEIGHT = 2.5;
export const FINALE_TAKE_OFF_EASE = "power2.inOut";

export const FINALE_CRUISE_EXTRA_HEIGHT = 3;
export const FINALE_FLIGHT_EASE = "sine.inOut";
export const FINALE_TURN_SPEED = 3;
export const FINALE_LANDING_SPOT: Vec3 = [1, 0, 1];

export const FLIGHT_CHASE_BEATS: FinaleBeat[] = [
  "takeOff",
  "turnAround",
  "flight",
];

export const FINALE_BOB_AMPLITUDE = 0.15;
export const FINALE_BOB_PHASE = Math.PI;
