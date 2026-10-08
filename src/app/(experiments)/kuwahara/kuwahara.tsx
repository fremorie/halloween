"use client";

import { useEffect, useMemo } from "react";

import KuwaharaEffect from "./kuwaharaEffect";
import ColorGradeEffect from "./colorGradeEffect";

export function Kuwahara() {
  const effects = useMemo(
    () => ({
      kuwahara: new KuwaharaEffect(),
      colorGrade: new ColorGradeEffect(),
    }),
    [],
  );

  useEffect(
    () => () => {
      effects.kuwahara.dispose();
      effects.colorGrade.dispose();
    },
    [effects],
  );

  return (
    <>
      <primitive object={effects.kuwahara} />
      <primitive object={effects.colorGrade} />
    </>
  );
}
