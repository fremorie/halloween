import { CatSpeechText } from "@/components/ui/catSpeech/catSpeechText";
import { TextBox } from "@/components/ui/textBox/textBox";

type Props = {
  text: string;
};

export function Comment({ text }: Props) {
  return (
    <div className="w-full max-w-2xl text-center">
      <TextBox>
        <p>
          <CatSpeechText text={text} />
        </p>
      </TextBox>
    </div>
  );
}
