import { Env } from "./../../src/utils/env";
import { resolve } from "path";
import { readFileSync } from "fs";

export const testConfigUtil = {
  getTestCredentialsFolder: () => {
    return Env.testCredentialsFolder;
  },
  getKeyPath: () =>
    resolve(`/${Env.testCredentialsFolder}/${Env.testPrivateKeyFileName}`),
  getCertPath: () =>
    resolve(`/${Env.testCredentialsFolder}/${Env.testCertFileName}`),
  getKey: () => readFileSync(testConfigUtil.getKeyPath(), { encoding: "utf8" }),
  getCert: () =>
    readFileSync(testConfigUtil.getCertPath(), { encoding: "utf8" }),
};
