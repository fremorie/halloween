"use client";

import { Howler } from "howler";
import { useState } from "react";

import { SmallButton } from "@/components/ui/smallButton/smallButton";
import { SpeakerIcon } from "./speakerIcon";

export function SoundToggleButton() {
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const toggleSound = () => {
    const isSoundMutedAfterToggle = !isSoundMuted;
    Howler.mute(isSoundMutedAfterToggle);
    setIsSoundMuted(isSoundMutedAfterToggle);
  };

  return (
    <SmallButton
      onClick={toggleSound}
      aria-label={isSoundMuted ? "Turn sound on" : "Turn sound off"}
      className="fixed bottom-4 left-4 z-30"
    >
      <SpeakerIcon isSoundMuted={isSoundMuted} />
    </SmallButton>
  );
}
