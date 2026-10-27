const PAUSE_AFTER_PUNCTUATION_IN_SECONDS: Record<string, number> = {
  ".": 0.2,
  "!": 0.2,
  "?": 0.2,
  ",": 0.05,
};

function getPauseAfterCharacterInSeconds(characters: string[], index: number) {
  const nextCharacter = characters[index + 1];
  const isEndOfPunctuationRun =
    nextCharacter !== undefined &&
    !(nextCharacter in PAUSE_AFTER_PUNCTUATION_IN_SECONDS);
  return isEndOfPunctuationRun
    ? (PAUSE_AFTER_PUNCTUATION_IN_SECONDS[characters[index]] ?? 0)
    : 0;
}

export function getRevealTimesInSeconds(
  characters: string[],
  charactersPerSecond: number,
) {
  let accumulatedPauseInSeconds = 0;
  return characters.map((_, index) => {
    const revealTimeInSeconds =
      index / charactersPerSecond + accumulatedPauseInSeconds;
    accumulatedPauseInSeconds += getPauseAfterCharacterInSeconds(
      characters,
      index,
    );
    return revealTimeInSeconds;
  });
}

export function getTypingDurationInSeconds(
  text: string,
  charactersPerSecond: number,
) {
  const characters = Array.from(text.replace(/\s/g, ""));
  const revealTimesInSeconds = getRevealTimesInSeconds(
    characters,
    charactersPerSecond,
  );
  return revealTimesInSeconds.at(-1) ?? 0;
}
