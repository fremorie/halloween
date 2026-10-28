import { useEffect } from "react";

import { useGameStore } from "@/store/gameStore";

export function useCapeSound() {
  const capeSound = useGameStore((state) => state.capeSound);

  useEffect(() => {
    if (capeSound === null) return;

    const capeSoundId = capeSound.play();
    return () => {
      capeSound.stop(capeSoundId);
    };
  }, [capeSound]);
}
