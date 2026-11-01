"use client";

import { Dialog } from "radix-ui";
import { useState } from "react";

import { Button } from "@/components/ui/button/button";
import { DialogBox } from "@/components/ui/dialogBox/dialogBox";
import { SmallButton } from "@/components/ui/smallButton/smallButton";
import { CloseIcon } from "@/components/ui/svgs/close";
import { HamburgerIcon } from "@/components/ui/svgs/hamburger";
import { MenuTabs } from "./menuTabs/menuTabs";

export function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <Dialog.Trigger asChild>
        <SmallButton aria-label="Open menu" className="fixed top-4 left-4 z-30">
          <HamburgerIcon />
        </SmallButton>
      </Dialog.Trigger>
      <DialogBox title="Costume for Marcelino" isPinnedToTop>
        <Dialog.Close asChild>
          <SmallButton
            hasBrushStrokes={false}
            aria-label="Close menu"
            className="absolute top-4 right-4"
          >
            <CloseIcon />
          </SmallButton>
        </Dialog.Close>
        <div className="mt-5 flex w-2xl max-w-full flex-col gap-6">
          <MenuTabs />
          <div className="flex justify-center">
            <Button onClick={() => setIsMenuOpen(false)}>Close</Button>
          </div>
        </div>
      </DialogBox>
    </Dialog.Root>
  );
}
