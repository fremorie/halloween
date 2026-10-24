import { useState } from "react";
import { Html } from "@react-three/drei";

import { ErrorMessage } from "@/components/ui/error/error";
import { REFUSAL_MESSAGES } from "@/settings/puzzleSettings";
import { useGameStore } from "@/store/gameStore";
import type { Graph } from "@/types/graph";
import { getMidpoint } from "@/utils/graph";

type Props = {
  graph: Graph;
  levelIndex: number;
};

export function RejectionMessage({ graph, levelIndex }: Props) {
  const rejection = useGameStore((state) =>
    state.rejection?.levelIndex === levelIndex ? state.rejection : null,
  );

  const [lastRejection, setLastRejection] = useState(rejection);
  if (rejection && rejection !== lastRejection) {
    setLastRejection(rejection);
  }

  if (!lastRejection) return null;

  return (
    <Html
      className="pointer-events-none whitespace-nowrap"
      position={getMidpoint(
        graph.nodes[lastRejection.fromNodeId].position,
        graph.nodes[lastRejection.nodeId].position,
      )}
      center
    >
      <ErrorMessage
        message={REFUSAL_MESSAGES[lastRejection.reason]}
        occurrence={lastRejection}
        isShowing={rejection !== null}
      />
    </Html>
  );
}
