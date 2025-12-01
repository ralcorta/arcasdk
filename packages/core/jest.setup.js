const { config } = require("dotenv");
const { resolve } = require("path");

// Load .env from project root (two levels up from packages/core)
const envPath = resolve(__dirname, "../../.env");
config({ path: envPath });

jest.setTimeout(30000);
