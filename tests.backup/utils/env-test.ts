import { Environment } from "../../src/utils/env";

class EnvirnonmentTest extends Environment {
  cuit: string;
  testCredentialsFolder: string;
  testPrivateKeyFileName: string;
  testCertFileName: string;
  nodeEnv: string;
  enableIntegrationTests: boolean;

  constructor() {
    super();
    // Support both absolute and relative paths for credentials folder
    this.testCredentialsFolder = (process.env.TEST_CREDENTIALS_FOLDER ??
      "test-credentials") as string;
    this.testPrivateKeyFileName = (process.env.TEST_PRIVATE_KEY_FILE_NAME ??
      "homologacion.key") as string;
    this.testCertFileName = (process.env.TEST_CERT_FILE_NAME ??
      "homologacion.crt") as string;
    this.nodeEnv = (process.env.NODE_ENV || "test") as string;
    this.cuit = (process.env.TEST_CUIT ??
      process.env.CUIT ??
      "20111111112") as string;
    // Allow enabling integration tests via environment variable
    this.enableIntegrationTests =
      process.env.ENABLE_INTEGRATION_TESTS === "true";
  }

  checkEnv(): void {
    // Don't throw errors in test environment - use defaults instead
    // This allows tests to run with or without real certificates
    if (!this.cuit) {
      console.warn("⚠️  CUIT not set, using default test CUIT: 20111111112");
    }
  }
}

const EnvTest = new EnvirnonmentTest();

export default EnvTest;
