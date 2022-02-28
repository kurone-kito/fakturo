import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { minimist } from '@p-mcgowan/minimist';
import { build } from 'esbuild';
import type { BuildOptions, Format } from 'esbuild';
import type { PackageJson } from 'type-fest';

// Usage: mpjebuild [--legacy] [--watch]
//
// Options:
//   --legacy  Generate for Nodejs v14, default is Nodejs v17
//   --watch   Watch for changes and rebuild

/** contains a string indicating the root directory for each subproject */
const cwd = process.cwd();

/** the list of options specified by the user */
const options = minimist(process.argv.slice(2));

/** a string indicating the path to `package.json` for each subproject */
const jsonPath = join(cwd, 'package.json');

/** a parsed object of the `package.json` for each subproject */
const packageJson = readFile(jsonPath, 'utf8')
  .then<PackageJson>(JSON.parse)
  .catch<PackageJson>(() => ({}));

const { dependencies = {}, peerDependencies = {} } = await packageJson;

/** the common options for ESBuild */
const baseOptions: BuildOptions = {
  bundle: true,
  entryPoints: [join(cwd, 'src', 'index.ts')],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
  keepNames: true,
  platform: 'neutral',
  sourcemap: 'external',
  target: 'legacy' in options ? 'node14' : 'node17',
  treeShaking: true,
  watch: 'watch' in options,
};

/**
 * Completes options such as output format that is not in the
 * common settings and generates the final ESBuild configuration.
 *
 * @param format Select the output format for the source code
 * @returns the final ESBuild configuration.
 */
const completeOptions = (format: Format): BuildOptions => ({
  ...baseOptions,
  format,
  outfile: join('dist', `index.${format === 'esm' ? 'mjs' : format}`),
});

await Promise.all(
  Object.freeze<Format>(['esm', 'cjs']).map((format) =>
    build(completeOptions(format)).catch((error) => {
      console.error(error);
      process.exitCode = 1;
    })
  )
);
