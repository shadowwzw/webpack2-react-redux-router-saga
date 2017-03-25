module.exports = {
  "parserOptions": {
    "ecmaVersion": 6,
    "jsx": true,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "extends": "eslint:recommended",
  "env": {
    "node": true,
    "mocha": true,
    "es6": true,
    "browser": true,
  },
  "rules": {
    "prefer-const": 2,
    "no-console": 0
  },
  "parser": "babel-eslint",
  "globals": {
    "production": true,
    "development": true
  },
}