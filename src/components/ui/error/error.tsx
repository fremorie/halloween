import Image from "next/image";
import { useRef } from "react";

import { alef } from "@/components/ui/fonts/fonts";
import { useErrorMessageFade } from "./useErrorMessageFade";

const redBrushStrokeSource = `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_red.webp`;

type Props = {
  message: string;
  occurrence: object;
  isShowing: boolean;
};

export function ErrorMessage({ message, occurrence, isShowing }: Props) {
  const errorMessageRef = useRef<HTMLDivElement>(null);
  useErrorMessageFade({ errorMessageRef, occurrence, isShowing });

  return (
    <div ref={errorMessageRef} className="invisible relative opacity-0">
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
