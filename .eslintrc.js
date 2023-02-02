module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    google: 'readonly',
  },
  extends: ['eslint:recommended', 'plugin:cypress/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'prettier/prettier': ['warn', { singleQuote: true, parser: 'flow' }],
  },
  plugins: ['prettier'],
};
