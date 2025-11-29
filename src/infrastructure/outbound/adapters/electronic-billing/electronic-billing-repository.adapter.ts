/**
 * Electronic Billing Repository Adapter
 * Implements IElectronicBillingRepositoryPort for AFIP/ARCA Electronic Billing
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ILoggerPort } from "@infrastructure/outbound/ports/logger/logger.port";
import { Voucher } from "@domain/entities/voucher.entity";
import { ICreateVoucherResult } from "@application/types/result.types";
import {
  ServerStatusDto,
  SalesPointsResultDto,
  LastVoucherResultDto,
  VoucherInfoResultDto,
  VoucherTypesResultDto,
  ConceptTypesResultDto,
  DocumentTypesResultDto,
  AliquotTypesResultDto,
  CurrencyTypesResultDto,
  OptionalTypesResultDto,
  TaxTypesResultDto,
} from "@application/dto/electronic-billing.dto";
import {
  IServiceSoap12Soap,
  ServiceSoap12Types,
} from "@infrastructure/outbound/ports/soap/interfaces/Service/ServiceSoap12";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import { EndpointsEnum } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";

export interface ElectronicBillingRepositoryAdapterConfig {
  cuit: number;
  production?: boolean;
}

export class ElectronicBillingRepositoryAdapter
  implements IElectronicBillingRepositoryPort
{
  private soapClient?: IServiceSoap12Soap;
  private readonly cuit: number;
  private readonly production: boolean;

  constructor(
    private readonly soapClientPort: ISoapClientPort,
    private readonly authRepository: IAuthenticationRepositoryPort,
    private readonly logger: ILoggerPort,
    config: ElectronicBillingRepositoryAdapterConfig
  ) {
    this.cuit = config.cuit;
    this.production = config.production ?? false;
  }

  /**
   * Get or create SOAP client with authentication proxy
   */
  private async getClient(): Promise<IServiceSoap12Soap> {
    if (this.soapClient) {
      return this.soapClient;
    }

    const wsdlPath = this.production
      ? WsdlPathEnum.WSFE
      : WsdlPathEnum.WSFE_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSFEV1
      : EndpointsEnum.WSFEV1_TEST;

    // Create SOAP client
    const client = await this.soapClientPort.createClient<IServiceSoap12Soap>(
      this.getWsdlFullPath(wsdlPath),
      {
        forceSoap12Headers: true,
      }
    );

    // Set endpoint
    this.soapClientPort.setEndpoint(client, endpoint);

    // Create proxy to inject Auth automatically
    this.soapClient = this.createAuthenticatedProxy(client);

    return this.soapClient;
  }

  /**
   * Get full path to WSDL file
   */
  private getWsdlFullPath(wsdlPath: string): string {
    // WSDL files are in infrastructure/outbound/adapters/soap/wsdl/
    // At runtime, they're copied to lib/infrastructure/outbound/adapters/soap/wsdl/
    const path = require("path");
    return path.resolve(__dirname, "..", "soap", "wsdl", wsdlPath);
  }

  /**
   * Create a proxy that automatically injects Auth into SOAP method calls
   */
  private createAuthenticatedProxy(
    client: IServiceSoap12Soap
  ): IServiceSoap12Soap {
    return new Proxy(client, {
      get: (target: IServiceSoap12Soap, prop: string) => {
        const original = target[prop as keyof IServiceSoap12Soap];

        // Only intercept async methods that need Auth
        if (
          typeof original === "function" &&
          prop.endsWith("Async") &&
          prop !== "describe"
        ) {
          return async (params: any) => {
            // Get authentication
            const ticket = await this.authRepository.login(
              ServiceNamesEnum.WSFE
            );
            const auth = this.authRepository.getAuthParams(ticket, this.cuit);

            // Inject Auth into params
            const paramsWithAuth = {
              ...auth,
              ...params,
            };

            // Call original method
            return (original as any).call(target, paramsWithAuth);
          };
        }

        return original;
      },
    }) as IServiceSoap12Soap;
  }

  async getServerStatus(): Promise<ServerStatusDto> {
    const client = await this.getClient();
    const [output] = await client.FEDummyAsync({});

    return {
      appServer: output.FEDummyResult.AppServer,
      dbServer: output.FEDummyResult.DbServer,
      authServer: output.FEDummyResult.AuthServer,
    };
  }

  async getSalesPoints(): Promise<SalesPointsResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetPtosVentaAsync({});

    const result = output.FEParamGetPtosVentaResult;

    return {
      resultGet: result.ResultGet
        ? {
            ptoVenta:
              result.ResultGet.PtoVenta?.map((p) => ({
                nro: p.Nro,
                emisionTipo: p.EmisionTipo,
                bloqueado: p.Bloqueado,
                fechaBaja: p.FchBaja,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getLastVoucher(
    salesPoint: number,
    voucherType: number
  ): Promise<LastVoucherResultDto> {
    const client = await this.getClient();
    const [output] = await client.FECompUltimoAutorizadoAsync({
      PtoVta: salesPoint,
      CbteTipo: voucherType,
    });

    const result = output.FECompUltimoAutorizadoResult;

    return {
      cbteNro: result.CbteNro,
      cbteTipo: result.CbteTipo,
      ptoVta: result.PtoVta,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async createVoucher(voucher: Voucher): Promise<ICreateVoucherResult> {
    const client = await this.getClient();
    const voucherData = voucher.toDTO();

    const [output] = await client.FECAESolicitarAsync({
      FeCAEReq: {
        FeCabReq: {
          CantReg: voucherData.CbteHasta - voucherData.CbteDesde + 1,
          PtoVta: voucherData.PtoVta,
          CbteTipo: voucherData.CbteTipo,
        },
        FeDetReq: {
          FECAEDetRequest: [
            {
              Concepto: voucherData.Concepto,
              DocTipo: voucherData.DocTipo,
              DocNro: voucherData.DocNro,
              CbteDesde: voucherData.CbteDesde,
              CbteHasta: voucherData.CbteHasta,
              CbteFch: voucherData.CbteFch,
              ImpTotal: voucherData.ImpTotal,
              ImpTotConc: voucherData.ImpTotConc,
              ImpNeto: voucherData.ImpNeto,
              ImpOpEx: voucherData.ImpOpEx,
              ImpIVA: voucherData.ImpIVA,
              ImpTrib: voucherData.ImpTrib,
              FchServDesde: voucherData.FchServDesde,
              FchServHasta: voucherData.FchServHasta,
              FchVtoPago: voucherData.FchVtoPago,
              MonId: voucherData.MonId,
              MonCotiz: voucherData.MonCotiz,
              CondicionIVAReceptorId: voucherData.CondicionIVAReceptorId,
              Tributos: voucherData.Tributos
                ? { Tributo: voucherData.Tributos }
                : undefined,
              Iva: voucherData.Iva ? { AlicIva: voucherData.Iva } : undefined,
              CbtesAsoc: voucherData.CbtesAsoc
                ? { CbteAsoc: voucherData.CbtesAsoc }
                : undefined,
              Compradores: voucherData.Compradores
                ? { Comprador: voucherData.Compradores }
                : undefined,
              Opcionales: voucherData.Opcionales
                ? { Opcional: voucherData.Opcionales }
                : undefined,
            } as ServiceSoap12Types.IFECAEDetRequest,
          ],
        },
      },
    });

    const { FECAESolicitarResult } = output;
    const detResponse = FECAESolicitarResult.FeDetResp?.FECAEDetResponse?.[0];

    // Log errors if present
    if (FECAESolicitarResult.Errors?.Err?.length && this.logger) {
      const errorMessages = FECAESolicitarResult.Errors.Err.map(
        (e) => `${e.Code}: ${e.Msg}`
      ).join(", ");
      this.logger.error(`Error creating voucher: ${errorMessages}`);
    }

    // Extract CAE only if voucher was approved (Resultado === "A")
    const cae = detResponse?.Resultado === "A" ? detResponse.CAE || "" : "";
    const caeFchVto =
      detResponse?.Resultado === "A" ? detResponse.CAEFchVto || "" : "";

    return {
      response: FECAESolicitarResult,
      cae,
      caeFchVto,
    };
  }

  async getVoucherInfo(
    number: number,
    salesPoint: number,
    type: number
  ): Promise<VoucherInfoResultDto | null> {
    const client = await this.getClient();

    try {
      const [output] = await client.FECompConsultarAsync({
        FeCompConsReq: {
          CbteNro: number,
          PtoVta: salesPoint,
          CbteTipo: type,
        },
      });

      const result = output.FECompConsultarResult.ResultGet;

      return {
        codAutorizacion: result.CodAutorizacion,
        emisionTipo: result.EmisionTipo,
        fchVto: result.FchVto,
        fchProceso: result.FchProceso,
        resultado: result.Resultado,
        observaciones: result.Observaciones?.Obs?.[0]?.Msg,
        concepto: result.Concepto,
        docTipo: result.DocTipo,
        docNro: result.DocNro,
        cbteDesde: result.CbteDesde,
        cbteHasta: result.CbteHasta,
        cbteFch: result.CbteFch,
        impTotal: result.ImpTotal,
        impTotConc: result.ImpTotConc,
        impNeto: result.ImpNeto,
        impOpEx: result.ImpOpEx,
        impIVA: result.ImpIVA,
        impTrib: result.ImpTrib,
        monId: result.MonId,
        monCotiz: result.MonCotiz,
        errors: output.FECompConsultarResult.Errors?.Err
          ? {
              err: output.FECompConsultarResult.Errors.Err.map((e) => ({
                code: e.Code,
                msg: e.Msg,
              })),
            }
          : undefined,
      };
    } catch (error: any) {
      // Error 602 means voucher not found
      if (error?.code === 602) {
        return null;
      }
      throw error;
    }
  }

  async getVoucherTypes(): Promise<VoucherTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposCbteAsync({});

    const result = output.FEParamGetTiposCbteResult;

    return {
      resultGet: result.ResultGet
        ? {
            cbteTipo:
              result.ResultGet.CbteTipo?.map((t) => ({
                id: t.Id,
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getConceptTypes(): Promise<ConceptTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposConceptoAsync({});

    const result = output.FEParamGetTiposConceptoResult;

    return {
      resultGet: result.ResultGet
        ? {
            conceptoTipo:
              result.ResultGet.ConceptoTipo?.map((t) => ({
                id: t.Id,
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getDocumentTypes(): Promise<DocumentTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposDocAsync({});

    const result = output.FEParamGetTiposDocResult;

    return {
      resultGet: result.ResultGet
        ? {
            docTipo:
              result.ResultGet.DocTipo?.map((t) => ({
                id: t.Id,
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getAliquotTypes(): Promise<AliquotTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposIvaAsync({});

    const result = output.FEParamGetTiposIvaResult;

    return {
      resultGet: result.ResultGet
        ? {
            ivaTipo:
              result.ResultGet.IvaTipo?.map((t) => ({
                id: parseInt(t.Id, 10),
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getCurrencyTypes(): Promise<CurrencyTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposMonedasAsync({});

    const result = output.FEParamGetTiposMonedasResult;

    return {
      resultGet: result.ResultGet
        ? {
            moneda:
              result.ResultGet.Moneda?.map((t) => ({
                id: t.Id,
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getOptionalTypes(): Promise<OptionalTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposOpcionalAsync({});

    const result = output.FEParamGetTiposOpcionalResult;

    return {
      resultGet: result.ResultGet
        ? {
            opcionalTipo:
              result.ResultGet.OpcionalTipo?.map((t) => ({
                id: t.Id,
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }

  async getTaxTypes(): Promise<TaxTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposTributosAsync({});

    const result = output.FEParamGetTiposTributosResult;

    return {
      resultGet: result.ResultGet
        ? {
            tributoTipo:
              result.ResultGet.TributoTipo?.map((t) => ({
                id: t.Id,
                desc: t.Desc,
                fchDesde: t.FchDesde,
                fchHasta: t.FchHasta,
              })) || [],
          }
        : undefined,
      errors: result.Errors?.Err
        ? {
            err: result.Errors.Err.map((e) => ({
              code: e.Code,
              msg: e.Msg,
            })),
          }
        : undefined,
    };
  }
}
