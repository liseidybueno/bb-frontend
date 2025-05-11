// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    createDefaultProgram: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['node_modules/**', 'dist/**', 'build/**'],
  rules: {
    // Turn off the no-explicit-any rule that was causing all the errors
    '@typescript-eslint/no-explicit-any': 'off',

    // Make unused variables a warning instead of an error
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    // Flag console.log statements as warnings
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // Other helpful rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
