import { Client } from "soap";
import { AccessTicket } from "../auth/access-ticket";
import { AfipAuth } from "../auth/afip-auth";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import { SoapClientFacade } from "../soap/soap-client-facade";
import { SoapServiceVersion } from "../enums";
import {
  WSAuthTokens,
  AfipContext,
  AfipServiceSoapParam,
  SoapServices,
  WSAuthParam,
} from "../types";

export class AfipService<T extends Client> {
  private _soapCliente?: T;
  private _tokens?: WSAuthTokens;
  private readonly _serviceName: ServiceNamesEnum;
  private readonly _afipAuth: AfipAuth;

  constructor(
    protected readonly context: AfipContext,
    private _soapParams: AfipServiceSoapParam
  ) {
    this._afipAuth = new AfipAuth(context);

    this._serviceName = this._soapParams.serviceName;
    this._tokens = this.context.authTokens;
    this._soapParams.v12 = this._soapParams.v12 || false;

    if (!this.context.production) {
      this._soapParams.url = this._soapParams.url_test ?? this._soapParams.url;
      this._soapParams.wsdl =
        this._soapParams.wsdl_test ?? this._soapParams.wsdl;
    }
  }

  public setTokens(tokens: WSAuthTokens): void {
    this._tokens = tokens;
  }

  async getClient(): Promise<T> {
    if (!this._soapCliente) this._soapCliente = await this.proxySoapClient();
    return this._soapCliente;
  }

  private async proxySoapClient(): Promise<T> {
    const client = await this.instanceSoapClient();
    return new Proxy(client, {
      get: (target: T, prop: string) => {
        const func = prop.endsWith("Async") ? prop.slice(0, -5) : prop;
        if (target[func] instanceof Function) {
          const soapServices: SoapServices<T> = client.describe();
          const soapVersion = this._soapParams.v12
            ? SoapServiceVersion.ServiceSoap12
            : SoapServiceVersion.ServiceSoap;

          // Get tokens only if the method exist and require Auth.
          if (soapServices?.Service?.[soapVersion]?.[func]?.input?.["Auth"]) {
            return async (req: Record<string, any>) => {
              return target[prop]({
                ...(await this.getAuthTokens()),
                ...req,
              });
            };
          }
        }
        return target[prop];
      },
    });
  }

  private async instanceSoapClient(): Promise<T> {
    const client = await SoapClientFacade.create<T>({
      wsdl: this._soapParams.wsdl,
      options: {
        disableCache: true,
        forceSoap12Headers: this._soapParams.v12,
        ...this._soapParams.options,
      },
    });
    client.setEndpoint(this._soapParams.url);
    return client;
  }

  /**
   * I generate signatures through the WSAA. If handleTicket is not defined, the function will save the tokens locally.
   * @returns tokens
   */
  public async logIn(): Promise<WSAuthTokens> {
    if (!this._tokens) {
      if (this.context.handleTicket)
        throw new Error(
          "Tokens are not defined yet. Set it when Afip class is instanced."
        );

      let ticket = await this._afipAuth.getLocalAccessTicket(this._serviceName);

      if (!ticket?.isAccessTicketValid()) {
        ticket = await this._afipAuth.getAccessTicket(this._serviceName);
        await this._afipAuth.saveLocalAccessTicket(ticket, this._serviceName);
      }
      this._tokens = ticket.getAuthKeyProps();
    }

    return this._tokens as WSAuthTokens;
  }

  /**
   * Send request to AFIP WSAA and return the auth object required for protected services
   *
   * @param params Parameters to send
   **/
  protected async getAuthTokens(): Promise<WSAuthParam> {
    if (this._tokens) {
      if (AccessTicket.hasExpired(this._tokens.expirationDate)) {
        if (this.context.handleTicket) {
          throw new Error("Tokens expired.");
        }
      } else {
        return {
          Auth: {
            Cuit: this.context.cuit,
            Sign: this._tokens.sign,
            Token: this._tokens.token,
          },
        };
      }
    }

    this._tokens = await this.logIn();

    return {
      Auth: {
        Token: this._tokens.token,
        Sign: this._tokens.sign,
        Cuit: this.context.cuit,
      },
    };
  }
}
