import { useGameStore } from "@/store/gameStore";
import { WINGS_FLAPPING_BEATS } from "@/settings/finaleSettings";

export function useIsCatFlying() {
  return useGameStore(
    (state) =>
      state.isCatFreeFlying ||
      (state.finaleBeat !== null &&
        WINGS_FLAPPING_BEATS.includes(state.finaleBeat)),
  );
}
