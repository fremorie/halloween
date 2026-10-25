import { useCallback, useEffect, useMemo, useRef } from "react";
import { addAfterEffect, useFrame, useThree } from "@react-three/fiber";

const NANOSECONDS_PER_MILLISECOND = 1e6;
const SMOOTHING_WEIGHT_OF_PREVIOUS_VALUE = 0.9;
const PRIORITY_BEFORE_EFFECT_COMPOSER = 0;

export function useGpuFrameTime() {
  const gl = useThree((state) => state.gl);
  const smoothedMillisecondsRef = useRef(0);
  const activeQueryRef = useRef<WebGLQuery | null>(null);
  const pendingQueriesRef = useRef<WebGLQuery[]>([]);

  const timer = useMemo(() => {
    const context = gl.getContext() as WebGL2RenderingContext;
    const extension = context.getExtension("EXT_disjoint_timer_query_webgl2");
    return extension ? { context, extension } : null;
  }, [gl]);

  useFrame(() => {
    if (!timer || activeQueryRef.current) return;

    const query = timer.context.createQuery();
    if (!query) return;

    timer.context.beginQuery(timer.extension.TIME_ELAPSED_EXT, query);
    activeQueryRef.current = query;
  }, PRIORITY_BEFORE_EFFECT_COMPOSER);

  useEffect(() => {
    if (!timer) return;
    const { context, extension } = timer;

    return addAfterEffect(() => {
      if (activeQueryRef.current) {
        context.endQuery(extension.TIME_ELAPSED_EXT);
        pendingQueriesRef.current.push(activeQueryRef.current);
        activeQueryRef.current = null;
      }

      const stillPendingQueries: WebGLQuery[] = [];
      for (const query of pendingQueriesRef.current) {
        const isResultAvailable = context.getQueryParameter(
          query,
          context.QUERY_RESULT_AVAILABLE,
        ) as boolean;
        if (!isResultAvailable) {
          stillPendingQueries.push(query);
          continue;
        }

        const isDisjoint = context.getParameter(
          extension.GPU_DISJOINT_EXT,
        ) as boolean;
        if (!isDisjoint) {
          const nanoseconds = context.getQueryParameter(
            query,
            context.QUERY_RESULT,
          ) as number;
          const milliseconds = nanoseconds / NANOSECONDS_PER_MILLISECOND;
          smoothedMillisecondsRef.current =
            smoothedMillisecondsRef.current *
              SMOOTHING_WEIGHT_OF_PREVIOUS_VALUE +
            milliseconds * (1 - SMOOTHING_WEIGHT_OF_PREVIOUS_VALUE);
        }
        context.deleteQuery(query);
      }
      pendingQueriesRef.current = stillPendingQueries;
    });
  }, [timer]);

  const readSmoothedGpuMilliseconds = useCallback(
    () => smoothedMillisecondsRef.current,
    [],
  );

  return readSmoothedGpuMilliseconds;
}
