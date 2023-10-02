import { Client } from "soap";
import { AccessTicket } from "../auth/access-ticket";
import { AfipAuth } from "../auth/afip-auth";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import { SoapClientFacade } from "../soap/soap-client-facade";
import { SoapServiceVersion } from "../enums";
import {
  Context,
  AfipServiceSoapParam,
  SoapServices,
  WSAuthParam,
  ILoginCredentials,
} from "../types";

export class AfipService<T extends Client> {
  private _soapCliente?: T;
  private _credentials?: AccessTicket;
  private _serviceName: ServiceNamesEnum;
  private _afipAuth: AfipAuth;

  constructor(
    protected readonly context: Context,
    private _soapParams: AfipServiceSoapParam
  ) {
    this._afipAuth = new AfipAuth(context);
    this._serviceName = this._soapParams.serviceName;
    this._soapParams.v12 = this._soapParams.v12 || false;

    this.context.credentials && this.setCredentials(this.context.credentials);

    if (!this.context.production) {
      this._soapParams.url = this._soapParams.url_test ?? this._soapParams.url;
      this._soapParams.wsdl =
        this._soapParams.wsdl_test ?? this._soapParams.wsdl;
    }
  }

  public setCredentials(credentials: ILoginCredentials): void {
    this._credentials = new AccessTicket(credentials);
  }

  public isCredentialStillValid(): boolean {
    return this._credentials ? !this._credentials.isExpired() : false;
  }

  async getClient(): Promise<T> {
    if (!this._soapCliente) this._soapCliente = await this.proxySoapClient();
    return this._soapCliente;
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
              const auth = await this.getWsAuth();
              return target[prop]({
                ...auth,
                ...req,
              });
            };
          }
        }
        return target[prop];
      },
    });
  }

  /**
   * Generate signatures through the WSAA.
   *
   **/
  async login() {
    return this._afipAuth.login(this._serviceName);
  }

  /**
   * Generate signatures through the WSAA. If handleTicket is not defined, the function will save the tokens locally.
   *
   * @param params Parameters to send
   **/
  async getWsAuth(): Promise<WSAuthParam> {
    if (this.context.handleTicket) {
      if (!this._credentials) {
        throw new Error(
          "Credentials are not defined yet, and handleTicket param is 'true'. Set them when the Afip class is instantiated."
        );
      } else if (this._credentials.isExpired()) {
        throw new Error("Credentials expired.");
      }
    } else if (!this._credentials || this._credentials.isExpired()) {
      this._credentials = await this._afipAuth.login(this._serviceName);
    }

    return this._credentials.getWSAuthFormat(this.context.cuit);
  }
}
