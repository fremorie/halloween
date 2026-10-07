"use client";

import { useEffect, useMemo } from "react";

import KuwaharaEffect from "./kuwahara-effect";

export function Kuwahara() {
  const effect = useMemo(() => new KuwaharaEffect(), []);

  useEffect(() => () => effect.dispose(), [effect]);

  return <primitive object={effect} />;
}
