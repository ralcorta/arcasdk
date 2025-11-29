/**
 * AFIP Authentication Repository Adapter
 * Implements IAuthRepositoryPort for AFIP/ARCA authentication
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
  LoginTicketResponse,
} from "@infrastructure/outbound/ports/soap/interfaces/LoginCMSService/LoginCms";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";

export interface AfipAuthRepositoryConfig {
  cert: string;
  key: string;
  cuit: number;
  production?: boolean;
  handleTicket?: boolean;
  ticketStorage?: ITicketStoragePort;
}

export class AfipAuthRepositoryAdapter
  implements IAuthenticationRepositoryPort
{
  private cert: string;
  private key: string;
  private cuit: number;
  private production: boolean;
  private handleTicket: boolean;
  private ticketStorage?: ITicketStoragePort;

  constructor(
    private readonly soapClient: ISoapClientPort,
    config: AfipAuthRepositoryConfig
  ) {
    this.cert = config.cert;
    this.key = config.key;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
    this.handleTicket = config.handleTicket ?? false;
    this.ticketStorage = config.ticketStorage;
  }

  async login(serviceName: string): Promise<AccessTicket> {
    // Check if we have a valid ticket in storage first
    if (this.ticketStorage) {
      const existingTicket = await this.ticketStorage.get(serviceName);
      if (existingTicket && !existingTicket.isExpired()) {
        return existingTicket;
      }
    }

    // No valid ticket found, request new login
    return this.requestLogin(serviceName);
  }

  async requestLogin(serviceName: string): Promise<AccessTicket> {
    // Always check if we have a valid ticket in storage first (if storage is available)
    // This prevents "alreadyAuthenticated" errors when handleTicket is true
    if (this.ticketStorage) {
      const existingTicket = await this.ticketStorage.get(serviceName);
      if (existingTicket && !existingTicket.isExpired()) {
        // If handleTicket is true, we use the existing ticket but don't save it again
        // If handleTicket is false, we use and will save it again
        return existingTicket;
      }
    }

    // No valid ticket found, request new login
    // Create and sign TRA (Token Request Authorization)
    const traXml = await Parser.jsonToXml(this.getTRA(serviceName));
    const signedTRA = this.signTRA(traXml);

    // Get auth client
    const client = await this.soapClient.createClient<ILoginCmsSoap>(
      WsdlPathEnum.WSAA,
      {
        disableCache: true,
        endpoint: this.production
          ? EndpointsEnum.WSAA
          : EndpointsEnum.WSAA_TEST,
      }
    );

    this.soapClient.setEndpoint(
      client,
      this.production ? EndpointsEnum.WSAA : EndpointsEnum.WSAA_TEST
    );

    // Request login
    const response = await this.soapClient.call<[any, string, any, string]>(
      client,
      "loginCmsAsync",
      {
        in0: signedTRA,
      }
    );
    const [loginCmsResult] = response;

    const loginReturn = await Parser.xmlToJson<LoginTicketResponse>(
      loginCmsResult.loginCmsReturn
    );

    const ticket = AccessTicket.create(loginReturn.loginticketresponse);

    // Save ticket if storage is available and handleTicket is false
    // When handleTicket is true, we don't save to allow manual management
    // but we still check for existing tickets to avoid unnecessary logins
    if (!this.handleTicket && this.ticketStorage) {
      await this.ticketStorage.save(ticket, serviceName);
    }

    return ticket;
  }

  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam {
    return ticket.getWSAuthFormat(cuit);
  }

  /**
   * Create TRA (Token Request Authorization) JSON
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
   */
  private signTRA(traXml: string): string {
    const crypto = new Cryptography(this.cert, this.key);
    return crypto.sign(traXml);
  }
}
