import { useMemo, useState } from "react";

import { InstancedBranches } from "@/components/models/branch/instancedBranches";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { useGameStore } from "@/store/gameStore";
import type { Graph } from "@/types/graph";
import type { NodeState } from "@/types/puzzle";
import {
  EMPTY_ATTEMPT,
  getCurrentNodeId,
  getEdgeThreading,
  getEdgeThreadStartNodeIds,
  getHoverPreviewAttempt,
  getNodeYarnColor,
} from "@/utils/puzzle";
import { DragLine } from "./dragLine";
import { PuzzleNode } from "./puzzleNode";
import { RejectionMessage } from "./rejectionMessage";

type Props = {
  graph: Graph;
  levelIndex: number;
  isActive: boolean;
};

export function EulerianPath({ graph, levelIndex, isActive }: Props) {
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);

  const clearHoveredNode = (nodeId: number) =>
    setHoveredNodeId((currentHoveredNodeId) =>
      currentHoveredNodeId === nodeId ? null : currentHoveredNodeId,
    );

  const yarnMaterials = useYarnMaterials();

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

  const edgeThreadStartNodeIds = useMemo(
    () => getEdgeThreadStartNodeIds(graph, attempt),
    [graph, attempt],
  );

  const getNodeState = (nodeId: number, pathOrder: number): NodeState => {
    if (nodeId === currentNodeId) return "current";
    if (pathOrder !== -1) return "visited";
    return "idle";
  };

  const previewNodeId = isActive && isDrawing ? hoveredNodeId : null;
  const previewAttempt = useMemo(
    () => getHoverPreviewAttempt(graph, attempt, previewNodeId),
    [graph, attempt, previewNodeId],
  );
  const edgeThreading = useMemo(
    () => getEdgeThreading(graph, previewAttempt),
    [graph, previewAttempt],
  );

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
            onHoverStart={setHoveredNodeId}
            onHoverEnd={clearHoveredNode}
          />
        );
      })}

      <InstancedBranches
        graph={graph}
        edgeThreading={edgeThreading}
        edgeThreadStartNodeIds={edgeThreadStartNodeIds}
      />

      {currentNodeId !== null && (
        <DragLine
          startPosition={graph.nodes[currentNodeId].position}
          yarnColor={getNodeYarnColor(currentNodeId)}
        />
      )}

      <RejectionMessage graph={graph} levelIndex={levelIndex} />
    </group>
  );
}
