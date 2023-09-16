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
import { AfipContext, WSAuthTokens } from "../types";
import { EndpointsEnum } from "../enums";
import { logger } from "../utils/logger";

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
   * Get login cms from new request to afip
   *
   * @param serviceName ServiceNamesEnum
   * @returns ILoginCmsReturn
   */
  async getLoginCms(serviceName: ServiceNamesEnum): Promise<ILoginCmsReturn> {
    // Create amd sign TRA
    const traXml = await Parser.jsonToXml(this.getTRA(serviceName));
    const signedTRA = this.signTRA(traXml);

    // Request TR
    const client = await this.getAuthClient();
    const [loginCmsResult] = await client.loginCmsAsync({ in0: signedTRA });
    const loginReturn = await Parser.xmlToJson<LoginTicketResponse>(
      loginCmsResult.loginCmsReturn
    );

    return loginReturn.loginticketresponse;
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
   * Get path to the ticket file
   *
   * @param serviceName ServiceNamesEnum
   * @returns
   */
  private getTicketFilePathByService(serviceName: ServiceNamesEnum): string {
    return resolve(this.context.ticketPath, this.createFileName(serviceName));
  }

  public async getAuthKey(
    serviceName: ServiceNamesEnum
  ): Promise<WSAuthTokens> {
    const ticket = await this.getAccessTicket(serviceName);
    return ticket.getAuthKeyProps();
  }

  /**
   * Get token authorization
   *
   * @param serviceName ServiceNamesEnum
   * @returns AccessTicket
   */
  public async getAccessTicket(
    serviceName: ServiceNamesEnum
  ): Promise<AccessTicket> {
    let accessTicket = await this.getLocalAccessTicket(serviceName);

    if (!accessTicket) {
      const loginTicketResponse = await this.getLoginCms(serviceName);
      accessTicket = new AccessTicket(loginTicketResponse);
      await this.saveLocalAccessTicket(accessTicket, serviceName);
    }

    return accessTicket;
  }

  /**
   * Save the access ticket locally using file system
   *
   * @param ticket accessmticket header and credentials
   * @param serviceName name from Afip WS
   * @returns void
   */
  public async saveLocalAccessTicket(
    ticket: AccessTicket,
    serviceName: ServiceNamesEnum
  ): Promise<void> {
    try {
      fs.mkdir(this.context.ticketPath, { recursive: true });
    } catch (error) {
      logger.error(error.message);
      throw error;
    }

    const filePath = this.getTicketFilePathByService(serviceName);
    await fs.writeFile(filePath, JSON.stringify(ticket), "utf8");
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
    const filePath = this.getTicketFilePathByService(serviceName);

    if (!fs.access(filePath, fs.constants.F_OK)) return undefined;
    if (!fs.access(filePath, fs.constants.R_OK))
      throw new Error(`Access denied to ticket file: ${filePath}`);

    const fileData = await fs.readFile(filePath, "utf8");

    try {
      return new AccessTicket(JSON.parse(fileData));
    } catch (error) {
      throw new Error("Invalid access ticket format");
    }
  }
}
