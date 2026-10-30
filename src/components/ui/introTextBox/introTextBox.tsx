import { Content } from "./content";
import { SpeechTextBox } from "@/components/ui/speechTextBox/speechTextBox";

export function IntroTextBox() {
  return (
    <div className="w-full max-w-2xl text-center">
      <SpeechTextBox>
        <Content />
      </SpeechTextBox>
    </div>
  );
}
