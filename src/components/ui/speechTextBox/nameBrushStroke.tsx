import Image from "next/image";

import { barrio } from "@/components/ui/fonts/fonts";

const yellowBrushStrokeSource = `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_yellow.webp`;

type NameBrushStrokeProps = {
  name: string;
};

export function NameBrushStroke({ name }: NameBrushStrokeProps) {
  return (
    <div className="absolute top-0 -left-7 -translate-y-1/2">
      <Image
        src={yellowBrushStrokeSource}
        width={442}
        height={240}
        alt=""
        className="pointer-events-none absolute inset-0 size-full"
      />
      <span
        className={`${barrio.className} relative block px-10 py-2 text-2xl text-neutral-900`}
      >
        {name}
      </span>
    </div>
  );
}
