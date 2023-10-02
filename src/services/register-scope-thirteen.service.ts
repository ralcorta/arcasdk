import { AfipService } from "./afip.service";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import {
  IPersonaServiceA13PortSoap,
  PersonaServiceA13PortTypes,
} from "../soap/interfaces/PersonaServiceA13/PersonaServiceA13Port";
import { Context } from "../types";
import { EndpointsEnum } from "../enums";

export class RegisterScopeThirteenService extends AfipService<IPersonaServiceA13PortSoap> {
  constructor(context: Context) {
    super(context, {
      url: EndpointsEnum.WSSR_PADRON_THIRTEEN,
      url_test: EndpointsEnum.WSSR_PADRON_THIRTEEN_TEST,
      wsdl: WsdlPathEnum.WSSR_PADRON_THIRTEEN,
      wsdl_test: WsdlPathEnum.WSSR_PADRON_THIRTEEN_TEST,
      serviceName: ServiceNamesEnum.WSSR_PADRON_THIRTEEN,
      v12: false,
    });
  }

  /**
   * Asks to web service for servers status
   *
   * @return object { appserver : Web Service status,
   * dbserver : Database status, authserver : Autentication
   * server status}
   **/
  async getServerStatus() {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    return output;
  }

  /**
   * Asks to web service for taxpayer details
   *
   * @return object|null if taxpayer does not exists, return null,
   * if it exists, returns full response
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<PersonaServiceA13PortTypes.IpersonaReturn> {
    const client = await this.getClient();
    const { Auth } = await this.getWsAuth();
    const [output] = await client.getPersonaAsync({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      idPersona: identifier,
    });
    return output.personaReturn;
  }

  /**
   * Asks to web service for tax id by document number
   *
   * @return object|null if taxpayer does not exists, return null,
   * if it exists, returns idPersona property of response
   **/
  async getTaxIDByDocument(
    documentNumber: string
  ): Promise<PersonaServiceA13PortTypes.IidPersonaListReturn> {
    const client = await this.getClient();
    const { Auth } = await this.getWsAuth();
    const [output] = await client.getIdPersonaListByDocumentoAsync({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      documento: documentNumber,
    });
    return output.idPersonaListReturn;
  }
}
