module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript-prettier',
  ],
  plugins: ['@typescript-eslint'],
  globals: {
    $: true,
    document: true,
    window: true,
    fetch: true,
  },
  ignorePatterns: ['/dist/js/**.js', 'webpack.config.js'],
  rules: {
    'prettier/prettier': ['error'],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
