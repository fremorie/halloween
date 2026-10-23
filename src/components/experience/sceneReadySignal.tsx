import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const FRAMES_BEFORE_READY = 3;

type Props = {
  onSceneReady: () => void;
};

export function SceneReadySignal({ onSceneReady }: Props) {
  const renderedFrameCount = useRef(0);

  useFrame(() => {
    if (renderedFrameCount.current > FRAMES_BEFORE_READY) return;
    renderedFrameCount.current += 1;
    if (renderedFrameCount.current > FRAMES_BEFORE_READY) onSceneReady();
  });

  return null;
}
