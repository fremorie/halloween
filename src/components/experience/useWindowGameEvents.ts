import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export function useWindowGameEvents() {
  useEffect(() => {
    const releasePointer = () => useGameStore.getState().releasePointer();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.code === "Escape") {
        useGameStore.getState().cutThread();
      }
    };

    window.addEventListener("pointerup", releasePointer);
    window.addEventListener("pointercancel", releasePointer);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerup", releasePointer);
      window.removeEventListener("pointercancel", releasePointer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
