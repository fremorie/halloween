import { Dialog } from "radix-ui";
import { TextBox } from "@/components/ui/textBox/textBox";
import { barrio } from "@/components/ui/fonts/fonts";
import { Button } from "@/components/ui/button/button";
import { useState } from "react";

export function PuzzleInstructions() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content
          onOpenAutoFocus={(openAutoFocusEvent) =>
            openAutoFocusEvent.preventDefault()
          }
          className="fixed top-1/2 left-1/2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 data-[state=closed]:animate-puzzle-instructions-fade-out motion-reduce:animate-none"
        >
          <TextBox>
            <Dialog.Title className={`${barrio.className} text-4xl`}>
              Summon a costume piece
            </Dialog.Title>
            <div className="flex flex-col items-center">
              <Dialog.Description className="py-4">
                Visit every edge exactly <b>once</b>.<br />
                Click a yarn ball to start threading.
              </Dialog.Description>
              <Button onClick={() => setIsOpen(false)}>Got it!</Button>
            </div>
          </TextBox>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
