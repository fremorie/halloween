// Reward sequence after solving a puzzle:
// - the balls spin and shrink while the patchwork is knitted
// - zoom in to cat
// - drop the piece of costume on the cat
// - the cat comments on the costume
export type RewardBeat = "knit" | "zoomIn" | "hatDrop" | "speech";
export type TimedRewardBeat = Exclude<RewardBeat, "speech">;
