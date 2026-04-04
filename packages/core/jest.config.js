const base = require("./jest.base.config");

/** @type {import("jest").Config} */
module.exports = {
  ...base,
  testMatch: ["<rootDir>/tests/unit/**/*.test.ts"],
};
