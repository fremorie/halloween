import { TreeV4Model } from "@/components/models/tree-v4/treeV4Model";
import { useTreeV4Materials } from "@/components/models/tree-v4/useTreeV4Materials";

import { useFullyRevealedColors } from "./useFullyRevealedColors";

export function Tree() {
  const treeV4Materials = useTreeV4Materials();
  useFullyRevealedColors();

  return <TreeV4Model materials={treeV4Materials} scale={0.5} />;
}
