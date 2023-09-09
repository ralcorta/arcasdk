import { consola } from "consola";

export class Env {
  public static readonly testCredentialsFolder: string | undefined =
    process.env.TEST_CREDENTIALS_FOLDER;
  public static readonly testPrivateKeyFileName: string | undefined =
    process.env.TEST_PRIVATE_KEY_FILE_NAME;
  public static readonly testCertFileName: string | undefined =
    process.env.TEST_CERT_FILE_NAME;

  static checkEnv(): void {
    const envMissed: string[] = [];
    if (!process.env.TEST_CREDENTIALS_FOLDER)
      envMissed.push("TEST_CREDENTIALS_FOLDER");
    if (!process.env.TEST_PRIVATE_KEY_FILE_NAME)
      envMissed.push("TEST_PRIVATE_KEY_FILE_NAME");
    if (!process.env.TEST_CERT_FILE_NAME) envMissed.push("TEST_CERT_FILE_NAME");

    if (envMissed.length) {
      consola.fatal(
        new Error(`Env parameter not defined on .env file: 
            > ${envMissed.join("\n\t> ")}`)
      );
    }
  }
}
