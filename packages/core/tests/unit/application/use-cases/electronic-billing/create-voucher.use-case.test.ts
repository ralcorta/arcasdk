import { CreateVoucherUseCase } from "@application/use-cases/electronic-billing/create-voucher.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IVoucher } from "@domain/types/voucher.types";

describe("CreateVoucherUseCase", () => {
  const validVoucherData: IVoucher = {
    CantReg: 1,
    PtoVta: 1,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 80,
    DocNro: 20111111112,
    CbteDesde: 100,
    CbteHasta: 100,
    CbteFch: "20240507",
    ImpTotal: 121,
    ImpTotConc: 0,
    ImpNeto: 100,
    ImpOpEx: 0,
    ImpTrib: 0,
    ImpIVA: 21,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: 1,
    FchServDesde: "20240507",
    FchServHasta: "20240507",
    FchVtoPago: "20240507",
    Iva: [{ Id: 5, BaseImp: 100, Importe: 21 }],
  };

  it("creates a voucher and returns repository result", async () => {
    const expected = {
      cae: "12345678901234",
      caeFchVto: "20240531",
      response: {},
    };
    const repository = {
      createVoucher: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new CreateVoucherUseCase(repository);
    const result = await useCase.execute(validVoucherData);

    expect(repository.createVoucher).toHaveBeenCalled();
    expect(result).toEqual(expected);
    expect(result.cae).toBe("12345678901234");
  });

  it("throws error for invalid voucher data", async () => {
    const invalidData = { ...validVoucherData, CbteDesde: 101, CbteHasta: 100 };
    const repository = {
      createVoucher: jest.fn(),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new CreateVoucherUseCase(repository);

    await expect(useCase.execute(invalidData)).rejects.toThrow(/CbteDesde/i);
  });

  it("propagates repository errors", async () => {
    const repository = {
      createVoucher: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new CreateVoucherUseCase(repository);

    await expect(useCase.execute(validVoucherData)).rejects.toThrow("boom");
  });
});
