const { config } = require("dotenv");
const { resolve } = require("path");

const envPath = resolve(__dirname, "../../.env");
config({ path: envPath });

jest.setTimeout(30000);
