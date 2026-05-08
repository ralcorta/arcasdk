import { GetLastVoucherUseCase } from "@application/use-cases/electronic-billing/get-last-voucher.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetLastVoucherUseCase", () => {
  it("returns repository last voucher with input parameters", async () => {
    const expected = { cbteNro: 100, cbteTipo: 1, ptoVta: 1 };
    const repository = {
      getLastVoucher: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetLastVoucherUseCase(repository);
    const input = { salesPoint: 1, voucherType: 1 };
    const result = await useCase.execute(input);

    expect(repository.getLastVoucher).toHaveBeenCalledWith(1, 1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getLastVoucher: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetLastVoucherUseCase(repository);
    const input = { salesPoint: 1, voucherType: 1 };

    await expect(useCase.execute(input)).rejects.toThrow("boom");
  });
});
