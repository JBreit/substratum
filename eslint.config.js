import process from 'node:process';
import url, { URL } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: eslint.configs.recommended,
});

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  ...compat.extends(
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended'
  ),

  eslintConfigPrettier,

  ...compat.plugins('import', 'jsx-a11y', 'react'),
  ...compat.env({ es2024: true, node: true }),

  {
    ignores: [
      '{bin,certs,coverage,dist,docs,e2e,examples,logs,node_modules,scripts,temp}/*',
      '**/dist/*',
      '.{bin,certs,config,docker,github,husky,ssh,vscode,vscode-test}/*',
      '{CHANGELOG,TODO}.md',
      '**/*.config.{cjs,js,mjs,ts}',
      '**/*.d.{cts,mts,ts}',
      '**/*.spec.{js,ts}',
      '**/.*',
      '.*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.es2017,
        ...globals.node,
        it: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        test: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    files: ['**/*.{cts,mts,ts,tsx}', '**/*.spec.{cts,mts,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          impliedStrict: true,
          jsx: true,
          modules: true,
        },
        ecmaVersion: 2024,
        emitDecoratorMetadata: true,
        project: [
          import.meta.resolve(`${__dirname}/packages/*/tsconfig.json`),
          import.meta.resolve(`${__dirname}/tsconfig.eslint.json`),
          import.meta.resolve(`${__dirname}/tsconfig.json`),
        ],
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'constructor-super': OFF,

      'comma-spacing': [
        ERROR,
        {
          before: false,
          after: true,
        },
      ],

      eqeqeq: [ERROR, 'always'],

      'getter-return': OFF,

      'implicit-arrow-linebreak': OFF,

      'import/default': OFF,

      'import/extensions': [
        ERROR,
        {
          ignorePackages: true,
          pattern: {
            cjs: 'never',
            js: 'always',
            json: 'always',
            jsx: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
          },
        },
      ],

      'import/no-extraneous-dependencies': [
        ERROR,
        {
          // devDependencies: ['**/*.test.ts', '**/*.spec.ts'],
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: true,
          // bundleDependencies: true,
          packageDir: [
            // import.meta.resolve(`${__dirname}/packages/cli`),
          ],
        },
      ],

      'import/named': OFF,
      'import/namespace': OFF,

      'import/no-named-as-default': OFF,
      'import/no-named-as-default-member': OFF,

      'import/no-unresolved': ERROR,

      'import/order': [
        ERROR,
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'unknown',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          'newlines-between': 'always-and-inside-groups',

          alphabetize: {
            order: 'asc', // asc | desc | ignore
            orderImportKind: 'asc', // asc | desc | ignore
            caseInsensitive: true,
          },
        },
      ],

      'import/prefer-default-export': OFF,

      indent: [
        ERROR,
        2,
        {
          SwitchCase: WARNING,
        },
      ],

      'linebreak-style': [
        ERROR,
        process.platform !== 'win32' ? 'linux' : 'windows',
      ],

      'jsx-quotes': [ERROR, 'prefer-single'],

      'no-alert': process.env.NODE_ENV === 'production' ? ERROR : OFF,
      'no-console': process.env.NODE_ENV === 'production' ? ERROR : OFF,
      'no-const-assign': OFF,
      'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
      'no-dupe-args': OFF,
      'no-dupe-class-members': OFF,
      'no-dupe-keys': OFF,
      'no-dynamic-require': OFF,
      'no-func-assign': OFF,
      'no-implied-eval': OFF,
      'no-import-assign': OFF,
      'no-new-symbol': OFF,
      'no-obj-calls': OFF,
      'no-redeclare': OFF,
      'no-restricted-globals': OFF,
      'no-setter-return': OFF,
      'no-this-before-super': OFF,
      'no-undef': OFF,

      'no-underscore-dangle': [
        ERROR,
        {
          allow: [
            '_client',
            '_csrf',
            '_domainEvents',
            '_events',
            '_id',
            '_value',
            '__dirname',
            '__express',
            '__nonce__',
            '__WB_MANIFEST',
            '__v',
          ],
        },
      ],

      'no-unreachable': OFF,
      'no-unsafe-negation': OFF,

      'no-unused-expressions': [
        ERROR,
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      'no-unused-private-class-members': ERROR,
      semi: [ERROR, 'always'],

      'space-before-function-paren': [
        ERROR,
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      'space-in-parens': [ERROR, 'never'],

      'valid-typeof': OFF,

      /**
       * TypeScript-ESLint
       */
      '@typescript-eslint/ban-types': OFF,
      '@typescript-eslint/ban-ts-ignore': OFF,
      '@typescript-eslint/ban-ts-comment': [
        ERROR,
        {
          'ts-ignore': false,
        },
      ],

      'comma-dangle': OFF,
      '@typescript-eslint/comma-dangle': OFF,

      // '@typescript-eslint/consistent-type-definitions': ['type'],
      '@typescript-eslint/consistent-type-exports': [
        ERROR,
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
        },
      ],

      indent: OFF,
      '@typescript-eslint/indent': OFF,

      '@typescript-eslint/naming-convention': [
        ERROR,
        {
          format: ['strictCamelCase'],
          leadingUnderscore: 'allowDouble',
          selector: []
        },
      ],

      'no-unused-vars': OFF,
      '@typescript-eslint/no-unused-vars': [
        ERROR,
        {
          args: 'after-used',
          argsIgnorePattern: '(^reject$|^_|^_$)',
          vars: 'all',
          varsIgnorePattern: '(^_$|^_|^h$)',
        },
      ],

      'no-use-before-define': OFF,
      '@typescript-eslint/no-use-before-define': [
        ERROR,
        {
          classes: false,
          functions: false,
        },
      ],


      '@typescript-eslint/prefer-nullish-coalescing': ERROR,
      '@typescript-eslint/return-await': [ERROR, 'in-try-catch'],

      '@typescript-eslint/restrict-template-expressions': [
        ERROR,
        {
          allowNever: true,
        },
      ],
    },
  },
  {
    settings: {
      'import/extensions': [
        '.cjs',
        '.cts',
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.mts',
        '.node',
        '.ts',
        '.tsx',
        '*.d.cts',
        '*.d.mts',
        '*.d.ts',
      ],
      'import/parser': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: [
            '.cjs',
            '.cts',
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.mts',
            '.node',
            '.ts',
            '.tsx',
            '*.d.cts',
            '*.d.mts',
            '*.d.ts',
          ],
          moduleDirectory: [
            import.meta.resolve(`${__dirname}/apps/*`),
            import.meta.resolve(`${__dirname}/packages/*`),
            import.meta.resolve(`${__dirname}/node_modules`),
          ],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
];
