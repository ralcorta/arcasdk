import { existsSync } from "fs";
import { testConfig, testConfigUtil } from "./config";

if (!process.env.CUIT)
  throw Error("Add CUIT to envirnoment varaibles (export CUIT=11111111111)");

if (!existsSync(testConfigUtil.getTestCredentialsFolder()))
  throw Error(
    "Missing test credentials folder. This can be fixed creating a folder with name 'credentials' under tests/mocks folder and adding missing files (key and cert)"
  );

if (!existsSync(testConfigUtil.getKeyPath()))
  throw Error(
    `Missing test key file. This can be fixed importing afip key inside of tests/mocks/credentials folder under the name of '${testConfig.privateKeyFileName}'`
  );

if (!existsSync(testConfigUtil.getCertPath()))
  throw Error(
    `Missing test cert file. This can be fixed importing afip cert inside of tests/mocks/credentials folder under the name of '${testConfig.certFileName}'`
  );
