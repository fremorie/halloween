"use client";

import { TypewriterText } from "@/components/ui/typewriter/typewriterText";
import { CAT_SPEECH_CHARACTERS_PER_SECOND } from "@/settings/speechSettings";
import { useMeow } from "./useMeow";

type CatSpeechTextProps = {
  text: string;
};

export function CatSpeechText({ text }: CatSpeechTextProps) {
  useMeow(text);

  return (
    <TypewriterText
      text={text}
      charactersPerSecond={CAT_SPEECH_CHARACTERS_PER_SECOND}
    />
  );
}
