import Image from "next/image";

const BRUSH_STROKE_HORIZONTAL_SCALE = 0.6;

const brushStrokeImages = {
  purple: {
    source: `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_purple.webp`,
    width: 750,
    height: 240,
  },
  yellow: {
    source: `${process.env.NEXT_PUBLIC_BASE_PATH}/ui/brushstrokes/brush_stroke_yellow.webp`,
    width: 736,
    height: 240,
  },
};

type BrushStrokeProps = {
  color: keyof typeof brushStrokeImages;
  displayedHeightInPixels: number;
  className?: string;
};

export function BrushStroke({
  color,
  displayedHeightInPixels,
  className = "",
}: BrushStrokeProps) {
  const { source, width, height } = brushStrokeImages[color];
  const displayedWidthInPixels =
    (displayedHeightInPixels * width * BRUSH_STROKE_HORIZONTAL_SCALE) / height;
  return (
    <Image
      src={source}
      width={width}
      height={height}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none absolute mix-blend-multiply select-none ${className}`}
      style={{
        width: displayedWidthInPixels,
        height: displayedHeightInPixels,
      }}
    />
  );
}
