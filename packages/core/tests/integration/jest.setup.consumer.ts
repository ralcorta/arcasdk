/**
 * Setup de Jest solo para el mini-proyecto `consumer-app` (npm install desde tarball).
 * Referenciado por consumer-app/jest.config.cjs; no usar en la suite Nx de packages/core.
 */
import path from "path";
import { config } from "dotenv";
import { registerIntegrationTestLogs } from "./jest-integration-logs";

const repoRoot = path.resolve(__dirname, "../../../..");
config({ path: path.join(repoRoot, ".env") });

if (!process.env.TEST_CREDENTIALS_FOLDER) {
  process.env.TEST_CREDENTIALS_FOLDER = path.join(repoRoot, "test-credentials");
} else if (!path.isAbsolute(process.env.TEST_CREDENTIALS_FOLDER)) {
  process.env.TEST_CREDENTIALS_FOLDER = path.join(
    repoRoot,
    process.env.TEST_CREDENTIALS_FOLDER,
  );
}

if (!process.env.TEST_WSFE_PTO_VTA) {
  process.env.TEST_WSFE_PTO_VTA = "2";
}

if (!process.env.TEST_FE_RECEIVER_CUIT) {
  process.env.TEST_FE_RECEIVER_CUIT = "30716756411";
}
if (!process.env.TEST_FE_RECEIVER_CUIT_B) {
  process.env.TEST_FE_RECEIVER_CUIT_B = "20111111112";
}
if (!process.env.TEST_FE_COND_IVA_RECEPTOR_A) {
  process.env.TEST_FE_COND_IVA_RECEPTOR_A = "1";
}
if (!process.env.TEST_FE_COND_IVA_RECEPTOR_B) {
  process.env.TEST_FE_COND_IVA_RECEPTOR_B = "5";
}
if (!process.env.TEST_FE_COND_IVA_RECEPTOR_C) {
  process.env.TEST_FE_COND_IVA_RECEPTOR_C = "1";
}

if (!process.env.TEST_TICKET_CACHE_FOLDER) {
  process.env.TEST_TICKET_CACHE_FOLDER = path.join(
    repoRoot,
    "packages",
    "core",
    ".ticket-cache",
  );
}

jest.setTimeout(60_000);

if (process.env.ENABLE_INTEGRATION_TESTS === "true") {
  registerIntegrationTestLogs("consumer integration");
}
