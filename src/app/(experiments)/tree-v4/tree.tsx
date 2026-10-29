import { TreeV4Model } from "@/components/models/tree-v4/treeV4Model";

import { useFullyRevealedColors } from "./useFullyRevealedColors";

export function Tree() {
  useFullyRevealedColors();

  return <TreeV4Model scale={0.5} />;
}
