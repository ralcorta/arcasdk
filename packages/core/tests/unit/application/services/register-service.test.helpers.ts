import {
  ServerStatus,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register";

export const REGISTER_TEST_CUIT = 20111111111;
export const REGISTER_TEST_CUITS = [REGISTER_TEST_CUIT, REGISTER_TEST_CUIT];

export function mapServerStatus(source: {
  return: {
    appserver: string;
    dbserver: string;
    authserver: string;
  };
}): ServerStatus {
  return {
    appServer: source.return.appserver,
    dbServer: source.return.dbserver,
    authServer: source.return.authserver,
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
