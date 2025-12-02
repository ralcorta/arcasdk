/**
 * Register Inscription Proof Repository
 * Implements IRegisterInscriptionProofRepositoryPort
 */
import { IRegisterInscriptionProofRepositoryPort } from "@application/ports/register/register-repository.ports";
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register.dto";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { IPersonaServiceInscriptionProofPortSoap } from "@infrastructure/outbound/ports/soap/interfaces/PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";

export class RegisterInscriptionProofRepository
  extends BaseSoapRepository
  implements IRegisterInscriptionProofRepositoryPort
{
  private client?: IPersonaServiceInscriptionProofPortSoap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  private async getClient(): Promise<IPersonaServiceInscriptionProofPortSoap> {
    if (this.client) {
      return this.client;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSSR_INSCRIPTION_PROOF
      : WsdlPathEnum.WSSR_INSCRIPTION_PROOF_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSSR_INSCRIPTION_PROOF
      : EndpointsEnum.WSSR_INSCRIPTION_PROOF_TEST;

    const client =
      await this.soapClient.createClient<IPersonaServiceInscriptionProofPortSoap>(
        wsdlName,
        { forceSoap12Headers: false }
      );

    this.soapClient.setEndpoint(client, endpoint);

    this.client = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSSR_INSCRIPTION_PROOF,
      injectAuthProperty: true,
      soapVersion: SoapServiceVersion.ServiceSoap,
      authMapper: (auth: any) => ({
        token: auth.Auth.Token,
        sign: auth.Auth.Sign,
        cuitRepresentada: auth.Auth.Cuit,
      }),
      excludeMethods: ["dummy"],
    });

    return this.client;
  }

  async getServerStatus(): Promise<RegisterServerStatusDto> {
    const client = await this.getClient();
    const [output] = await client.dummyAsync({});
    const result = output.return;

    return {
      appserver: result.appserver,
      dbserver: result.dbserver,
      authserver: result.authserver,
    };
  }

  async getTaxpayerDetails(
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    const client = await this.getClient();

    try {
      const [output] = await client.getPersona_v2Async({
        idPersona: identifier,
      } as any);

      const personaReturn = output.personaReturn;
      if (!personaReturn || !(personaReturn as any).persona) {
        return null;
      }

      return this.mapPersonaReturnToDto(personaReturn);
    } catch (error: any) {
      if (error?.code === 602 || error?.message?.includes("no existe")) {
        return null;
      }
      // Create a new error with only serializable properties to avoid circular structure issues
      const sanitizedError = new Error(error?.message || "Unknown error");
      sanitizedError.name = error?.name || "Error";
      if (error?.code) {
        (sanitizedError as any).code = error.code;
      }
      if (error?.stack) {
        sanitizedError.stack = error.stack;
      }
      throw sanitizedError;
    }
  }

  async getTaxpayersDetails(
    identifiers: number[]
  ): Promise<TaxpayersDetailsDto> {
    const client = await this.getClient();
    const [output] = await client.getPersonaList_v2Async({
      idPersona: identifiers,
    } as any);

    const personaListReturn = output.personaListReturn;

    return {
      persona:
        personaListReturn.persona?.map((p: any) => this.mapPersonaToDto(p)) ||
        [],
      cantidadRegistros: personaListReturn.persona?.length || 0,
      errorConstancia: undefined,
    };
  }

  private mapPersonaReturnToDto(personaReturn: any): TaxpayerDetailsDto {
    const persona = personaReturn.persona || personaReturn;

    return {
      idPersona: persona.idPersona,
      tipoPersona: persona.tipoPersona,
      estadoClave: persona.estadoClave,
      datosGenerales: persona.datosGenerales || persona,
      datosMonotributo: persona.datosMonotributo,
      datosRegimenGeneral: persona.datosRegimenGeneral,
      errorConstancia: persona.errorConstancia
        ? {
            error: persona.errorConstancia.error || "",
            codigo: persona.errorConstancia.codigo,
          }
        : undefined,
    };
  }

  private mapPersonaToDto(persona: any): TaxpayerDetailsDto {
    return {
      idPersona: persona.datosGenerales?.idPersona,
      tipoPersona: persona.datosGenerales?.tipoPersona,
      estadoClave: persona.datosGenerales?.estadoClave,
      datosGenerales: persona.datosGenerales,
      datosMonotributo: persona.datosMonotributo,
      datosRegimenGeneral: persona.datosRegimenGeneral,
      errorConstancia: persona.errorConstancia
        ? {
            error: persona.errorConstancia.error || "",
            codigo: persona.errorConstancia.codigo,
          }
        : undefined,
    };
  }
}
