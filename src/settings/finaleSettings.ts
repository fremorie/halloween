import type { FinaleBeat } from "@/types/finale";

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
  takeOff: 2,
  turnAround: 2.5,
  flight: 6,
  landing: 2,
};

export const THANK_YOU_LINE = "Thank you! Now I'm ready for Halloween.";
