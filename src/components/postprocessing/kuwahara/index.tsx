"use client";

import { useEffect, useMemo } from "react";

import KuwaharaEffect from "./kuwaharaEffect";
import ColorGradeEffect from "./colorGradeEffect";
import PaperEffect from "./paperEffect";

export function Kuwahara() {
  const effects = useMemo(
    () => ({
      kuwahara: new KuwaharaEffect(),
      colorGrade: new ColorGradeEffect(),
      paper: new PaperEffect(),
    }),
    [],
  );

  useEffect(
    () => () => {
      effects.kuwahara.dispose();
      effects.colorGrade.dispose();
      effects.paper.dispose();
    },
    [effects],
  );

  return (
    <>
      <primitive object={effects.kuwahara} />
      <primitive object={effects.colorGrade} />
      <primitive object={effects.paper} />
    </>
  );
}
