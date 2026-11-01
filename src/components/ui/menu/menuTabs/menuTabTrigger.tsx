import Image from "next/image";
import { Tabs } from "radix-ui";

import { dosis } from "@/components/ui/fonts/fonts";

const yellowBrushStrokeSource = `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_yellow.webp`;

type MenuTabTriggerProps = {
  value: string;
  label: string;
};

export function MenuTabTrigger({ value, label }: MenuTabTriggerProps) {
  return (
    <Tabs.Trigger
      value={value}
      className={`${dosis.className} group relative cursor-pointer px-4 py-1 text-lg font-bold tracking-widest text-neutral-900 uppercase`}
    >
      <Image
        src={yellowBrushStrokeSource}
        width={442}
        height={240}
        alt=""
        className="pointer-events-none absolute inset-0 size-full opacity-0 mix-blend-multiply transition-opacity group-hover:opacity-35 group-data-[state=active]:opacity-100"
      />
      <span className="relative">{label}</span>
    </Tabs.Trigger>
  );
}
