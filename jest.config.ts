// import url, { URL } from 'node:url';

import type { Config } from 'jest';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (): Config => ({
  automock: false,
  clearMocks: true,
  // cacheDirectory: process.env.TEMP,
  // cacheDirectory: `${process.cwd()}/temp`,
  cacheDirectory: `./temp`,
  collectCoverageFrom: [
    'apps/*/{src,test}/*.{cjs,cts,js,jsx,mjs,mts,node,ts,tsx}',
    'packages/*/{src,test}/*.{cjs,cts,js,jsx,mjs,mts,node,ts,tsx}',
    '**/*.{cjs,cts,js,jsx,mjs,mts,node,ts,tsx}',
    '!**/{node_modules,scripts}/**',
  ],
  // coverageDirectory: `${process.cwd()}/coverage`,
  coverageDirectory: `./coverage`,
  coveragePathIgnorePatterns: [
    '<rootDir>/bin',
    '<rootDir>/config',
    '<rootDir>/node_modules',
    '<rootDir>/scripts',
    '<rootDir>/temp',
  ],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  detectLeaks: true,
  detectOpenHandles: true,
  extensionsToTreatAsEsm: ['.ts'],
  maxWorkers: '50%',
  moduleFileExtensions: [
    'cjs',
    'cts',
    'js',
    'jsx',
    'json',
    'mjs',
    'mts',
    'node',
    'ts',
    'tsx',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/apps/*/dist',
    '<rootDir>/packages/*/dist',
    '<rootDir>/src/*/dist',
  ],
  preset: 'ts-jest',
  resetMocks: true,
  restoreMocks: true,
  roots: ['<rootDir>/packages', '<rootDir>/src', '<rootDir>/tests'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: [],
  testEnvironment: 'node',
  testRegex: ['./(src|tests)/.*\\.(spec|test)?\\.(ts|tsx)$'],
  testTimeout: 30000,
  transform: {
    '^.+\\.(cts|mts|ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    '<rootDir>/bin',
    '<rootDir>/config',
    '<rootDir>/node_modules',
    '<rootDir>/scripts',
    '<rootDir>/temp',
  ],
  watchPathIgnorePatterns: ['<rootDir>/packages/**/temp', '<rootDir>/temp'],
  watchPlugins: [],
  verbose: true,
});
