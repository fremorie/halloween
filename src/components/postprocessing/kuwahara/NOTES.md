# Kuwahara filter performance

## Starting point

| State                     | GPU ms, full screen |
| ------------------------- | ------------------- |
| baseline, everything on   | 14 ms               |
| Kuwahara off              | 3 ms                |
| shadows off               | 12.6 ms             |
| Kuwahara off, shadows off | 2.6 ms              |
| Kuwahara off, shadows on  | 3.3 ms              |
| paint scale 1.0           | 9.6 ms              |
