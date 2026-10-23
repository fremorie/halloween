const PAUSE_AFTER_PUNCTUATION_IN_SECONDS: Record<string, number> = {
  ".": 0.4,
  "!": 0.4,
  "?": 0.4,
  ",": 0.15,
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

export function getCharactersPerSecondToFitDuration(
  text: string,
  durationInSeconds: number,
) {
  const characters = Array.from(text.replace(/\s/g, ""));
  const totalPauseInSeconds = characters.reduce(
    (pauseSum, _, index) =>
      pauseSum + getPauseAfterCharacterInSeconds(characters, index),
    0,
  );
  return (characters.length - 1) / (durationInSeconds - totalPauseInSeconds);
}
