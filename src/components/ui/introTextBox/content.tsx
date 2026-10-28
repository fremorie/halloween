import { CatSpeechText } from "@/components/ui/catSpeech/catSpeechText";
import { INTRO_TEXT } from "@/settings/introSettings";
import { useMeow } from "./useMeow";

export function Content() {
  useMeow();

  return (
    <p>
      <CatSpeechText text={INTRO_TEXT} />
    </p>
  );
}
