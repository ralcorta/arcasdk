/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  /** Homologación: un worker evita carreras en WSAA (`coe.alreadyAuthenticated`). */
  ...(process.env.ENABLE_INTEGRATION_TESTS === "true" ? { maxWorkers: 1 } : {}),
  setupFilesAfterEnv: ["<rootDir>/../jest.setup.consumer.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.json",
      },
    ],
  },
};
