import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  FexCreateVoucherResultDto,
  IFEXAuthorizeInput,
  IFexNextVoucher,
  ServiceSoapTypes,
} from "@application/dto/fex";

export class FexCreateNextVoucherUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(voucher: IFexNextVoucher): Promise<FexCreateVoucherResultDto> {
    // Sequential on purpose: concurrent first calls would race two WSAA logins
    const { FEXGetLast_IDResult } = await this.repository.getLastId({});
    assertNoFexError("FEXGetLast_ID", FEXGetLast_IDResult.FEXErr);

    const { FEXGetLast_CMPResult } = await this.repository.getLastCmp({
      Pto_venta: voucher.Punto_vta,
      Cbte_Tipo: voucher.Cbte_Tipo,
    });
    assertNoFexError("FEXGetLast_CMP", FEXGetLast_CMPResult.FEXErr);

    const { FEXAuthorizeResult } = await this.repository.authorize({
      // The generated type marks every WSDL field as required; ARCA accepts the minOccurs="0" ones omitted
      Cmp: {
        ...voucher,
        Id: (FEXGetLast_IDResult.FEXResultGet?.Id ?? 0) + 1,
        Cbte_nro: (FEXGetLast_CMPResult.FEXResult_LastCMP?.Cbte_nro ?? 0) + 1,
      } as IFEXAuthorizeInput["Cmp"],
    });

    const auth = FEXAuthorizeResult.FEXResultAuth;
    const approved = auth?.Resultado === "A";

    return {
      response: FEXAuthorizeResult,
      cae: approved ? auth.Cae || "" : "",
      caeFchVto: approved ? auth.Fch_venc_Cae || "" : "",
    };
  }
}

function assertNoFexError(
  operation: string,
  err: ServiceSoapTypes.IFEXErr | undefined,
): void {
  // WSFEX answers ErrCode 0 ("OK") on success
  if (err && err.ErrCode !== 0) {
    throw new Error(`WSFEX ${operation} error ${err.ErrCode}: ${err.ErrMsg}`);
  }
}
