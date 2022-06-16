module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['prettier', 'react'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'no-new': 0,
    'no-param-reassign': [
      2,
      {
        props: false
      }
    ],
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-underscore-dangle': 0
  },
  globals: {
    story: true
  }
};
