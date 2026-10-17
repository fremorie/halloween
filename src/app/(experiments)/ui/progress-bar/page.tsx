"use client";

import { ProgressBarWithStartButton } from "./progressBarWithStartButton";
import { useEffect, useState } from "react";

const demoProgressSteps = [
  { delayInMilliseconds: 0, progressValue: 10 },
  { delayInMilliseconds: 1000, progressValue: 25 },
  { delayInMilliseconds: 2000, progressValue: 50 },
  { delayInMilliseconds: 4000, progressValue: 100 },
];

export default function Page() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const scheduledStepTimeouts = demoProgressSteps.map(
      ({ delayInMilliseconds, progressValue }) =>
        setTimeout(() => setValue(progressValue), delayInMilliseconds),
    );
    return () => scheduledStepTimeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <ProgressBarWithStartButton
        value={value}
        onStartClick={() => console.log("start")}
      />
    </div>
  );
}
