import { monitor, useControls } from "leva";

import { useGpuFrameTime } from "@/components/debug/useGpuFrameTime";

const GPU_TEXT_SETTINGS = { graph: false, interval: 100 };
const GPU_GRAPH_SETTINGS = { graph: true, interval: 100 };

export function useGpuFrameTimeControls() {
  const readSmoothedGpuMilliseconds = useGpuFrameTime();

  useControls("Render", {
    gpu: monitor(
      () => `${readSmoothedGpuMilliseconds().toFixed(2)} ms`,
      GPU_TEXT_SETTINGS,
    ),
    gpuGraph: monitor(readSmoothedGpuMilliseconds, GPU_GRAPH_SETTINGS),
  });
}
