module.exports = {
    "root": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true //启动JSX
        }
    },
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect",
            "flowVersion": "0.53"
        },
        "propWrapperFunctions": [
            "forbidExtraProps",
            {
                "property": "freeze",
                "object": "Object"
            },
            {
                "property": "myFavoriteWrapper"
            }
        ],
        "linkComponents": [
            "Hyperlink",
            {
                "name": "Link",
                "linkAttribute": "to"
            }
        ]
    },
    "rules": {
        "no-set-state": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": 0,
        "indent": [1, 4, {
            "SwitchCase": 1,
        }]
    },
};