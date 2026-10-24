import type { KeyboardControlsEntry } from "@react-three/drei";

export type ControlName = "forward" | "backward" | "left" | "right";

export const KEYBOARD_CONTROLS_MAP: KeyboardControlsEntry<ControlName>[] = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
];

export type HeldControls = Record<ControlName, boolean>;

export const JOYSTICK_SIZE = 120;
export const JOYSTICK_COLOR = {
  back: "#7a4f78",
  front: "#f6ba3d",
};
