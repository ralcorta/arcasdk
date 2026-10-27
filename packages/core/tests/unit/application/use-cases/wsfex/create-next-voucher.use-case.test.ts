import { FexCreateNextVoucherUseCase } from "@application/use-cases/wsfex/create-next-voucher.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import { IFexNextVoucher } from "@application/dto/fex";
import { CurrencyIds, ExportVoucherTypes } from "@domain/types/voucher.types";

describe("FexCreateNextVoucherUseCase", () => {
  const ok = { ErrCode: 0, ErrMsg: "OK" };
  const voucher: IFexNextVoucher = {
    Cbte_Tipo: ExportVoucherTypes.FACTURA_E,
    Punto_vta: 3,
    Tipo_expo: 2,
    Dst_cmp: 212,
    Cliente: "Acme Inc.",
    Cuit_pais_cliente: 55000002206,
    Domicilio_cliente: "1 Main St, Miami, FL",
    Moneda_Id: CurrencyIds.EUR,
    Moneda_ctz: 1250.5,
    Imp_total: 1000,
    Idioma_cbte: 1,
    Fecha_pago: "20261130",
    Items: {
      Item: [
        {
          Pro_codigo: "SRV-1",
          Pro_ds: "Desarrollo de software",
          Pro_qty: 1,
          Pro_umed: 7,
          Pro_precio_uni: 1000,
          Pro_bonificacion: 0,
          Pro_total_item: 1000,
        },
      ],
    },
    Actividades: { Actividad: [{ Id: 620100 }] },
  };

  function buildRepository(
    overrides: Partial<Record<keyof IFexRepositoryPort, jest.Mock>> = {},
  ) {
    return {
      getLastId: jest.fn().mockResolvedValue({
        FEXGetLast_IDResult: { FEXResultGet: { Id: 41 }, FEXErr: ok },
      }),
      getLastCmp: jest.fn().mockResolvedValue({
        FEXGetLast_CMPResult: {
          FEXResult_LastCMP: { Cbte_nro: 9, Cbte_fecha: "20261020" },
          FEXErr: ok,
        },
      }),
      authorize: jest.fn().mockResolvedValue({
        FEXAuthorizeResult: {
          FEXResultAuth: {
            Resultado: "A",
            Cae: "76123456789012",
            Fch_venc_Cae: "20261106",
          },
          FEXErr: ok,
        },
      }),
      ...overrides,
    } as unknown as jest.Mocked<IFexRepositoryPort>;
  }

  it("authorizes the voucher with the next request id and number", async () => {
    const repository = buildRepository();

    const result = await new FexCreateNextVoucherUseCase(repository).execute(
      voucher,
    );

    expect(repository.getLastCmp).toHaveBeenCalledWith({
      Pto_venta: 3,
      Cbte_Tipo: 19,
    });
    expect(repository.authorize).toHaveBeenCalledWith({
      Cmp: { ...voucher, Id: 42, Cbte_nro: 10 },
    });
    expect(result).toEqual({
      response: expect.objectContaining({ FEXErr: ok }),
      cae: "76123456789012",
      caeFchVto: "20261106",
    });
  });

  it("numbers the first voucher of a sales point as 1", async () => {
    const repository = buildRepository({
      getLastCmp: jest.fn().mockResolvedValue({
        FEXGetLast_CMPResult: {
          FEXResult_LastCMP: { Cbte_nro: 0 },
          FEXErr: ok,
        },
      }),
    });

    await new FexCreateNextVoucherUseCase(repository).execute(voucher);

    expect(repository.authorize).toHaveBeenCalledWith({
      Cmp: expect.objectContaining({ Cbte_nro: 1 }),
    });
  });

  it("returns an empty CAE when ARCA rejects the voucher", async () => {
    const rejected = {
      FEXResultAuth: { Resultado: "R", Cae: "", Fch_venc_Cae: "" },
      FEXErr: { ErrCode: 1561, ErrMsg: "Moneda_ctz invalida" },
    };
    const repository = buildRepository({
      authorize: jest
        .fn()
        .mockResolvedValue({ FEXAuthorizeResult: rejected }),
    });

    const result = await new FexCreateNextVoucherUseCase(repository).execute(
      voucher,
    );

    expect(result).toEqual({ response: rejected, cae: "", caeFchVto: "" });
  });

  it("does not authorize when the last voucher number cannot be read", async () => {
    const repository = buildRepository({
      getLastCmp: jest.fn().mockResolvedValue({
        FEXGetLast_CMPResult: {
          FEXErr: { ErrCode: 1000, ErrMsg: "Punto de venta inexistente" },
        },
      }),
    });

    await expect(
      new FexCreateNextVoucherUseCase(repository).execute(voucher),
    ).rejects.toThrow(
      "WSFEX FEXGetLast_CMP error 1000: Punto de venta inexistente",
    );
    expect(repository.authorize).not.toHaveBeenCalled();
  });

  it("does not authorize when the last request id cannot be read", async () => {
    const repository = buildRepository({
      getLastId: jest.fn().mockResolvedValue({
        FEXGetLast_IDResult: {
          FEXErr: { ErrCode: 500, ErrMsg: "Error interno" },
        },
      }),
    });

    await expect(
      new FexCreateNextVoucherUseCase(repository).execute(voucher),
    ).rejects.toThrow("WSFEX FEXGetLast_ID error 500: Error interno");
    expect(repository.authorize).not.toHaveBeenCalled();
  });
});
