module.exports = {
  rules: {
    'prettier/prettier': 'off', // override tsdx lint which includes prettier
    'react/react-in-jsx-scope': 'off' // tsdx uses outdated TS version that thinks React import is required erroneously
  }
}