import { resolve } from "path";
import { registerIntegrationTestLogs } from "./tests/integration/jest-integration-logs";

if (!process.env.TEST_TICKET_CACHE_FOLDER) {
  process.env.TEST_TICKET_CACHE_FOLDER = resolve(__dirname, ".ticket-cache");
}

registerIntegrationTestLogs("core integration");
