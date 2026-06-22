import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { accessTicketToWSAuthParam } from "@application/helpers/access-ticket-auth";
import { WSAuthParam } from "@application/types";
import { ArcaServiceName } from "@application/types/service-name.types";
import { Parser } from "@infrastructure/utils/parser";
import { DateTimeRef } from "@infrastructure/utils/datetime-ref";
import { Cryptography } from "@infrastructure/utils/crypt-data";
import { mapLoginTicketResponse } from "@infrastructure/mappers/login-ticket.mapper";
import { ILoginCredentials } from "@domain/types/auth.types";
import {
  ILoginCmsSoap,
  IloginCmsOutput,
  LoginTicketResponse,
} from "@infrastructure/soap/contracts/LoginCMSService/LoginCms";
import { WsdlPaths } from "@infrastructure/soap/config/wsdl-path.types";
import { Endpoints } from "@infrastructure/soap/config/endpoints.types";
import { AuthRepositoryConfig } from "@infrastructure/types/auth-repository.types";
import { ISoapClientPort } from "@infrastructure/soap/soap-client.port";
import { ITicketStoragePort } from "@application/ports/storage";
import { SoapClient } from "../../soap/soap-client";
import { DEFAULT_USE_HTTPS_AGENT } from "@infrastructure/constants";

export class AuthRepository implements IAuthenticationRepositoryPort {
  private cert: string;
  private key: string;
  private production: boolean;
  private handleTicket: boolean;
  private ticketStorage?: ITicketStoragePort;
  private manualCredentials?: ILoginCredentials;

  private readonly soapClient: ISoapClientPort;

  constructor(config: AuthRepositoryConfig) {
    this.soapClient =
      config.soapClient ??
      new SoapClient(config.useHttpsAgent ?? DEFAULT_USE_HTTPS_AGENT);
    this.cert = config.cert;
    this.key = config.key;
    this.production = config.production ?? false;
    this.handleTicket = config.handleTicket ?? false;
    this.ticketStorage = config.ticketStorage;
    this.manualCredentials = config.credentials;
  }

  /**
   * Get a valid ticket from storage if available
   * @param serviceName Service name to get ticket for
   * @returns AccessTicket if found and valid, null otherwise
   */
  private async getValidTicketFromStorage(
    serviceName: ArcaServiceName,
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
  async login(serviceName: ArcaServiceName): Promise<AccessTicket> {
    // If handleTicket is true and we have manual credentials, use them directly
    if (this.handleTicket && this.manualCredentials) {
      return AccessTicket.create(this.manualCredentials);
    }

    const existingTicket = await this.getValidTicketFromStorage(serviceName);
    if (existingTicket) return existingTicket;

    return this.requestLogin(serviceName);
  }

  /**
   * Create and configure WSAA SOAP client
   */
  private async createAuthClient(): Promise<ILoginCmsSoap> {
    const client = await this.soapClient.createClient<ILoginCmsSoap>(
      WsdlPaths.WSAA,
      { disableCache: true },
    );
    this.soapClient.setEndpoint(
      client,
      this.production ? Endpoints.WSAA : Endpoints.WSAA_TEST,
    );
    return client;
  }

  /**
   * Request a new login ticket for a service
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  async requestLogin(serviceName: ArcaServiceName): Promise<AccessTicket> {
    const existingTicket = await this.getValidTicketFromStorage(serviceName);
    if (existingTicket) return existingTicket;

    const signedTRA = this.signTRA(
      await Parser.jsonToXml(this.getTRA(serviceName)),
    );

    const client = await this.createAuthClient();

    const [{ loginCmsReturn }] = await this.soapClient.call<
      [IloginCmsOutput, string, Record<string, unknown>, string]
    >(client, "loginCmsAsync", { in0: signedTRA });

    const loginPayload = await this.parseLoginTicketResponse(loginCmsReturn);
    const ticket = AccessTicket.create(loginPayload);

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
    return accessTicketToWSAuthParam(ticket, cuit);
  }

  /**
   * Create TRA (Token Request Authorization) JSON
   * @param serviceName Service name to create TRA for
   * @returns TRA JSON
   */
  private getTRA(serviceName: ArcaServiceName) {
    const traTimes = DateTimeRef.now();
    return {
      loginTicketRequest: {
        $: { version: "1.0" },
        header: [
          {
            uniqueId: [traTimes.wsaaTraUniqueIdSeconds()],
            generationTime: [traTimes.wsaaTraGenerationTimeIso()],
            expirationTime: [traTimes.wsaaTraExpirationTimeIso()],
          },
        ],
        service: [serviceName],
      },
    };
  }

  private async parseLoginTicketResponse(
    loginCmsReturnXml: string,
  ): Promise<ILoginCredentials> {
    const parsed =
      await Parser.xmlToJson<LoginTicketResponse>(loginCmsReturnXml);
    return mapLoginTicketResponse(parsed);
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
