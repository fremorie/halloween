import Image from "next/image";

import { alef } from "@/components/ui/fonts/fonts";

const redBrushStrokeSource = `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_red.webp`;

type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <div className="relative">
      <Image
        src={redBrushStrokeSource}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className="pointer-events-none object-fill"
      />
      <p
        role="alert"
        className={`${alef.className} relative px-12 py-6 text-center text-xl leading-relaxed text-white`}
      >
        {message}
      </p>
    </div>
  );
}
