import Image from "next/image";

const brushStrokeImages = {
  purple: {
    source: `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_purple.webp`,
    width: 450,
    height: 240,
  },
  yellow: {
    source: `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_yellow.webp`,
    width: 442,
    height: 240,
  },
};

type BrushStrokeProps = {
  color: keyof typeof brushStrokeImages;
  className: string;
};

export function BrushStroke({ color, className }: BrushStrokeProps) {
  const { source, width, height } = brushStrokeImages[color];
  return (
    <Image
      src={source}
      width={width}
      height={height}
      alt=""
      className={`pointer-events-none absolute w-auto mix-blend-multiply ${className}`}
    />
  );
}
