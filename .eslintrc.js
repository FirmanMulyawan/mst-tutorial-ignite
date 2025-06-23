// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    // `expo` must come after `standard` or its globals configuration will be overridden
    "expo",
    // `jsx-runtime` must come after `expo` or it will be overridden
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "prettier",
  ],
  plugins: ["reactotron", "prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    // typescript-eslint
    "@typescript-eslint/array-type": 0,
    "react-native/no-raw-text": 0,
    // Import From DaihatsuKu
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-require-imports": 0,
    "@typescript-eslint/no-empty-object-type": 0,
    "no-useless-catch": 0,
    "no-throw-literal": 0,
    "@typescript-eslint/no-non-null-asserted-optional-chain": 1,
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "react-hooks/exhaustive-deps": 0,
    "comma-dangle": 0,
    "multiline-ternary": 0,
    "no-undef": 0,
    "no-unused-vars": 0,
    "no-use-before-define": 0,
    "no-global-assign": 0,
    "quotes": 0,
    // "react-native/no-raw-text": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "space-before-function-paren": 0,
    "reactotron/no-tron-in-production": "error",
    "sonarjs/cognitive-complexity": "off",
    "sonarjs/prefer-single-boolean-return": "off",
    "sonarjs/no-nested-switch": "off",
    "sonarjs/no-small-switch": "off",
    "sonarjs/no-collapsible-if": "off",
    "react-native/split-platform-components": [0],
    "no-console": [
      "error",
      {
        allow: ["tron", "tron.*"],
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(tron|log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["../../*", "../../../*", "../../../../*", "../../../../../*"],
            message: "Please use absolute path using app/ as a root import",
          },
        ],
      },
    ],
  },
}
