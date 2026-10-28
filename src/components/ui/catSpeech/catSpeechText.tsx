import { TypewriterText } from "@/components/ui/typewriter/typewriterText";
import { CAT_SPEECH_CHARACTERS_PER_SECOND } from "@/settings/speechSettings";

type CatSpeechTextProps = {
  text: string;
};

export function CatSpeechText({ text }: CatSpeechTextProps) {
  return (
    <TypewriterText
      text={text}
      charactersPerSecond={CAT_SPEECH_CHARACTERS_PER_SECOND}
    />
  );
}
