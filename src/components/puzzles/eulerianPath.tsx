import { useMemo } from "react";

import { InstancedBranches } from "@/components/models/branch/instancedBranches";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { useGameStore } from "@/store/gameStore";
import type { Graph } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import { EMPTY_ATTEMPT, getCurrentNodeId } from "@/utils/puzzle/attempt";
import { getEdgeThreading } from "@/utils/puzzle/getEdgeThreading";
import { DragLine } from "./dragLine";
import { PuzzleNode } from "./puzzleNode";

type Props = {
  graph: Graph;
  levelIndex: number;
  isActive: boolean;
};

export function EulerianPath({ graph, levelIndex, isActive }: Props) {
  const yarnMaterials = useYarnMaterials();

  const attempt = useGameStore((state) =>
    state.currentStationIndex === levelIndex
      ? state.attempt
      : (state.solvedAttempts[levelIndex] ?? EMPTY_ATTEMPT),
  );
  const puzzlePhase = useGameStore((state) =>
    state.currentStationIndex === levelIndex ? state.puzzlePhase : "ready",
  );

  const isDrawing = puzzlePhase === "drawing";
  const isCelebrating = puzzlePhase === "won";
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
            pathOrder={pathOrder}
            isActive={isActive}
            isCelebrating={isCelebrating}
          />
        );
      })}

      <InstancedBranches graph={graph} edgeThreading={edgeThreading} />

      {currentNodeId !== null && (
        <DragLine startPosition={graph.nodes[currentNodeId].position} />
      )}
    </group>
  );
}
