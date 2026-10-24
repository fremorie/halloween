"use client";

import { create } from "nipplejs";

import { joystickTilt } from "@/store/joystickTilt";
import { JOYSTICK_COLOR, JOYSTICK_SIZE } from "@/settings/controlsSettings";
import { isTouchScreen } from "@/utils/isTouchScreen";

function attachJoystick(zone: HTMLDivElement) {
  const joystick = create({
    zone,
    mode: "static",
    position: { left: "50%", top: "50%" },
    size: JOYSTICK_SIZE,
    color: JOYSTICK_COLOR,
  });
  joystick.on("move", ({ data }) =>
    joystickTilt.set(data.vector.x, data.vector.y),
  );
  joystick.on("end", () => joystickTilt.set(0, 0));

  return () => {
    joystick.destroy();
    joystickTilt.set(0, 0);
  };
}

export function TouchJoystick() {
  if (!isTouchScreen()) return null;

  return (
    <div
      ref={attachJoystick}
      className="absolute right-8 bottom-8 isolate size-60"
    />
  );
}
