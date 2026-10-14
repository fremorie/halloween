import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export function useWindowGameEvents() {
  useEffect(() => {
    const releasePointer = () => useGameStore.getState().releasePointer();

    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);

    return () => {
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
    };
  }, []);
}
