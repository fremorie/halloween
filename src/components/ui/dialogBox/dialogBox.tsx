import { Dialog } from "radix-ui";
import type { ReactNode } from "react";

import { TextBox } from "@/components/ui/textBox/textBox";
import { barrio } from "@/components/ui/fonts/fonts";

type DialogBoxProps = {
  title: string;
  isPinnedToTop?: boolean;
  children: ReactNode;
};

export function DialogBox({
  title,
  isPinnedToTop = false,
  children,
}: DialogBoxProps) {
  const keepFocusOnGame = (focusEvent: Event) => focusEvent.preventDefault();
  const verticalPlacementClassName = isPinnedToTop
    ? "top-[12vh]"
    : "top-1/2 -translate-y-1/2";

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0" />
      <Dialog.Content
        onOpenAutoFocus={keepFocusOnGame}
        onCloseAutoFocus={keepFocusOnGame}
        className={`fixed left-1/2 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 ${verticalPlacementClassName} data-[state=closed]:animate-puzzle-instructions-fade-out motion-reduce:animate-none`}
      >
        <TextBox>
          <Dialog.Title className={`${barrio.className} text-4xl`}>
            {title}
          </Dialog.Title>
          {children}
        </TextBox>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
