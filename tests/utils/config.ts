import { Env } from "./../../src/utils/env";
import { resolve } from "path";
import { readFileSync } from "fs";

export const testConfig = {
  testCredentialsFolder: Env.testCredentialsFolder,
  privateKeyFileName: Env.testPrivateKeyFileName,
  certFileName: Env.testCertFileName,
};

export const testConfigUtil = {
  getTestCredentialsFolder: () => {
    return testConfig.testCredentialsFolder;
  },
  getKeyPath: () =>
    resolve(
      `/${testConfig.testCredentialsFolder}/${testConfig.privateKeyFileName}`
    ),
  getCertPath: () =>
    resolve(`/${testConfig.testCredentialsFolder}/${testConfig.certFileName}`),
  getKey: () => readFileSync(testConfigUtil.getKeyPath(), { encoding: "utf8" }),
  getCert: () =>
    readFileSync(testConfigUtil.getCertPath(), { encoding: "utf8" }),
};
