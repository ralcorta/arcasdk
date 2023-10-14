import { AfipService } from "./afip.service";
import {
  IFEDummyOutput,
  IServiceSoap12Soap,
  ServiceSoap12Types,
} from "../soap/interfaces/Service/ServiceSoap12";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import { ServiceNamesEnum } from "../soap/service-names.enum";
import {
  Context,
  IGetSalesPointsResult,
  IVoucher,
  ICreateVoucherResult,
  INextVoucher,
} from "../types";
import { EndpointsEnum } from "../enums";

export class ElectronicBillingService extends AfipService<IServiceSoap12Soap> {
  constructor(context: Context) {
    super(context, {
      url: EndpointsEnum.WSFEV1,
      url_test: EndpointsEnum.WSFEV1_TEST,
      wsdl: WsdlPathEnum.WSFE,
      wsdl_test: WsdlPathEnum.WSFE_TEST,
      serviceName: ServiceNamesEnum.WSFE,
      v12: true,
    });
  }

  /**
   * Asks to web service for servers status
   *
   * @return object { AppServer : Web Service status,
   * DbServer : Database status, AuthServer : Autentication
   * server status}
   **/
  async getServerStatus(): Promise<IFEDummyOutput> {
    const client = await this.getClient();
    const [output] = await client.FEDummyAsync({});
    return output;
  }

  /**
   * Asks to AFIP Servers for sales points availables {@see WS
   * Specification item 4.11}
   *
   * @return array All sales points availables
   **/
  public async getSalesPoints(): Promise<IGetSalesPointsResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetPtosVentaAsync({});
    return output;
  }

  /**
   * Asks to Afip servers for number of the last voucher created for
   * certain sales point and voucher type
   *
   * @param salesPoint Sales point to ask for last voucher
   * @param type Voucher type to ask for last voucher
   * @returns
   */
  async getLastVoucher(
    salesPoint: number,
    type: number
  ): Promise<ServiceSoap12Types.IFECompUltimoAutorizadoResult> {
    const client = await this.getClient();
    const [output] = await client.FECompUltimoAutorizadoAsync({
      PtoVta: salesPoint,
      CbteTipo: type,
    });
    return output.FECompUltimoAutorizadoResult;
  }

  /**
   * Create a voucher from AFIP
   *
   * Send to AFIP servers request for create a voucher and assign
   * CAE to them
   *
   * @param req data Voucher parameter
   **/
  public async createVoucher(req: IVoucher): Promise<ICreateVoucherResult> {
    const client = await this.getClient();
    const [output] = await client.FECAESolicitarAsync({
      FeCAEReq: {
        FeCabReq: {
          CantReg: req.CbteHasta - req.CbteDesde + 1,
          PtoVta: req.PtoVta,
          CbteTipo: req.CbteTipo,
        },
        FeDetReq: {
          FECAEDetRequest: [
            {
              ...req,
              Tributos: req.Tributos ? { Tributo: req.Tributos } : undefined,
              Iva: req.Iva ? { AlicIva: req.Iva } : undefined,
              CbtesAsoc: req.CbtesAsoc
                ? { CbteAsoc: req.CbtesAsoc }
                : undefined,
              Compradores: req.Compradores
                ? { Comprador: req.Compradores }
                : undefined,
              Opcionales: req.Opcionales
                ? { Opcional: req.Opcionales }
                : undefined,
            },
          ],
        },
      },
    });

    const { FECAESolicitarResult } = output;

    return {
      response: FECAESolicitarResult,
      cae: FECAESolicitarResult.FeDetResp?.FECAEDetResponse?.[0]?.CAE,
      caeFchVto:
        FECAESolicitarResult.FeDetResp?.FECAEDetResponse?.[0]?.CAEFchVto,
    };
  }

  /**
   * Create next voucher from AFIP
   *
   * This method combines getLastVoucher and createVoucher
   * for create the next voucher
   *
   * @param req data Same to data in Afip.createVoucher except that
   * 	don't need CbteDesde and CbteHasta attributes
   **/
  async createNextVoucher(req: INextVoucher): Promise<ICreateVoucherResult> {
    const lastVoucher = await this.getLastVoucher(req.PtoVta, req.CbteTipo);
    const nextVoucherNumber = lastVoucher.CbteNro + 1;
    const nextVoucherPayload: IVoucher = {
      ...req,
      CbteDesde: nextVoucherNumber,
      CbteHasta: nextVoucherNumber,
    };
    return await this.createVoucher(nextVoucherPayload);
  }

  /**
   * Get voucher information
   *
   * Asks to AFIP servers for complete information of voucher
   *
   * @param number 		Number of voucher to get information
   * @param salesPoint 	Sales point of voucher to get information
   * @param type 			Type of voucher to get information
   *
   * @return data with array | null returns array with complete voucher information
   **/
  async getVoucherInfo(
    number: number,
    salesPoint: number,
    type: number
  ): Promise<ServiceSoap12Types.IFECompConsultarResult | null> {
    const client = await this.getClient();
    const req = {
      FeCompConsReq: {
        CbteNro: number,
        PtoVta: salesPoint,
        CbteTipo: type,
      },
    };

    try {
      const [output] = await client.FECompConsultarAsync(req);
      return output.FECompConsultarResult;
    } catch (error) {
      const err = error as any; // They send a custom error and we need to parse it
      if (err?.code === 602) return null;
      throw error;
    }
  }

  /**
   * Asks to AFIP Servers for voucher types availables
   **/
  async getVoucherTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposCbteResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposCbteAsync({});
    return output.FEParamGetTiposCbteResult;
  }

  /**
   * Asks to AFIP Servers for voucher concepts availables
   *
   * @return data with array of all voucher concepts availables
   **/
  async getConceptTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposConceptoResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposConceptoAsync({});
    return output.FEParamGetTiposConceptoResult;
  }

  /**
   * Asks to AFIP Servers for document types availables
   *
   * @return data with array of all document types availables
   **/
  async getDocumentTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposDocResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposDocAsync({});
    return output.FEParamGetTiposDocResult;
  }

  /**
   * Asks to AFIP Servers for aliquot availables
   *
   * @return data with array of all aliquot availables
   **/
  async getAliquotTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposIvaResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposIvaAsync({});
    return output.FEParamGetTiposIvaResult;
  }

  /**
   * Asks to AFIP Servers for currencies availables
   *
   * @return data with array of all currencies availables
   **/
  async getCurrenciesTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposMonedasResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposMonedasAsync({});
    return output.FEParamGetTiposMonedasResult;
  }

  /**
   * Asks to AFIP Servers for voucher optional data available
   *
   * @return data with array of all voucher optional data available
   **/
  async getOptionsTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposOpcionalResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposOpcionalAsync({});
    return output.FEParamGetTiposOpcionalResult;
  }

  /**
   * Asks to AFIP Servers for tax availables
   *
   * @return data with array of all tax availables
   **/
  async getTaxTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposTributosResult> {
    const client = await this.getClient();
    const [output] = await client.FEParamGetTiposTributosAsync({});
    return output.FEParamGetTiposTributosResult;
  }

  /**
   * Alias for createVoucher method.
   */
  async createInvoice(req: IVoucher) {
    return this.createVoucher(req);
  }

  /**
   * Alias for createVoucher method.
   */
  async createNextInvoice(req: INextVoucher) {
    return this.createNextVoucher(req);
  }
}
