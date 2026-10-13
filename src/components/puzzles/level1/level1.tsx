import { PedestalModel } from "@/components/models/pedestal/pedestalModel";
import { EulerianPath } from "./eulerianPath";

export function Level1() {
  return (
    <>
      <PedestalModel />
      <group position-y={0.8}>
        <EulerianPath />
      </group>
    </>
  );
}
