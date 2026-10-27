import { TypewriterText } from "@/components/ui/typewriter/typewriterText";
import { INTRO_TEXT } from "@/settings/introSettings";
import { CAT_SPEECH_CHARACTERS_PER_SECOND } from "@/settings/speechSettings";

export function Content() {
  return (
    <p>
      <TypewriterText
        text={INTRO_TEXT}
        charactersPerSecond={CAT_SPEECH_CHARACTERS_PER_SECOND}
      />
    </p>
  );
}
