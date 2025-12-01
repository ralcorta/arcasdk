import { AfipService } from "./afip.service";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import {
  IPersonaServiceInscriptionProofPortSoap,
  PersonaServiceInscriptionProofPortTypes
} from "../soap/interfaces/PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";
import { Context } from "../types";
import { EndpointsEnum } from "../enums";

export class RegisterInscriptionProofService extends AfipService<IPersonaServiceInscriptionProofPortSoap> {
  constructor(context: Context) {
    super(context, {
      url: EndpointsEnum.WSSR_INSCRIPTION_PROOF,
      url_test: EndpointsEnum.WSSR_INSCRIPTION_PROOF_TEST,
      wsdl: WsdlPathEnum.WSSR_INSCRIPTION_PROOF,
      wsdl_test: WsdlPathEnum.WSSR_INSCRIPTION_PROOF_TEST,
      serviceName: ServiceNamesEnum.WSSR_INSCRIPTION_PROOF,
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
  ): Promise<PersonaServiceInscriptionProofPortTypes.IpersonaReturn> {
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
    identifiers: number[]
  ): Promise<PersonaServiceInscriptionProofPortTypes.IpersonaListReturn> {
    const client = await this.getClient();
    const { Auth } = await this.getWsAuth();
    const [output] = await client.getPersonaList_v2Async({
      cuitRepresentada: Auth.Cuit,
      sign: Auth.Sign,
      token: Auth.Token,
      idPersona: identifiers,
    });
    return output.personaListReturn;
  }
}
