module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "jsx": "true",
        "sourceType": "module"
    },
    "ecmaFeatures": {
        "jsx": true,
        "modules": true
    },
    "plugins": [
        "react",
        "import"
    ],
    "extends": "eslint:recommended",
    "env": {
        "node": true,
        "mocha": true,
        "es6": true,
        "browser": true
    },
    "rules": {
        "prefer-const": 2,
        "no-console": 0,
        "strict": [2, "never"],
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "react/react-in-jsx-scope": 2
    },
    "parser": "babel-eslint",
    "globals": {
        "production": true,
        "development": true
    }
};
