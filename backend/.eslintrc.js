module.exports = {
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
    "impliedStrict": false
  },
  extends: 'airbnb-base',
  rules: {
    'no-console': 0,
    'keyword-spacing': ['error', {'overrides': {
      'if': {'after': false},
      'for': {'after': false},
      'while': {'after': false}
    }}],
    'linebreak-style': 'off',
    'no-param-reassign': ['error', { 'props': false }],
  }
};
