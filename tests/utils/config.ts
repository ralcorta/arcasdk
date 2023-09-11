import EnvTest from "./env-test";
import { resolve } from "path";
import { logger } from "../../src/utils/logger";
import { readFileSync, existsSync } from "fs";
import { config } from "dotenv";
config();

export class TestConfigUtils {
  static getTestCredentialsFolder() {
    return EnvTest.testCredentialsFolder;
  }
  static getKeyPath() {
    return resolve(
      `/${EnvTest.testCredentialsFolder}/${EnvTest.testPrivateKeyFileName}`
    );
  }
  static getCertPath() {
    return resolve(
      `/${EnvTest.testCredentialsFolder}/${EnvTest.testCertFileName}`
    );
  }
  static getKey() {
    return readFileSync(TestConfigUtils.getKeyPath(), { encoding: "utf8" });
  }
  static getCert() {
    return readFileSync(TestConfigUtils.getCertPath(), { encoding: "utf8" });
  }

  static checkRequirements() {
    try {
      try {
        EnvTest.checkEnv();
      } catch (error) {
        throw new Error(error.message);
      }

      if (!EnvTest.cuit)
        throw new Error(
          "Add CUIT to envirnoment varaibles (export CUIT=11111111111)"
        );

      if (!existsSync(TestConfigUtils.getTestCredentialsFolder()))
        throw new Error(
          "Missing test credentials folder. This can be fixed creating a folder with name 'credentials' under tests/mocks folder and adding missing files (key and cert)"
        );

      if (!existsSync(TestConfigUtils.getKeyPath()))
        throw new Error(
          `Missing test key file. This can be fixed creating the folder and importing afip key inside of tests/mocks/credentials folder under the name of '${EnvTest.testPrivateKeyFileName}'`
        );

      if (!existsSync(TestConfigUtils.getCertPath()))
        throw new Error(
          `Missing test cert file. This can be fixed creating the folder and importing afip cert inside of tests/mocks/credentials folder under the name of '${EnvTest.testCertFileName}'`
        );
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  }
}
