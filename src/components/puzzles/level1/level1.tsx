import { PedestalModel } from "@/components/pedestal/pedestalModel";
import { EulerianPath } from "@/components/puzzles/level1/eulerianPath";

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
