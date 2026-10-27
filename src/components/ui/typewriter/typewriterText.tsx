"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Fragment, useRef } from "react";

import { prefersReducedMotion } from "@/utils/animation/prefersReducedMotion";
import { getRevealTimesInSeconds } from "./typingRhythm";

type TypewriterTextProps = {
  text: string;
  charactersPerSecond: number;
};

function TypedOnceText({ text, charactersPerSecond }: TypewriterTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(SplitText);
    const { chars } = SplitText.create(textRef.current, {
      type: "words,chars",
    });
    const revealTimesInSeconds = getRevealTimesInSeconds(
      chars.map((character) => character.textContent),
      charactersPerSecond,
    );

    gsap.set(chars, { autoAlpha: 0 });
    const typingTimeline = gsap.timeline();
    chars.forEach((character, index) =>
      typingTimeline.set(
        character,
        { autoAlpha: 1 },
        revealTimesInSeconds[index],
      ),
    );
  });

  return (
    <span ref={textRef}>
      {text.split("\n").map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </span>
  );
}

export function TypewriterText(props: TypewriterTextProps) {
  return <TypedOnceText key={props.text} {...props} />;
}
