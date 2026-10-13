import { create } from "zustand";
import { Vector3 } from "three";

type GameState = {
  catPosition: Vector3;
};

export const useGameStore = create<GameState>()(() => ({
  catPosition: new Vector3(),
}));
