import { TextBox } from "@/components/ui/textBox/textBox";
import { barrio } from "@/components/ui/fonts/fonts";

export function PuzzleInstructions() {
  return (
    <TextBox>
      <h2 className={`${barrio.className} text-4xl`}>Summon a costume piece</h2>
      <p>
        Visit every edge exactly <b>once</b>.
      </p>
      <p>Click a yarn ball to start threading.</p>
    </TextBox>
  );
}
