import { AfipService } from "./afip.service";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import {
  IPersonaServiceA5PortSoap,
  PersonaServiceA5PortTypes,
} from "../soap/interfaces/PersonaServiceA5/PersonaServiceA5Port";
import { Context } from "../types";
import { EndpointsEnum } from "../enums";

export class RegisterScopeFiveService extends AfipService<IPersonaServiceA5PortSoap> {
  constructor(context: Context) {
    super(context, {
      url: EndpointsEnum.WSSR_PADRON_FIVE,
      url_test: EndpointsEnum.WSSR_PADRON_FIVE_TEST,
      wsdl: WsdlPathEnum.WSSR_PADRON_FIVE,
      wsdl_test: WsdlPathEnum.WSSR_PADRON_FIVE_TEST,
      serviceName: ServiceNamesEnum.WSSR_PADRON_FIVE,
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
  ): Promise<PersonaServiceA5PortTypes.IpersonaReturn> {
    const client = await this.getClient();
    const { Auth } = await this.getWsAuth();
    const [output] = await client.getPersona_v2Async({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      idPersona: identifier,
    });
    return output.personaReturn;
  }

  /**
   * Asks to web service for taxpayers details
   *
   * @return [object] returns web service full response
   **/
  async getTaxpayersDetails(
    identifier: number
  ): Promise<PersonaServiceA5PortTypes.IpersonaListReturn> {
    const client = await this.getClient();
    const { Auth } = await this.getWsAuth();
    const [output] = await client.getPersonaList_v2Async({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      idPersona: identifier,
    });
    return output.personaListReturn;
  }
}
