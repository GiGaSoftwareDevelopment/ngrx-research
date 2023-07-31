const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { merge } = require('@ngpat/fn');

// Add Global Config
const sharedTailwindConfig = require('../../../libs/tailwind-preset/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = merge(sharedTailwindConfig, {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
