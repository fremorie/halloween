import { TypewriterText } from "@/components/ui/typewriter/typewriterText";
import { getCharactersPerSecondToFitDuration } from "@/components/ui/typewriter/typingRhythm";
import { INTRO_BEAT_DURATIONS, INTRO_LINES } from "@/settings/introSettings";

const INTRO_TEXT = `${INTRO_LINES.complain} ${INTRO_LINES.askForHelp}`;

const INTRO_CHARACTERS_PER_SECOND = getCharactersPerSecondToFitDuration(
  INTRO_TEXT,
  INTRO_BEAT_DURATIONS.complain,
);

export function Content() {
  return (
    <p>
      <TypewriterText
        text={INTRO_TEXT}
        charactersPerSecond={INTRO_CHARACTERS_PER_SECOND}
      />
    </p>
  );
}
