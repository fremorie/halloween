import type { IntroBeat } from "@/types/intro";
import { getTypingDurationInSeconds } from "@/components/ui/typewriter/typingRhythm";
import { CAT_SPEECH_CHARACTERS_PER_SECOND } from "@/settings/speechSettings";

export const INTRO_BEAT_ORDER: IntroBeat[] = [
  "flyIn",
  "complain",
  "askForHelp",
];

export const INTRO_LINES: Record<Exclude<IntroBeat, "flyIn">, string> = {
  complain:
    "It's almost time to go trick-or-treating...\nAnd I don't have a costume.",
  askForHelp: "Will you help me make one?",
};

export const INTRO_TEXT = `${INTRO_LINES.complain} ${INTRO_LINES.askForHelp}`;

export const INTRO_BEAT_DURATIONS: Record<
  Exclude<IntroBeat, "askForHelp">,
  number
> = {
  flyIn: 7,
  complain: getTypingDurationInSeconds(
    INTRO_TEXT,
    CAT_SPEECH_CHARACTERS_PER_SECOND,
  ),
};

export const INTRO_DILATED_PUPIL_BEATS: IntroBeat[] = ["askForHelp"];
