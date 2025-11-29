// import type { Config } from "jest";

// const config: Config = {
//   verbose: true,
//   preset: "ts-jest",
//   testEnvironment: "node",
//   setupFilesAfterEnv: ["./jest.setup.ts"],
//   moduleDirectories: ["node_modules"],
// };

// export default config;

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
  },
};
