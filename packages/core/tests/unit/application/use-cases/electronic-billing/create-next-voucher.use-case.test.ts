import { CreateNextVoucherUseCase } from "@application/use-cases/electronic-billing/create-next-voucher.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { INextVoucher } from "@domain/types/voucher.types";

describe("CreateNextVoucherUseCase", () => {
  const today = new Date().toISOString().split("T")[0].replace(/-/g, "");

  const baseInput = {
    CantReg: 1,
    PtoVta: 1,
    CbteTipo: 1,
    Concepto: 2,
    DocTipo: 99,
    DocNro: 0,
    CbteFch: today,
    ImpTotal: 100,
    ImpTotConc: 0,
    ImpNeto: 100,
    ImpOpEx: 0,
    ImpTrib: 0,
    ImpIVA: 0,
    MonId: "PES",
    MonCotiz: 1,
    CondicionIVAReceptorId: 1,
    FchServDesde: today,
    FchServHasta: today,
    FchVtoPago: today,
  } as INextVoucher;

  it("uses last voucher number + 1", async () => {
    const repository = {
      getLastVoucher: jest
        .fn()
        .mockResolvedValue({ cbteNro: 10, cbteTipo: 1, ptoVta: 1 }),
      createVoucher: jest
        .fn()
        .mockResolvedValue({ cae: "1", caeFchVto: "20240101", response: {} }),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new CreateNextVoucherUseCase(repository);
    await useCase.execute(baseInput);

    const voucher = (repository.createVoucher as jest.Mock).mock.calls[0][0];
    const dto = voucher.toDTO();
    expect(dto.CbteDesde).toBe(11);
    expect(dto.CbteHasta).toBe(11);
  });

  it("uses 1 when last voucher is missing", async () => {
    const repository = {
      getLastVoucher: jest
        .fn()
        .mockResolvedValue({ cbteNro: 0, cbteTipo: 1, ptoVta: 1 }),
      createVoucher: jest
        .fn()
        .mockResolvedValue({ cae: "1", caeFchVto: "20240101", response: {} }),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new CreateNextVoucherUseCase(repository);
    await useCase.execute(baseInput);

    const voucher = (repository.createVoucher as jest.Mock).mock.calls[0][0];
    const dto = voucher.toDTO();
    expect(dto.CbteDesde).toBe(1);
    expect(dto.CbteHasta).toBe(1);
  });
});
