import { useGameStore } from "@/store/gameStore";
import { WINGS_FLAPPING_BEATS } from "@/settings/finaleSettings";

export function useIsFinaleFlying() {
  return useGameStore(
    (state) =>
      state.finaleBeat !== null &&
      WINGS_FLAPPING_BEATS.includes(state.finaleBeat),
  );
}
