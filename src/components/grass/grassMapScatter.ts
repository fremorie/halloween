const MAX_SCATTER_ATTEMPTS_PER_BLADE = 1000;

export function readGrassMapPixels(grassMapImage: HTMLImageElement) {
  const grassMapCanvas = document.createElement("canvas");
  grassMapCanvas.width = grassMapImage.width;
  grassMapCanvas.height = grassMapImage.height;
  const grassMapContext = grassMapCanvas.getContext("2d");
  grassMapContext?.drawImage(grassMapImage, 0, 0);

  return grassMapContext?.getImageData(
    0,
    0,
    grassMapImage.width,
    grassMapImage.height,
  );
}

export function scatterBladesInsideGrassMap(
  grassMapPixels: ImageData | undefined,
  grassBladeCount: number,
  grassMapWorldSize: number,
) {
  const bladeWorldPositions = new Float32Array(grassBladeCount * 2);
  if (!grassMapPixels) {
    return bladeWorldPositions;
  }

  const maxScatterAttempts = grassBladeCount * MAX_SCATTER_ATTEMPTS_PER_BLADE;
  let placedBladeCount = 0;
  let scatterAttempts = 0;

  while (
    placedBladeCount < grassBladeCount &&
    scatterAttempts < maxScatterAttempts
  ) {
    scatterAttempts++;
    const u = Math.random();
    const v = Math.random();
    const pixelX = Math.floor(u * grassMapPixels.width);
    const pixelY = Math.floor((1 - v) * grassMapPixels.height);
    const pixelIndex = (pixelY * grassMapPixels.width + pixelX) * 4;
    const brightness = grassMapPixels.data[pixelIndex] / 255;

    if (Math.random() < brightness) {
      bladeWorldPositions[placedBladeCount * 2] = (u - 0.5) * grassMapWorldSize;
      bladeWorldPositions[placedBladeCount * 2 + 1] =
        -(v - 0.5) * grassMapWorldSize;
      placedBladeCount++;
    }
  }

  return bladeWorldPositions;
}
