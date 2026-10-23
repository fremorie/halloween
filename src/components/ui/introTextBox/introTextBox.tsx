import { TextBox } from "@/components/ui/textBox/textBox";
import { Content } from "./content";

export function IntroTextBox() {
  return (
    <div className="w-full max-w-2xl text-left">
      <TextBox>
        <Content />
      </TextBox>
    </div>
  );
}
