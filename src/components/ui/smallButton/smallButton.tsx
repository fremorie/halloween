import type { ComponentPropsWithRef, MouseEvent } from "react";

import { BrushStroke } from "@/components/ui/textBox/brushStroke";

type SmallButtonProps = ComponentPropsWithRef<"button">;

export function SmallButton({
  className,
  children,
  ...buttonProps
}: SmallButtonProps) {
  const keepFocusOnGameWhenClicked = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <button
      type="button"
      onMouseDown={keepFocusOnGameWhenClicked}
      {...buttonProps}
      className={`flex size-11 cursor-pointer items-center justify-center border-2 border-black bg-button text-neutral-900 outline-offset-4 transition-transform hover:-rotate-3 focus-visible:outline-2 active:rotate-0 ${className ?? ""}`}
    >
      <BrushStroke color="yellow" className="-top-1.5 -left-2 h-4" />
      <BrushStroke color="purple" className="-right-2 -bottom-1.5 h-4" />
      {children}
    </button>
  );
}
