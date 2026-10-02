// Turbopack loader: inlines `#include "relative/path.glsl"` lines in GLSL files
// (the same syntax vite-plugin-glsl supports) and exports the result as a string.
// Three.js's own `#include <chunk>` lines (angle brackets) are left untouched.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const INCLUDE = /^[ \t]*#include\s+"([^"]+)"[ \t]*$/gm;

function resolveIncludes(source, file, loader, included) {
  return source.replace(INCLUDE, (_, request) => {
    const target = path.resolve(path.dirname(file), request);
    // Each file is inlined once, so shared helpers can't be defined twice
    if (included.has(target)) return "";
    included.add(target);

    if (!fs.existsSync(target)) {
      throw new Error(
        `#include "${request}" in ${file}: no such file ${target}`,
      );
    }
    loader.addDependency(target);
    return resolveIncludes(
      fs.readFileSync(target, "utf8"),
      target,
      loader,
      included,
    );
  });
}

module.exports = function glslIncludeLoader(source) {
  const file = this.resourcePath;
  const code = resolveIncludes(source, file, this, new Set([file]));
  return `export default ${JSON.stringify(code)};`;
};
