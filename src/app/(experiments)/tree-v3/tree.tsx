import { useLeavesMaterial } from "@/components/models/tree/useLeavesMaterial";
import { TreeModel } from "@/components/models/tree/treeModel";

import { useFullyRevealedColors } from "./useFullyRevealedColors";

export function Tree() {
  const leavesMaterial = useLeavesMaterial();
  useFullyRevealedColors();

  return <TreeModel scale={0.5} leavesMaterial={leavesMaterial} />;
}
