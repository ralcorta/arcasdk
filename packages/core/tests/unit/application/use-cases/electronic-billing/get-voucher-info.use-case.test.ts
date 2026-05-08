import { GetVoucherInfoUseCase } from "@application/use-cases/electronic-billing/get-voucher-info.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetVoucherInfoUseCase", () => {
  it("returns repository voucher info with input parameters", async () => {
    const expected = { cbteNro: 100, cbteTipo: 1, ptoVta: 1, result: "A" };
    const repository = {
      getVoucherInfo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetVoucherInfoUseCase(repository);
    const input = { number: 100, salesPoint: 1, type: 1 };
    const result = await useCase.execute(input);

    expect(repository.getVoucherInfo).toHaveBeenCalledWith(100, 1, 1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getVoucherInfo: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetVoucherInfoUseCase(repository);
    const input = { number: 100, salesPoint: 1, type: 1 };

    await expect(useCase.execute(input)).rejects.toThrow("boom");
  });
});
