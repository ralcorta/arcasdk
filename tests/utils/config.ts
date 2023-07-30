import { resolve } from "path";
import { readFileSync } from "fs";

export const testConfig = {
  testCredentialsFolder: `${__dirname}/../mocks/credentials`,
  privateKeyFileName: "afip_test_private_key.key",
  certFileName: "cert_test.crt",
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
