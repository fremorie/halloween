"use client";

import type { Ref } from "react";

import { dosis } from "@/components/ui/fonts/fonts";

type StartButtonProps = {
  onClick: () => void;
  ref?: Ref<HTMLButtonElement>;
};

export function StartButton({ onClick, ref }: StartButtonProps) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`${dosis.className} invisible h-full w-full cursor-pointer font-bold text-white opacity-0`}
    >
      START
    </button>
  );
}
