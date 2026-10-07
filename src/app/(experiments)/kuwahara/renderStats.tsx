import { useThree } from "@react-three/fiber";
import { monitor, useControls } from "leva";

const settings = { graph: false, interval: 500 };

export function RenderStats() {
  const gl = useThree((state) => state.gl);

  useControls("Render", {
    calls: monitor(() => String(gl.info.render.calls), settings),
    triangles: monitor(() => String(gl.info.render.triangles), settings),
    geometries: monitor(() => String(gl.info.memory.geometries), settings),
    textures: monitor(() => String(gl.info.memory.textures), settings),
  });

  return null;
}
