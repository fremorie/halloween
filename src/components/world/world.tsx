import { Lights } from "@/components/lighting/experiments/lights";
import { Level1 } from "@/components/puzzles/level1/level1";
import { Ground } from "./ground";

export function World() {
  return (
    <>
      <Lights />
      <Level1 />
      <Ground />
    </>
  );
}
