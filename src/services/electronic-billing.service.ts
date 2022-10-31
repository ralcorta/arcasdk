import { AfipService } from "./afip.service";
import { AfipContext } from "../afip-context";
import {
  IFECompUltimoAutorizadoOutput,
  IFEDummyOutput,
  IServiceSoapSoap,
} from "../soap/interfaces/Service/ServiceSoap";
import { EndpointsEnum } from "../endpoints.enum";
import { WsdlPathEnum } from "../soap/wsdl-path.enum";
import {
  ICreateVoucherResult,
  IGetSalesPointsResult,
  IVoucher,
} from "../interfaces";
import { ServiceNamesEnum } from "../soap/service-names.enum";

export class ElectronicBillingService extends AfipService<IServiceSoapSoap> {
  constructor(context: AfipContext) {
    super(context, {
      url: EndpointsEnum.WSFEV1,
      url_test: EndpointsEnum.WSFEV1_TEST,
      wsdl: WsdlPathEnum.WSFE,
      wsdl_test: WsdlPathEnum.WSFE_TEST,
      serviceName: ServiceNamesEnum.WSFE,
    });
  }

  /**
   * Asks to web service for servers status
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
  ): Promise<IFECompUltimoAutorizadoOutput> {
    const client = await this.getClient();
    const [output] = await client.FECompUltimoAutorizadoAsync({
      PtoVta: salesPoint,
      CbteTipo: type,
    });
    return output;
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

    return {
      response: output,
      cae: output.FECAESolicitarResult.FeDetResp.FECAEDetResponse[0].CAE,
      caeFchVto:
        output.FECAESolicitarResult.FeDetResp.FECAEDetResponse[0].CAEFchVto,
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
  async createNextVoucher(req: IVoucher) {
    const lastVoucher = await this.getLastVoucher(req.PtoVta, req.CbteTipo);

    const voucherNumber = lastVoucher.FECompUltimoAutorizadoResult.CbteNro + 1;

    req.CbteDesde = voucherNumber;
    req.CbteHasta = voucherNumber;

    return await this.createVoucher(req);
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
  async createNextInvoice(req: IVoucher) {
    return this.createNextVoucher(req);
  }
}
