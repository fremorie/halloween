import { useMemo, useRef } from "react";
import type { Group } from "three";

import { InstancedBranches } from "@/components/models/branch/instancedBranches";
import { useYarnMaterials } from "@/components/models/yarnBall/materials";
import { NODE_RADIUS } from "@/settings/graphSettings";
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
  const groupRef = useRef<Group>(null);

  const activeLevelIndex = useGameStore((state) => state.activeLevelIndex);
  const liveAttempt = useGameStore((state) => state.attempt);
  const puzzlePhase = useGameStore((state) => state.puzzlePhase);
  const solvedAttempt = useGameStore(
    (state) => state.solvedAttempts[levelIndex],
  );

  const isThisLevelLive = activeLevelIndex === levelIndex;
  const attempt = isThisLevelLive
    ? liveAttempt
    : (solvedAttempt ?? EMPTY_ATTEMPT);
  const isDrawing = isThisLevelLive && puzzlePhase === "drawing";
  const currentNodeId = isDrawing ? getCurrentNodeId(attempt) : null;

  const branchSegments = useMemo(
    () =>
      graph.edges.map((edge) => ({
        from: graph.nodes[edge.a].position,
        to: graph.nodes[edge.b].position,
      })),
    [graph],
  );

  const edgeThreading = useMemo(
    () => getEdgeThreading(graph, attempt),
    [graph, attempt],
  );

  const getNodeState = (nodeId: number): NodeState => {
    if (nodeId === currentNodeId) return "current";
    if (attempt.path.includes(nodeId)) return "visited";
    return "idle";
  };

  return (
    <group ref={groupRef}>
      {graph.nodes.map((node) => (
        <PuzzleNode
          key={node.id}
          node={node}
          levelIndex={levelIndex}
          material={yarnMaterials[node.id % yarnMaterials.length]}
          state={getNodeState(node.id)}
          isActive={isActive}
        />
      ))}

      <InstancedBranches
        branchSegments={branchSegments}
        tuckDistance={NODE_RADIUS * 0.8}
        edgeThreading={edgeThreading}
      />

      {isDrawing && <DragLine groupRef={groupRef} graph={graph} />}
    </group>
  );
}
