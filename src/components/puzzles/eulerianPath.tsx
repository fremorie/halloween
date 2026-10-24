import { useMemo } from "react";
import { Html } from "@react-three/drei";

import { InstancedBranches } from "@/components/models/branch/instancedBranches";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { useGameStore } from "@/store/gameStore";
import type { Graph } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import {
  EMPTY_ATTEMPT,
  getCurrentNodeId,
  getEdgeThreading,
} from "@/utils/puzzle";
import { DragLine } from "./dragLine";
import { PuzzleNode } from "./puzzleNode";
import { REFUSAL_MESSAGES } from "@/settings/puzzleSettings";
import { ErrorMessage } from "@/components/ui/error/error";
import { getMidpoint } from "@/utils/graph";

type Props = {
  graph: Graph;
  levelIndex: number;
  isActive: boolean;
};

export function EulerianPath({ graph, levelIndex, isActive }: Props) {
  const yarnMaterials = useYarnMaterials();

  const rejection = useGameStore((state) =>
    state.rejection?.levelIndex === levelIndex ? state.rejection : null,
  );
  const attempt = useGameStore(
    (state) =>
      state.solvedAttempts[levelIndex] ??
      (state.currentStationIndex === levelIndex
        ? state.attempt
        : EMPTY_ATTEMPT),
  );
  const puzzlePhase = useGameStore((state) =>
    state.currentStationIndex === levelIndex ? state.puzzlePhase : "ready",
  );

  const isDrawing = puzzlePhase === "drawing";
  const currentNodeId = isDrawing ? getCurrentNodeId(attempt) : null;

  const edgeThreading = useMemo(
    () => getEdgeThreading(graph, attempt),
    [graph, attempt],
  );

  const getNodeState = (nodeId: number, pathOrder: number): NodeState => {
    if (nodeId === currentNodeId) return "current";
    if (pathOrder !== -1) return "visited";
    return "idle";
  };

  return (
    <group>
      {graph.nodes.map((node) => {
        const pathOrder = attempt.path.indexOf(node.id);
        return (
          <PuzzleNode
            key={node.id}
            node={node}
            levelIndex={levelIndex}
            material={yarnMaterials[node.id % yarnMaterials.length]}
            state={getNodeState(node.id, pathOrder)}
            isActive={isActive}
          />
        );
      })}

      <InstancedBranches graph={graph} edgeThreading={edgeThreading} />

      {currentNodeId !== null && (
        <DragLine startPosition={graph.nodes[currentNodeId].position} />
      )}

      {isDrawing && rejection && currentNodeId && (
        <Html
          className="pointer-events-none whitespace-nowrap"
          position={getMidpoint(
            graph.nodes[currentNodeId].position,
            graph.nodes[rejection.nodeId].position,
          )}
          center
        >
          <ErrorMessage message={REFUSAL_MESSAGES[rejection.reason]} />
        </Html>
      )}
    </group>
  );
}
