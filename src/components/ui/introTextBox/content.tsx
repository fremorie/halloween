import { CatSpeechText } from "@/components/ui/catSpeech/catSpeechText";
import { INTRO_TEXT } from "@/settings/introSettings";

export function Content() {
  return (
    <p>
      <CatSpeechText text={INTRO_TEXT} />
    </p>
  );
}
