import { useMemo } from "react";

import { TypewriterText } from "@/components/ui/typewriter/typewriterText";
import { getCharactersPerSecondToFitDuration } from "@/components/ui/typewriter/typingRhythm";
import { TextBox } from "@/components/ui/textBox/textBox";
import { SPEECH_TYPING_DURATION } from "@/settings/rewardSettings";

type Props = {
  text: string;
};

export function Comment({ text }: Props) {
  const charactersPerSecond = useMemo(
    () => getCharactersPerSecondToFitDuration(text, SPEECH_TYPING_DURATION),
    [text],
  );

  return (
    <div className="w-full max-w-2xl text-center">
      <TextBox>
        <p>
          <TypewriterText
            text={text}
            charactersPerSecond={charactersPerSecond}
          />
        </p>
      </TextBox>
    </div>
  );
}
