module.exports = {
  'env': {
    'node': false,
    'mocha': false,
    'browser': true
  },
  'plugins': [
    'html'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module'
  },
  'extends': 'airbnb-base',
  'rules': {
    'no-console': 0,
    'keyword-spacing': ['error', {'overrides': {
      'if': {'after': false},
      'for': {'after': false},
      'while': {'after': false},
    }}],
    'linebreak-style': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
