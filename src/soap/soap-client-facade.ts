import { resolve } from "path";
import { Client, createClientAsync } from "soap";
import { SoapClientParams } from "../types";

export class SoapClientFacade {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private construct() {}

  /**
   * Geth the path for the WSDL file stored on the WSDL folder.
   *
   * @param wsdlFile
   * @param forceFolderPath
   * @returns Path of wsdl file
   */
  private static getWsdlPath(
    wsdlFile: string,
    forceFolderPath?: string
  ): string {
    return resolve(forceFolderPath ?? resolve(__dirname, "wsdl/"), wsdlFile);
  }

  public static async create<T extends Client>({
    wsdl,
    options,
  }: SoapClientParams): Promise<T> {
    return (await createClientAsync(
      SoapClientFacade.getWsdlPath(wsdl),
      options
    )) as T;
  }
}
