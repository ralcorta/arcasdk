import { Environment } from "../../src/utils/env";

class EnvirnonmentTest extends Environment {
  cuit: string;

  constructor() {
    super();
    this.cuit = process.env.CUIT as string;
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
