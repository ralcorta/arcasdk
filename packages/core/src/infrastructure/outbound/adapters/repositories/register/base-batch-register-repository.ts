import { Client } from "soap";
import { BaseRegisterRepository } from "./base-register-repository";
import { IRegisterBatchRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  TaxpayersDetailsDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

export abstract class BaseBatchRegisterRepository<
  TClient extends Client & { dummyAsync: (args: any) => Promise<any> },
>
  extends BaseRegisterRepository<TClient>
  implements IRegisterBatchRepositoryPort
{
  protected abstract get personaListMethod():
    | "getPersonaList_v2Async"
    | "getPersonaListAsync";

  async getTaxpayersDetails(
    identifiers: number[],
  ): Promise<TaxpayersDetailsDto> {
    const client = await this.getClient();
    const methodName = this.personaListMethod;

    const [output] = await client[methodName]({
      idPersona: identifiers,
    });

    const personaListReturn = output.personaListReturn;

    return {
      persona:
        personaListReturn.persona?.map((p: any) => this.mapPersonaToDto(p)) ||
        [],
      cantidadRegistros: personaListReturn.persona?.length || 0,
      errorConstancia: undefined,
    };
  }

  protected mapPersonaToDto(persona: any): TaxpayerDetailsDto {
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
