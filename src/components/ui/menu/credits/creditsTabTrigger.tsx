import { Tabs } from "radix-ui";

import { dosis } from "@/components/ui/fonts/fonts";

type CreditsTabTriggerProps = {
  value: string;
  label: string;
};

export function CreditsTabTrigger({ value, label }: CreditsTabTriggerProps) {
  return (
    <Tabs.Trigger
      value={value}
      className={`${dosis.className} cursor-pointer text-sm font-bold tracking-widest text-neutral-500 uppercase decoration-2 underline-offset-4 hover:text-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:underline`}
    >
      {label}
    </Tabs.Trigger>
  );
}
