import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@arcasdk/core/src/application/dto/register.dto";

export const REGISTER_TEST_CUIT = 20111111111;
export const REGISTER_TEST_CUITS = [REGISTER_TEST_CUIT, REGISTER_TEST_CUIT];

export function mapServerStatus(source: {
  return: RegisterServerStatusDto;
}): RegisterServerStatusDto {
  return {
    appserver: source.return.appserver,
    dbserver: source.return.dbserver,
    authserver: source.return.authserver,
  };
}

export function withNormalizedTaxpayerDetails(
  details: TaxpayerDetailsDto,
): TaxpayerDetailsDto {
  return {
    ...details,
    datosGenerales: details.datosGenerales ?? {},
    datosMonotributo: details.datosMonotributo ?? {},
    datosRegimenGeneral: details.datosRegimenGeneral ?? {},
  };
}

export function mapTaxpayersDetails(
  persona: TaxpayersDetailsDto["persona"],
): TaxpayersDetailsDto {
  return {
    persona,
    cantidadRegistros: persona?.length ?? 0,
  };
}
