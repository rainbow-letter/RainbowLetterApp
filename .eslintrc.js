module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 0,
    'react/no-unstable-nested-components': [
      'off',
      {
        allowAsProps: true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },

  env: {
    es6: true,
  },
};
