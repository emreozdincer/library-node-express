module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "linebreak-style": "off",
        "prefer-destructuring": ["error", {
            "array": false,
        }],
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true
        }],
        "no-unused-vars": ["error", {
            "varsIgnorePattern": "debug"
        }],
        "import/no-dynamic-require": "off",
        "object-curly-newline": "off",
        "object-property-newline": "off",
        "padded-blocks": "off",
    },
};