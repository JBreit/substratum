export default {
  'src/**/*.{cjs,cts,mjs,mts,js,jsx,ts,tsx,vue}': [
    'npm run prettier:format',
    'npm run lint:fix',
  ],
  '*.md': ['npm run mdlint:fix'],
  '.editorconfig': ['npm run prettier:editorconfig'],
  LICENSE: ['npx prettier --write'],
  'package.json': [
    'cross-env ./node_modules/.bin/prettier --config ./prettier.config.js ./package.json --write',
    'npm run prettier:package',
  ],
};
