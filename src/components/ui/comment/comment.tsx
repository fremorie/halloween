import { TypewriterText } from "@/components/ui/typewriter/typewriterText";
import { TextBox } from "@/components/ui/textBox/textBox";
import { CAT_SPEECH_CHARACTERS_PER_SECOND } from "@/settings/speechSettings";

type Props = {
  text: string;
};

export function Comment({ text }: Props) {
  return (
    <div className="w-full max-w-2xl text-center">
      <TextBox>
        <p>
          <TypewriterText
            text={text}
            charactersPerSecond={CAT_SPEECH_CHARACTERS_PER_SECOND}
          />
        </p>
      </TextBox>
    </div>
  );
}
