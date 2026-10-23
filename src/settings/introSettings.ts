import type { IntroBeat } from "@/types/intro";

export const INTRO_BEAT_ORDER: IntroBeat[] = [
  "flyIn",
  "complain",
  "askForHelp",
];

export const INTRO_BEAT_DURATIONS: Record<
  Exclude<IntroBeat, "askForHelp">,
  number
> = {
  flyIn: 4,
  complain: 3.5,
};

export const INTRO_LINES: Record<Exclude<IntroBeat, "flyIn">, string> = {
  complain:
    "It's almost time to go trick-or-treating... And I don't have a costume.",
  askForHelp: "Will you help me make it?",
};

export const INTRO_DILATED_PUPIL_BEATS: IntroBeat[] = [
  "complain",
  "askForHelp",
];
