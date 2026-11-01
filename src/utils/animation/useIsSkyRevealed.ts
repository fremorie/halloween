import { useGameStore } from "@/store/gameStore";

export function useIsSkyRevealed() {
  return useGameStore(
    (state) =>
      state.mode === "done" ||
      state.finaleBeat === "landing" ||
      state.finaleBeat === "thankYou",
  );
}
