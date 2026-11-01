import { Dialog } from "radix-ui";
import { useState } from "react";

import { DialogBox } from "@/components/ui/dialogBox/dialogBox";
import { Button } from "@/components/ui/button/button";

export function PuzzleInstructions() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogBox title="Summon a costume piece">
        <div className="flex flex-col items-center">
          <Dialog.Description className="py-4">
            Visit every edge exactly <b>once</b>.<br />
            Click a yarn ball to start threading.
          </Dialog.Description>
          <Button onClick={() => setIsOpen(false)}>Got it!</Button>
        </div>
      </DialogBox>
    </Dialog.Root>
  );
}
