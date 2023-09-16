import { Environment } from "../../src/utils/env";

class EnvirnonmentTest extends Environment {
  cuit: string;
  testCredentialsFolder: string;
  testPrivateKeyFileName: string;
  testCertFileName: string;
  nodeEnv: string;

  constructor() {
    super();
    this.testCredentialsFolder = (super.testCredentialsFolder ??
      "folder_name") as string;
    this.testPrivateKeyFileName = (super.testPrivateKeyFileName ??
      "priv_key") as string;
    this.testCertFileName = (super.testCertFileName ?? "cert") as string;
    this.nodeEnv = (super.nodeEnv || "local") as string;
    this.cuit = (process.env.CUIT ?? "1123456789") as string;
  }

  checkEnv(): void {
    super.checkEnv();
    try {
      if (!this.cuit) throw new Error("CUIT");
    } catch (error) {
      throw new Error(
        `Env parameter not defined on .env file: ${error.message}`
      );
    }
  }
}

const EnvTest = new EnvirnonmentTest();

export default EnvTest;
