import { TextBox } from "@/components/ui/textBox/textBox";
import { barrio } from "@/components/ui/fonts/fonts";
import { Button } from "@/components/ui/button/button";
import { useRef, useState } from "react";
import { usePuzzleInstructionsFadeOut } from "./usePuzzleInstructionsFadeOut";

export function PuzzleInstructions() {
  const [isVisible, setIsVisible] = useState(true);
  const puzzleInstructionsRef = useRef<HTMLDivElement>(null);
  usePuzzleInstructionsFadeOut({ isVisible, puzzleInstructionsRef });

  return (
    <div ref={puzzleInstructionsRef}>
      <TextBox>
        <h2 className={`${barrio.className} text-4xl`}>
          Summon a costume piece
        </h2>
        <div className="flex flex-col items-center">
          <p className="py-4">
            Visit every edge exactly <b>once</b>.<br />
            Click a yarn ball to start threading.
          </p>
          <Button onClick={() => setIsVisible(false)}>Got it!</Button>
        </div>
      </TextBox>
    </div>
  );
}
