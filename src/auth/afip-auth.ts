import { Parser } from "./../utils/parser";
import { promises as fs } from "fs";
import { resolve } from "path";
import { SoapClientFacade } from "../soap/soap-client-facade";
import {
  ILoginCmsReturn,
  ILoginCmsSoap,
  LoginTicketResponse,
} from "../soap/interfaces/LoginCMSService/LoginCms";
import { AccessTicket } from "./access-ticket";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { Cryptography } from "../utils/crypt-data";
import { AfipContext } from "../types";
import { EndpointsEnum } from "../enums";

export class AfipAuth {
  constructor(private readonly context: AfipContext) {}

  private async getAuthClient() {
    return SoapClientFacade.create<ILoginCmsSoap>({
      wsdl: WsdlPathEnum.WSAA,
      options: {
        disableCache: true,
        endpoint: this.context.production
          ? EndpointsEnum.WSAA
          : EndpointsEnum.WSAA_TEST,
      },
    });
  }

  /**
   * Tokent request authorization
   *
   * @param serviceName
   * @returns
   */
  private getTRA(serviceName: ServiceNamesEnum) {
    const date = new Date();
    return {
      loginTicketRequest: {
        $: { version: "1.0" },
        header: [
          {
            uniqueId: [Math.floor(date.getTime() / 1000)],
            generationTime: [new Date(date.getTime() - 600000).toISOString()],
            expirationTime: [new Date(date.getTime() + 600000).toISOString()],
          },
        ],
        service: [serviceName],
      },
    };
  }

  /**
   * Sign tokent request authorization
   *
   * @param serviceName
   * @param cert
   * @param key
   */
  private signTRA(traXml: string): string {
    const crypto = new Cryptography(this.context.cert, this.context.key);
    return crypto.sign(traXml);
  }

  /**
   * Get token authorization
   *
   * @param serviceName
   * @param cert
   * @param key
   * @returns
   */
  public async getAccessTicket(
    serviceName: ServiceNamesEnum
  ): Promise<AccessTicket> {
    // Create amd sign TRA
    const traXml = await Parser.jsonToXml(this.getTRA(serviceName));
    const signedTRA = this.signTRA(traXml);

    // Request TR
    const client = await this.getAuthClient();
    const [loginCmsResult] = await client.loginCmsAsync({ in0: signedTRA });
    const loginReturn = await Parser.xmlToJson<LoginTicketResponse>(
      loginCmsResult.loginCmsReturn
    );

    return new AccessTicket(loginReturn.loginticketresponse);
  }

  /**
   * Create the file name with a standard format
   *
   * @param serviceName name from Afip WS
   * @returns
   */
  public createFileName(serviceName: ServiceNamesEnum): string {
    return `TA-${this.context.cuit.toString()}-${serviceName}${
      this.context.production ? "-production" : ""
    }.json`;
  }

  /**
   * Save the access ticket locally using file system
   *
   * @param ticket accessmticket header and credentials
   * @param serviceName name from Afip WS
   */
  public async saveLocalAccessTicket(
    { header, credentials }: AccessTicket,
    serviceName: ServiceNamesEnum
  ): Promise<void> {
    try {
      fs.mkdir(this.context.ticketPath, { recursive: true });
    } catch (error) {
      throw error;
    }

    await fs.writeFile(
      resolve(this.context.ticketPath, this.createFileName(serviceName)),
      JSON.stringify({ header, credentials }),
      "utf8"
    );
  }

  /**
   * Get the access ticket locally using file system.
   * If the file is not found, the catch take the error and return undefined.
   *
   * ** Check if the folder has the correct access permission. **
   *
   * @param serviceName name from Afip WS
   * @returns access ticket or undefined if it is not there
   */
  public async getLocalAccessTicket(
    serviceName: ServiceNamesEnum
  ): Promise<AccessTicket | undefined> {
    let data: string;
    try {
      data = await fs.readFile(
        resolve(this.context.ticketPath, this.createFileName(serviceName)),
        "utf8"
      );
    } catch {
      return undefined;
    }

    try {
      const obj: ILoginCmsReturn = JSON.parse(data);
      return new AccessTicket(obj);
    } catch (error) {
      throw new Error("Invalid access ticket format read");
    }
  }
}
