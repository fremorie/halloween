"use client";

import { Progress } from "radix-ui";

type Props = {
  value: number;
};

export function ProgressBar({ value }: Props) {
  return (
    <Progress.Root value={value} className="h-8 w-64 border-2 border-black p-1">
      <div className="h-full overflow-hidden">
        <Progress.Indicator
          className="h-full bg-black transition-transform"
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </div>
    </Progress.Root>
  );
}
