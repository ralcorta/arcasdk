import { resolve } from "path";
import { readFileSync, existsSync } from "fs";
import { config } from "dotenv";
import { promises as fs } from "fs";
import EnvTest from "../utils/env-test";
import { Context } from "../../src/application/types";
import { ILoginCredentials } from "../../src/domain/entities/access-ticket.entity";
config();

export class ContextTest {
  static getTestCredentialsFolder() {
    return EnvTest.testCredentialsFolder;
  }

  static getKeyPath(): string {
    // Support both absolute and relative paths
    const folder = EnvTest.testCredentialsFolder;
    if (folder.startsWith("/")) {
      return resolve(`${folder}/${EnvTest.testPrivateKeyFileName}`);
    }
    return resolve(process.cwd(), folder, EnvTest.testPrivateKeyFileName);
  }

  static getCertPath(): string {
    // Support both absolute and relative paths
    const folder = EnvTest.testCredentialsFolder;
    if (folder.startsWith("/")) {
      return resolve(`${folder}/${EnvTest.testCertFileName}`);
    }
    return resolve(process.cwd(), folder, EnvTest.testCertFileName);
  }

  static async getKey(): Promise<string> {
    const filePath = ContextTest.getKeyPath();

    try {
      if (!existsSync(filePath)) {
        console.warn(
          `⚠️  Test key file not found at: ${filePath}\n` +
            `   Using mock key. Set TEST_CREDENTIALS_FOLDER and TEST_PRIVATE_KEY_FILE_NAME to use real certificates.`
        );
        return "test_key";
      }

      await fs.access(filePath, fs.constants.R_OK);
      return readFileSync(filePath, { encoding: "utf8" });
    } catch (error) {
      console.warn(
        `⚠️  Error reading test key file: ${filePath}\n` +
          `   Error: ${
            error instanceof Error ? error.message : String(error)
          }\n` +
          `   Using mock key.`
      );
      return "test_key";
    }
  }

  static async getCert(): Promise<string> {
    const filePath = ContextTest.getCertPath();

    try {
      if (!existsSync(filePath)) {
        console.warn(
          `⚠️  Test cert file not found at: ${filePath}\n` +
            `   Using mock cert. Set TEST_CREDENTIALS_FOLDER and TEST_CERT_FILE_NAME to use real certificates.`
        );
        return "test_cert";
      }

      await fs.access(filePath, fs.constants.R_OK);
      return readFileSync(filePath, { encoding: "utf8" });
    } catch (error) {
      console.warn(
        `⚠️  Error reading test cert file: ${filePath}\n` +
          `   Error: ${
            error instanceof Error ? error.message : String(error)
          }\n` +
          `   Using mock cert.`
      );
      return "test_cert";
    }
  }

  /**
   * Creates a test context for integration tests using homologation certificates
   * This context is configured to use test/homologation servers (production: false)
   *
   * @param options Optional configuration overrides
   * @returns Context configured for integration testing against homologation servers
   */
  static async getIntegrationTestContext(options?: {
    cuit?: number;
    handleTicket?: boolean;
    production?: boolean;
    enableLogging?: boolean;
    ticketPath?: string;
    credentials?: ILoginCredentials;
  }): Promise<Context> {
    const key = await ContextTest.getKey();
    const cert = await ContextTest.getCert();

    // Check if we're using real certificates (not mocks)
    const usingRealCerts = key !== "test_key" && cert !== "test_cert";

    if (!usingRealCerts) {
      console.warn(
        "\n⚠️  WARNING: Using mock certificates for integration tests.\n" +
          "   Integration tests require real homologation certificates.\n" +
          "   Configure the following environment variables:\n" +
          "   - TEST_CREDENTIALS_FOLDER: Path to folder containing certificates\n" +
          "   - TEST_PRIVATE_KEY_FILE_NAME: Name of private key file\n" +
          "   - TEST_CERT_FILE_NAME: Name of certificate file\n" +
          "   - CUIT: Test CUIT number\n\n"
      );
    }

    return {
      key,
      cert,
      cuit: options?.cuit ?? parseInt(EnvTest.cuit),
      production: options?.production ?? false,
      handleTicket: options?.handleTicket ?? false,
      enableLogging: options?.enableLogging ?? false,
      ticketPath: options?.ticketPath,
      credentials: options?.credentials,
    };
  }

  /**
   * Checks if real certificates are available for integration testing
   */
  static async hasRealCertificates(): Promise<boolean> {
    const key = await ContextTest.getKey();
    const cert = await ContextTest.getCert();
    return key !== "test_key" && cert !== "test_cert";
  }
}
