"use client";

import { Progress } from "radix-ui";
import { type Ref, useRef } from "react";
import { useProgressFill } from "@/app/(experiments)/ui/progress-bar/useProgressFill";

type Props = {
  value: number;
  onFilled: () => void;
  ref?: Ref<HTMLDivElement>;
};

export function ProgressBar({ value, onFilled, ref }: Props) {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useProgressFill({ value, indicatorRef, onFilled });

  return (
    <Progress.Root
      ref={ref}
      value={value}
      className="h-5 w-64 border-2 border-black p-1"
    >
      <Progress.Indicator ref={indicatorRef} className="h-full w-0 bg-black" />
    </Progress.Root>
  );
}
