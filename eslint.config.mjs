import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { globalIgnores } from 'eslint/config';
import nextPlugin from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier/flat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Shared plugins configuration
const sharedPlugins = {
  '@next/next': nextPlugin,
  '@typescript-eslint': typescriptEslint,
  react,
  'react-hooks': reactHooks,
  'jsx-a11y': jsxA11y,
  import: importPlugin,
  'simple-import-sort': simpleImportSort,
  perfectionist,
  unicorn,
};

// Shared language options
const sharedLanguageOptions = {
  parser: typescriptParser,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  globals: {
    React: 'readonly',
    JSX: 'readonly',
    NodeJS: 'readonly',
  },
};

// Shared settings
const sharedSettings = {
  react: {
    version: 'detect',
  },
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
    },
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
  next: {
    rootDir: './',
  },
};

const eslintConfig = [
  // Global ignores (replaces old ignorePatterns)
  globalIgnores([
    // Default ignores of eslint-config-next
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Custom ignores
    'components/ui/**',
    'node_modules/**',
    'dist/**',
    'coverage/**',
    '.env*',
    'public/**',
    '.vercel/**',
    '.turbo/**',
    '.lintstagedrc.js',
    'commitlint.config.js',
    '.cursor/**',
    '.agents/**',
    'workers/**',
  ]),

  // Prettier config (must be last for formatting rules)
  prettier,

  // Main configuration for all JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: sharedPlugins,
    languageOptions: sharedLanguageOptions,
    settings: sharedSettings,
    rules: {
      // ===== NEXT.JS RULES =====
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // ===== TYPESCRIPT RULES =====
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': false,
          'ts-nocheck': false,
          'ts-check': false,
        },
      ],
      // Advanced TypeScript rules for professional code (balanced approach)
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array-simple',
        },
      ],
      '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
      '@typescript-eslint/consistent-generic-constructors': [
        'warn',
        'constructor',
      ],
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-empty-function': [
        'warn',
        {
          allow: ['arrowFunctions', 'constructors'],
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      // Relaxed unsafe rules for better DX
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-for-of': 'warn',
      '@typescript-eslint/prefer-includes': 'warn',
      '@typescript-eslint/prefer-literal-enum-member': 'warn',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'warn',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: true,
        },
      ],
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: true,
          allowNumber: true,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableNumber: true,
          allowAny: false,
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/unbound-method': [
        'error',
        {
          ignoreStatic: true,
        },
      ],
      // Simplified naming conventions for better DX
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: ['interface', 'typeAlias'],
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
        },
      ],

      // ===== REACT RULES =====
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'off',
      'react/no-danger': 'warn',
      'react/jsx-key': [
        'error',
        { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true },
      ],
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-script-url': 'error',
      'react/jsx-no-target-blank': [
        'error',
        { allowReferrer: false, enforceDynamicLinks: 'always' },
      ],
      'react/jsx-sort-props': 'off',
      'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
      'react/no-unused-prop-types': 'error',
      'react/prefer-stateless-function': 'error',
      'react/void-dom-elements-no-children': 'error',
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],

      // ===== REACT HOOKS RULES =====
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ===== JSX ACCESSIBILITY RULES =====
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-redundant-roles': 'error',

      // ===== IMPORT/EXPORT RULES =====
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next'],
            ['^@?\\w'],
            ['^~/'],
            ['^\\.'],
            ['^.*\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',

      // ===== GENERAL CODE QUALITY RULES =====
      'no-unused-vars': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2, 3, 4, 5, 10, 100, 200, 400, 500, 1000],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true,
          enforceConst: false,
        },
      ],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-duplicate-imports': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-template': 'error',
      'no-useless-concat': 'error',
      'no-useless-return': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': [
        'error',
        { array: true, object: true },
        { enforceForRenamedProperties: false },
      ],
      'func-style': 'off',
      'func-names': ['warn', 'as-needed'],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc',
            'accumulator',
            'e',
            'ctx',
            'context',
            'req',
            'request',
            'res',
            'response',
            '$scope',
            'staticContext',
          ],
        },
      ],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-continue': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-negated-condition': 'warn',
      'no-ternary': 'off',
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id', '__typename', '__dirname', '__filename'],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
        },
      ],
      'one-var': ['error', 'never'],
      'operator-assignment': ['error', 'always'],
      'prefer-exponentiation-operator': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          line: { exceptions: ['-', '+'], markers: ['=', '!', '/'] },
          block: {
            exceptions: ['-', '+'],
            markers: ['=', '!', ':', '::'],
            balanced: true,
          },
        },
      ],
      yoda: 'error',
      'array-callback-return': [
        'error',
        { allowImplicit: true, checkForEach: false },
      ],
      'no-array-constructor': 'error',
      'no-object-constructor': 'error',
      'no-new-wrappers': 'error',
      'prefer-numeric-literals': 'error',
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
      'no-caller': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-implied-eval': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-loop-func': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-octal-escape': 'error',
      'no-proto': 'error',
      'no-return-assign': ['error', 'always'],
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: false,
          allowTernary: false,
          allowTaggedTemplates: false,
        },
      ],
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'no-with': 'error',
      radix: 'error',
      'vars-on-top': 'error',
      'wrap-iife': ['error', 'outside', { functionPrototypeMethods: false }],

      // ===== PERFECTIONIST RULES =====
      'perfectionist/sort-object-types': [
        'error',
        { type: 'alphabetical', order: 'asc' },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        { type: 'alphabetical', order: 'asc' },
      ],

      // ===== UNICORN RULES =====
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/consistent-destructuring': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-hex-escape': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/number-literal-case': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-ternary': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: { utils: true, cn: true },
          replacements: {
            props: false,
            ref: false,
            params: false,
            args: false,
            env: false,
            dev: false,
            prod: false,
          },
        },
      ],

      // ===== ADDITIONAL RULES =====
      'no-delete-var': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      complexity: ['warn', { max: 15 }],
      'max-depth': ['warn', { max: 5 }],
      'max-lines': [
        'warn',
        { max: 400, skipBlankLines: true, skipComments: true },
      ],
      'max-lines-per-function': [
        'warn',
        { max: 120, skipBlankLines: true, skipComments: true },
      ],
      'max-params': ['warn', { max: 6 }],
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },
  },

  // Config files override
  {
    files: ['**/*.config.{js,ts,mjs}', '**/*rc.js', 'commitlint.config.js'],
    plugins: sharedPlugins,
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-magic-numbers': 'off',
      'import/no-default-export': 'off',
      'unicorn/prefer-module': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: { kebabCase: true },
          ignore: [
            /^next\.config\.(js|ts|mjs)$/,
            /^tailwind\.config\.(js|ts)$/,
            /^postcss\.config\.(js|mjs)$/,
            /^eslint\.config\.(js|mjs)$/,
            /^prettier\.config\.(js|mjs)$/,
            /^commitlint\.config\.js$/,
            /^\.lintstagedrc\.js$/,
            /^tsconfig.*\.json$/,
            /^package\.json$/,
            /^README\.md$/,
            /^CHANGELOG\.md$/,
            /^LICENSE$/,
          ],
        },
      ],
    },
  },

  // Next.js app/pages files
  {
    files: ['**/app/**/*.{js,jsx,ts,tsx}', '**/pages/**/*.{js,jsx,ts,tsx}'],
    plugins: sharedPlugins,
    rules: {
      'import/no-default-export': 'off',
      'import/no-anonymous-default-export': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: { kebabCase: true },
          ignore: [
            /^layout\.(js|jsx|ts|tsx)$/,
            /^page\.(js|jsx|ts|tsx)$/,
            /^loading\.(js|jsx|ts|tsx)$/,
            /^error\.(js|jsx|ts|tsx)$/,
            /^not-found\.(js|jsx|ts|tsx)$/,
            /^global-error\.(js|jsx|ts|tsx)$/,
            /^template\.(js|jsx|ts|tsx)$/,
            /^default\.(js|jsx|ts|tsx)$/,
            /^_app\.(js|jsx|ts|tsx)$/,
            /^_document\.(js|jsx|ts|tsx)$/,
            /^_error\.(js|jsx|ts|tsx)$/,
            /^404\.(js|jsx|ts|tsx)$/,
            /^500\.(js|jsx|ts|tsx)$/,
          ],
        },
      ],
    },
  },

  // Components files
  {
    files: ['**/components/**/*.{js,jsx,ts,tsx}'],
    plugins: sharedPlugins,
    rules: {
      'react/jsx-pascal-case': 'error',
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowString: true,
          allowNumber: true,
          allowNullableObject: true,
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableNumber: true,
          allowAny: false,
        },
      ],
      'no-magic-numbers': 'off',
      'max-lines-per-function': [
        'warn',
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
      complexity: ['warn', { max: 20 }],
    },
  },

  // Convex functions (filenames map to API paths, camelCase required)
  {
    files: ['convex/**/*.ts'],
    plugins: sharedPlugins,
    rules: {
      'unicorn/filename-case': 'off',
      'import/no-default-export': 'off',
    },
  },

  // Type declaration files
  {
    files: ['**/*.d.ts'],
    plugins: sharedPlugins,
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unicorn/filename-case': 'off',
    },
  },

  // Middleware files
  {
    files: ['**/middleware.{js,ts}'],
    plugins: sharedPlugins,
    rules: {
      'import/no-default-export': 'off',
    },
  },

  // tRPC files
  {
    files: ['**/app/api/trpc/**/*.{js,ts}'],
    plugins: sharedPlugins,
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },
];

export default eslintConfig;
