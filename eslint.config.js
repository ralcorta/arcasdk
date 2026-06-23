const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: [
      "node_modules/",
      "dist/",
      "lib/",
      "build/",
      "coverage/",
      "packages/*/lib/",
      "packages/*/tests/",
      ".nx/",
      "**/*.config.js",
      "**/*.js",
      "**/*.cjs",
      "docs/",
    ],
  },
  {
    files: ["packages/*/src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "no-undef": "off",
      "preserve-caught-error": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["packages/core/src/domain/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@application/*", "@infrastructure/*"],
              message:
                "Domain layer must not depend on application or infrastructure.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["packages/core/src/application/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@infrastructure/*"],
              message:
                "Application layer must not import infrastructure. Use ports and DTOs instead.",
            },
          ],
        },
      ],
    },
  },
];
