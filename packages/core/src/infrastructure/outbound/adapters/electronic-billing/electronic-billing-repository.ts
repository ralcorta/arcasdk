/**
 * Electronic Billing Repository
 * Implements IElectronicBillingRepositoryPort for AFIP/ARCA Electronic Billing
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { BaseSoapRepository } from "../soap/base-soap-repository";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/outbound/ports/soap/soap-repository.types";
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
  IvaReceptorTypesResultDto,
  CaeaResultDto,
  CaeaUsageResultDto,
  CaeaNoMovementResultDto,
  CountriesResultDto,
  ActivitiesResultDto,
  QuotationResultDto,
  MaxRecordsResultDto,
} from "@application/dto/electronic-billing.dto";
import {
  IServiceSoap12Soap,
  ServiceSoap12Types,
} from "@infrastructure/outbound/ports/soap/interfaces/Service/ServiceSoap12";
import {
  IServiceSoapSoap,
  ServiceSoapTypes,
} from "@infrastructure/outbound/ports/soap/interfaces/Service/ServiceSoap";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import {
  VoucherType,
  ConceptType,
  DocumentType,
  CurrencyType,
  OptionalType,
  TaxType,
} from "@domain/types/electronic-billing.types";
import {
  mapServerStatus,
  mapSalesPoints,
  mapLastVoucher,
  mapVoucherInfo,
  mapParameterTypes,
  mapAliquotTypes,
  mapIvaReceptorTypes,
  mapSoapErrors,
  mapCaea,
  mapCaeaUsage,
  mapCaeaNoMovement,
  mapCountries,
  mapActivities,
  mapQuotation,
  mapMaxRecords,
} from "@infrastructure/utils/soap-to-dto.mapper";

export class ElectronicBillingRepository
  extends BaseSoapRepository
  implements IElectronicBillingRepositoryPort
{
  private serviceClient?: IServiceSoapSoap | IServiceSoap12Soap;

  constructor(config: BaseSoapRepositoryConstructorConfig) {
    super(config);
  }

  /**
   * Get or create SOAP client with authentication proxy
   * Creates SOAP 1.1 or 1.2 client based on useSoap12 configuration
   */
  private async getClient(): Promise<IServiceSoapSoap | IServiceSoap12Soap> {
    if (this.serviceClient) {
      return this.serviceClient;
    }

    const wsdlName = this.production
      ? WsdlPathEnum.WSFE
      : WsdlPathEnum.WSFE_TEST;
    const endpoint = this.production
      ? EndpointsEnum.WSFEV1
      : EndpointsEnum.WSFEV1_TEST;

    let client: IServiceSoapSoap | IServiceSoap12Soap;
    let soapVersion: SoapServiceVersion;

    if (this.useSoap12) {
      client = await this.soapClient.createClient<IServiceSoap12Soap>(
        wsdlName,
        {
          forceSoap12Headers: true,
        }
      );
      soapVersion = SoapServiceVersion.ServiceSoap12;
    } else {
      client = await this.soapClient.createClient<IServiceSoapSoap>(wsdlName, {
        forceSoap12Headers: false,
      });
      soapVersion = SoapServiceVersion.ServiceSoap;
    }

    this.soapClient.setEndpoint(client, endpoint);

    this.serviceClient = this.createAuthenticatedProxy(client, {
      serviceName: ServiceNamesEnum.WSFE,
      injectAuthProperty: false,
      soapVersion,
    }) as IServiceSoapSoap | IServiceSoap12Soap;

    return this.serviceClient;
  }

  async getServerStatus(): Promise<ServerStatusDto> {
    const client = await this.getClient();
    const [output] = await client.FEDummyAsync({});
    return mapServerStatus(output.FEDummyResult);
  }

  async getSalesPoints(): Promise<SalesPointsResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetPtosVentaAsync({});
    const result = output.FEParamGetPtosVentaResult;
    return {
      resultGet: {
        ptoVenta: mapSalesPoints(result),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
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
      ...mapLastVoucher(result),
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async createVoucher(voucher: Voucher): Promise<ICreateVoucherResult> {
    const client = await this.getClient();
    const voucherData = voucher.toDTO();

    const detRequest = {
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
    };

    const typedDetRequest = this.useSoap12
      ? (detRequest as ServiceSoap12Types.IFECAEDetRequest)
      : (detRequest as ServiceSoapTypes.IFECAEDetRequest);

    const [output] = await client.FECAESolicitarAsync({
      FeCAEReq: {
        FeCabReq: {
          CantReg: voucherData.CbteHasta - voucherData.CbteDesde + 1,
          PtoVta: voucherData.PtoVta,
          CbteTipo: voucherData.CbteTipo,
        },
        FeDetReq: {
          FECAEDetRequest: [typedDetRequest],
        },
      },
    });

    const { FECAESolicitarResult } = output;
    const detResponse = FECAESolicitarResult.FeDetResp?.FECAEDetResponse?.[0];

    if (FECAESolicitarResult.Errors?.Err?.length && this.logger) {
      const errorMessages = FECAESolicitarResult.Errors.Err.map(
        (e) => `${e.Code}: ${e.Msg}`
      ).join(", ");
      this.logger.error(`Error creating voucher: ${errorMessages}`);
    }

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

      const result = output.FECompConsultarResult;
      const voucherInfo = mapVoucherInfo(result);
      if (!voucherInfo) {
        return null;
      }
      return {
        ...voucherInfo,
        errors: mapSoapErrors(result.Errors)
          ? { err: mapSoapErrors(result.Errors)! }
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
      resultGet: {
        cbteTipo: mapParameterTypes<VoucherType>(result, "CbteTipo"),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getConceptTypes(): Promise<ConceptTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposConceptoAsync({});
    const result = output.FEParamGetTiposConceptoResult;
    return {
      resultGet: {
        conceptoTipo: mapParameterTypes<ConceptType>(result, "ConceptoTipo"),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getDocumentTypes(): Promise<DocumentTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposDocAsync({});
    const result = output.FEParamGetTiposDocResult;
    return {
      resultGet: {
        docTipo: mapParameterTypes<DocumentType>(result, "DocTipo"),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getAliquotTypes(): Promise<AliquotTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposIvaAsync({});
    const result = output.FEParamGetTiposIvaResult;
    return {
      resultGet: {
        ivaTipo: mapAliquotTypes(result),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getCurrencyTypes(): Promise<CurrencyTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposMonedasAsync({});
    const result = output.FEParamGetTiposMonedasResult;
    return {
      resultGet: {
        moneda: mapParameterTypes<CurrencyType>(result, "Moneda"),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getOptionalTypes(): Promise<OptionalTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposOpcionalAsync({});
    const result = output.FEParamGetTiposOpcionalResult;
    return {
      resultGet: {
        opcionalTipo: mapParameterTypes<OptionalType>(result, "OpcionalTipo"),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getTaxTypes(): Promise<TaxTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposTributosAsync({});
    const result = output.FEParamGetTiposTributosResult;
    return {
      resultGet: {
        tributoTipo: mapParameterTypes<TaxType>(result, "TributoTipo"),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getIvaReceptorTypes(
    claseCmp?: string
  ): Promise<IvaReceptorTypesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetCondicionIvaReceptorAsync({
      ClaseCmp: claseCmp,
    });
    const result = output.FEParamGetCondicionIvaReceptorResult;
    return {
      resultGet: {
        condicionIvaReceptor: mapIvaReceptorTypes(result),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getCaea(period: number, order: number): Promise<CaeaResultDto> {
    const client = await this.getClient();
    const [output] = await client.FECAEASolicitarAsync({
      Periodo: period,
      Orden: order,
    });
    const result = output.FECAEASolicitarResult;
    return {
      resultGet: result.ResultGet ? mapCaea(result.ResultGet) : undefined,
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async consultCaea(period: number, order: number): Promise<CaeaResultDto> {
    const client = await this.getClient();
    const [output] = await client.FECAEAConsultarAsync({
      Periodo: period,
      Orden: order,
    });
    const result = output.FECAEAConsultarResult;
    return {
      resultGet: result.ResultGet ? mapCaea(result.ResultGet) : undefined,
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async informCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    const client = await this.getClient();
    const [output] = await client.FECAEASinMovimientoInformarAsync({
      CAEA: caea,
      PtoVta: salesPoint,
    });
    const result = output.FECAEASinMovimientoInformarResult;
    return {
      resultGet: result.ResultGet
        ? [
            {
              caea: result.ResultGet.CAEA,
              fchProceso: result.ResultGet.FchProceso,
              ptoVta: result.ResultGet.PtoVta,
            },
          ]
        : undefined,
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async consultCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    const client = await this.getClient();
    const [output] = await client.FECAEASinMovimientoConsultarAsync({
      CAEA: caea,
      PtoVta: salesPoint,
    });
    const result = output.FECAEASinMovimientoConsultarResult;
    return {
      resultGet: mapCaeaNoMovement(result),
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async informCaeaUsage(
    voucher: Voucher,
    caea: string
  ): Promise<CaeaUsageResultDto> {
    const client = await this.getClient();
    const voucherData = voucher.toDTO();

    const detRequest = {
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
      CAEA: caea,
      PeriodoAsoc: undefined as any,
      CbteFchHsGen: undefined as any,
    };

    const typedDetRequest = this.useSoap12
      ? (detRequest as ServiceSoap12Types.IFECAEADetRequest)
      : (detRequest as ServiceSoapTypes.IFECAEADetRequest);

    const [output] = await client.FECAEARegInformativoAsync({
      FeCAEARegInfReq: {
        FeCabReq: {
          CantReg: voucherData.CbteHasta - voucherData.CbteDesde + 1,
          PtoVta: voucherData.PtoVta,
          CbteTipo: voucherData.CbteTipo,
        },
        FeDetReq: {
          FECAEADetRequest: [typedDetRequest],
        },
      },
    });

    const result = output.FECAEARegInformativoResult;
    return {
      resultGet: result.FeDetResp?.FECAEADetResponse?.[0]
        ? mapCaeaUsage(result.FeDetResp.FECAEADetResponse[0] as any)
        : undefined,
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getQuotation(currencyId: string): Promise<QuotationResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetCotizacionAsync({
      MonId: currencyId,
    });
    const result = output.FEParamGetCotizacionResult;
    return {
      resultGet: mapQuotation(result),
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getCountries(): Promise<CountriesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposPaisesAsync({});
    const result = output.FEParamGetTiposPaisesResult;
    return {
      resultGet: {
        paisTipo: mapCountries(result),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getActivities(): Promise<ActivitiesResultDto> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetActividadesAsync({});
    const result = output.FEParamGetActividadesResult;
    return {
      resultGet: {
        actividadesTipo: mapActivities(result),
      },
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }

  async getMaxRecordsPerRequest(): Promise<MaxRecordsResultDto> {
    const client = await this.getClient();
    const [output] = await client.FECompTotXRequestAsync({});
    const result = output.FECompTotXRequestResult;
    return {
      resultGet: mapMaxRecords(result),
      errors: mapSoapErrors(result.Errors)
        ? { err: mapSoapErrors(result.Errors)! }
        : undefined,
    };
  }
}
