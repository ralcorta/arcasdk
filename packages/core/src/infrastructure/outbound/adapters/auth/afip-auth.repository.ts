/**
 * Authentication Repository
 * Implements IAuthenticationRepositoryPort for WSAA authentication
 */
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { ITicketStoragePort } from "@infrastructure/outbound/ports/storage/ticket-storage.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { WSAuthParam } from "@application/types";
import { Parser } from "@infrastructure/utils/parser";
import { Cryptography } from "@infrastructure/utils/crypt-data";
import {
  ILoginCmsSoap,
  IloginCmsOutput,
  LoginTicketResponse,
} from "@infrastructure/outbound/ports/soap/interfaces/LoginCMSService/LoginCms";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";

export interface AuthRepositoryConfig {
  cert: string;
  key: string;
  cuit: number;
  production?: boolean;
  handleTicket?: boolean;
  ticketStorage?: ITicketStoragePort;
  credentials?: import("@domain/entities/access-ticket.entity").ILoginCredentials;
}

export class AuthRepository implements IAuthenticationRepositoryPort {
  private cert: string;
  private key: string;
  private production: boolean;
  private handleTicket: boolean;
  private ticketStorage?: ITicketStoragePort;

  constructor(
    private readonly soapClient: ISoapClientPort,
    config: AuthRepositoryConfig
  ) {
    this.cert = config.cert;
    this.key = config.key;
    this.production = config.production ?? false;
    this.handleTicket = config.handleTicket ?? false;
    this.ticketStorage = config.ticketStorage;
  }

  /**
   * Get a valid ticket from storage if available
   * @param serviceName Service name to get ticket for
   * @returns AccessTicket if found and valid, null otherwise
   */
  private async getValidTicketFromStorage(
    serviceName: string
  ): Promise<AccessTicket | null> {
    if (!this.ticketStorage) return null;

    const existingTicket = await this.ticketStorage.get(serviceName);
    if (existingTicket && !existingTicket.isExpired()) return existingTicket;

    return null;
  }

  /**
   * Login and get access ticket for a service
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  async login(serviceName: string): Promise<AccessTicket> {
    const existingTicket = await this.getValidTicketFromStorage(serviceName);
    if (existingTicket) return existingTicket;

    return this.requestLogin(serviceName);
  }

  /**
   * Create and configure WSAA SOAP client
   */
  private async createAuthClient(): Promise<ILoginCmsSoap> {
    const client = await this.soapClient.createClient<ILoginCmsSoap>(
      WsdlPathEnum.WSAA,
      { disableCache: true }
    );
    this.soapClient.setEndpoint(
      client,
      this.production ? EndpointsEnum.WSAA : EndpointsEnum.WSAA_TEST
    );
    return client;
  }

  /**
   * Request a new login ticket for a service
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  async requestLogin(serviceName: string): Promise<AccessTicket> {
    const existingTicket = await this.getValidTicketFromStorage(serviceName);
    if (existingTicket) return existingTicket;

    const signedTRA = this.signTRA(
      await Parser.jsonToXml(this.getTRA(serviceName))
    );

    const client = await this.createAuthClient();

    const [{ loginCmsReturn }] = await this.soapClient.call<
      [IloginCmsOutput, string, { [k: string]: any }, string]
    >(client, "loginCmsAsync", { in0: signedTRA });

    const ticket = AccessTicket.create(
      (await Parser.xmlToJson<LoginTicketResponse>(loginCmsReturn))
        .loginticketresponse
    );

    if (!this.handleTicket && this.ticketStorage) {
      await this.ticketStorage.save(ticket, serviceName);
    }

    return ticket;
  }

  /**
   * Get authentication parameters formatted for SOAP requests
   * @param ticket Access ticket
   * @param cuit CUIT number
   * @returns WSAuthParam formatted for SOAP
   */
  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam {
    return ticket.getWSAuthFormat(cuit);
  }

  /**
   * Create TRA (Token Request Authorization) JSON
   * @param serviceName Service name to create TRA for
   * @returns TRA JSON
   */
  private getTRA(serviceName: string) {
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
   * Sign TRA (Token Request Authorization) XML
   * @param traXml TRA XML to sign
   * @returns Signed TRA XML
   */
  private signTRA(traXml: string): string {
    const crypto = new Cryptography(this.cert, this.key);
    return crypto.sign(traXml);
  }
}
