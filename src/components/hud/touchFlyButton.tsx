import { type MouseEvent, useEffect } from "react";

import { BrushKeyCap } from "@/components/ui/brushKeyCap/brushKeyCap";
import { flyButtonHold } from "@/store/flyButtonHold";
import { isTouchScreen } from "@/utils/isTouchScreen";

export function TouchFlyButton() {
  useEffect(
    () => () => {
      flyButtonHold.isHeld = false;
    },
    [],
  );

  if (!isTouchScreen()) return null;

  const startFlying = () => {
    flyButtonHold.isHeld = true;
  };
  const stopFlying = () => {
    flyButtonHold.isHeld = false;
  };
  const preventLongPressMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <button
      type="button"
      onPointerDown={startFlying}
      onPointerUp={stopFlying}
      onPointerCancel={stopFlying}
      onContextMenu={preventLongPressMenu}
      className="pointer-events-auto absolute bottom-38 left-38 -translate-x-1/2 translate-y-1/2 touch-none select-none [-webkit-touch-callout:none]"
    >
      <BrushKeyCap className="h-16 px-8 text-2xl">fly</BrushKeyCap>
    </button>
  );
}
