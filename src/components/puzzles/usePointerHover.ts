import { useCursor } from "@react-three/drei";
import { useEffect, useState } from "react";

export function usePointerHover(isActive: boolean) {
  const [isHovered, setIsHovered] = useState(false);
  useCursor(isHovered);

  useEffect(() => {
    if (!isActive) return;
    return () => setIsHovered(false);
  }, [isActive]);

  return {
    isHovered,
    startHover: () => setIsHovered(true),
    endHover: () => setIsHovered(false),
  };
}
