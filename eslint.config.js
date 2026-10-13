import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

const playwrightRules = {
  'playwright/no-focused-test': 'error',
  'playwright/no-skipped-test': 'warn',
  'playwright/no-wait-for-timeout': 'warn',
  'playwright/no-page-pause': 'error',
  'playwright/no-element-handle': 'warn',
  'playwright/no-eval': 'warn',
};

export default [
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'coverage/**',
      'dist/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': 'off',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
    },
  },

  {
    files: ['tests/**/*.js'],
    plugins: {
      playwright,
    },
    rules: playwrightRules,
  },

  {
    files: ['playwright.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  prettier,
];
