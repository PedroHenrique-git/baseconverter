module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-underscore-dangle': 0,
    'no-restricted-syntax': 0,
    'class-methods-use-this': 0,
    'no-console': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
};
