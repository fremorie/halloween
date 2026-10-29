import { useLeavesMaterial } from "@/components/models/tree/useLeavesMaterial";
import { TreeModel } from "@/components/models/tree/treeModel";

export function Tree() {
  const leavesMaterial = useLeavesMaterial();

  return <TreeModel scale={0.5} leavesMaterial={leavesMaterial} />;
}
