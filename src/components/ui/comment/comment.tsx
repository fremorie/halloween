import { CatSpeechText } from "@/components/ui/catSpeech/catSpeechText";
import { SpeechTextBox } from "@/components/ui/speechTextBox/speechTextBox";

type Props = {
  text: string;
};

export function Comment({ text }: Props) {
  return (
    <div className="w-full max-w-2xl text-center">
      <SpeechTextBox>
        <p>
          <CatSpeechText text={text} />
        </p>
      </SpeechTextBox>
    </div>
  );
}
