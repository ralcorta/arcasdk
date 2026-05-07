import { InformCaeaUsageUseCase } from "@application/use-cases/electronic-billing/inform-caea-usage.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IVoucher } from "@domain/types/voucher.types";

describe("InformCaeaUsageUseCase", () => {
  const validVoucherData: IVoucher = {
    CantReg: 1,
    PtoVta: 1,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 80,
    DocNro: 20111111112,
    CbteDesde: 1,
    CbteHasta: 1,
    CbteFch: "20240507",
    ImpTotal: 100,
    ImpTotConc: 0,
    ImpNeto: 100,
    ImpOpEx: 0,
    ImpIVA: 0,
    ImpTrib: 0,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: 1,
    FchServDesde: "20240507",
    FchServHasta: "20240507",
    FchVtoPago: "20240507",
  };

  it("returns repository inform CAEA usage result", async () => {
    const expected = { resultGet: { result: "A" } };
    const repository = {
      informCaeaUsage: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new InformCaeaUsageUseCase(repository);
    const caea = "12345678901234";
    const result = await useCase.execute(validVoucherData, caea);

    expect(repository.informCaeaUsage).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      informCaeaUsage: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new InformCaeaUsageUseCase(repository);

    await expect(
      useCase.execute(validVoucherData, "12345678901234"),
    ).rejects.toThrow("boom");
  });
});
