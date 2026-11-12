import { type MouseEvent, useEffect } from "react";

import { alef } from "@/components/ui/fonts/fonts";
import { flyButtonHold } from "@/store/flyButtonHold";
import { FLY_BUTTON_SIZE, JOYSTICK_COLOR } from "@/settings/controlsSettings";
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
      style={{
        width: FLY_BUTTON_SIZE,
        height: FLY_BUTTON_SIZE,
        backgroundColor: JOYSTICK_COLOR.back,
        borderColor: JOYSTICK_COLOR.front,
      }}
      className={`${alef.className} pointer-events-auto absolute bottom-38 left-38 flex -translate-x-1/2 translate-y-1/2 touch-none items-center justify-center rounded-full border-4 text-4xl text-white select-none [-webkit-touch-callout:none]`}
    >
      FLY
    </button>
  );
}
