const path = require('path');

const buildEslintCommand = filenames =>
  `pnpm exec eslint --fix ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],

  // run both type-check and strict lint once (without filenames)
  '*.{ts,tsx}': [() => 'pnpm exec tsc --noEmit', () => 'pnpm exec eslint --max-warnings 0'],

  '*.{css,scss,sass}': ['prettier --write'],
  '**/*.json': ['prettier --write'],
  '**/*.md': ['prettier --write'],
  '**/*.{yml,yaml}': ['prettier --write'],
  'package.json': ['prettier --write'],
};
