const base = require("./jest.base.config");

/** @type {import("jest").Config} */
module.exports = {
  ...base,
  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
    "<rootDir>/jest.setup.integration.ts",
  ],
  testMatch: ["<rootDir>/tests/integration/**/*.test.ts"],
  /** No mezclar con el mini-proyecto npm que instala el tarball (`consumer-app/`). */
  testPathIgnorePatterns: ["<rootDir>/tests/integration/consumer-app"],
  /**
   * Run integration files one at a time:
   * - Shared ticket files / same CUIT against WSFE homologation → fewer races on voucher numbers and auth.
   * - If a SOAP/HTTP error includes circular refs (req/res), Jest workers can fail while serializing
   *   the result to the parent ("Converting circular structure to JSON").
   */
  maxWorkers: 1,
};
