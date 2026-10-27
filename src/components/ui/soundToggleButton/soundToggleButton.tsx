"use client";

import { Howler } from "howler";
import { useState } from "react";

import { BrushStroke } from "@/components/ui/textBox/brushStroke";
import { SpeakerIcon } from "./speakerIcon";

export function SoundToggleButton() {
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  function toggleSound() {
    const isSoundMutedAfterToggle = !isSoundMuted;
    Howler.mute(isSoundMutedAfterToggle);
    setIsSoundMuted(isSoundMutedAfterToggle);
  }

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={isSoundMuted ? "Turn sound on" : "Turn sound off"}
      className="fixed bottom-4 left-4 z-30 flex size-11 cursor-pointer items-center justify-center border-2 border-black bg-button text-neutral-900 outline-offset-4 transition-transform hover:-rotate-3 focus-visible:outline-2 active:rotate-0"
    >
      <BrushStroke color="yellow" className="-top-1.5 -left-2 h-4" />
      <BrushStroke color="purple" className="-right-2 -bottom-1.5 h-4" />
      <SpeakerIcon isSoundMuted={isSoundMuted} />
    </button>
  );
}
