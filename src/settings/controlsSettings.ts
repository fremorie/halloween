import type { KeyboardControlsEntry } from "@react-three/drei";

export type MovementControlName = "forward" | "backward" | "left" | "right";
export type ControlName = MovementControlName | "fly";

export const MOVEMENT_CONTROLS_MAP: KeyboardControlsEntry<MovementControlName>[] =
  [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
  ];

export const FLY_KEY_CODES = ["ShiftLeft", "ShiftRight"];

export const KEYBOARD_CONTROLS_MAP: KeyboardControlsEntry<ControlName>[] = [
  ...MOVEMENT_CONTROLS_MAP,
  { name: "fly", keys: FLY_KEY_CODES },
];

export type HeldControls = Record<ControlName, boolean>;

export const JOYSTICK_SIZE = 120;
export const FLY_BUTTON_SIZE = 100;
export const JOYSTICK_COLOR = {
  back: "#7a4f78",
  front: "#f6ba3d",
};
