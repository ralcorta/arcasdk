import { GetTaxpayersDetailsUseCase } from "@application/use-cases/register/get-taxpayers-details.use-case";
import { IRegisterBatchRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxpayersDetailsDto } from "@application/dto/register";

describe("GetTaxpayersDetailsUseCase", () => {
  it("delegates getTaxpayersDetails to repository with array", async () => {
    const details: TaxpayersDetailsDto = {
      persona: [
        {
          idPersona: 20111111112,
          estadoClave: "AC",
          datosGenerales: { idPersona: 20111111112 },
        },
        {
          idPersona: 20222222223,
          estadoClave: "AC",
          datosGenerales: { idPersona: 20222222223 },
        },
      ],
    };
    const repository: jest.Mocked<IRegisterBatchRepositoryPort> = {
      getTaxpayersDetails: jest.fn().mockResolvedValue(details),
    } as any;

    const useCase = new GetTaxpayersDetailsUseCase(repository);
    const identifiers = [20111111112, 20222222223];
    const result = await useCase.execute(identifiers);

    expect(repository.getTaxpayersDetails).toHaveBeenCalledWith(identifiers);
    expect(result).toEqual(details);
  });

  it("returns empty persona array when no taxpayers found", async () => {
    const details: TaxpayersDetailsDto = { persona: [] };
    const repository: jest.Mocked<IRegisterBatchRepositoryPort> = {
      getTaxpayersDetails: jest.fn().mockResolvedValue(details),
    } as any;

    const useCase = new GetTaxpayersDetailsUseCase(repository);
    const result = await useCase.execute([20111111112]);

    expect(result.persona).toEqual([]);
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IRegisterBatchRepositoryPort> = {
      getTaxpayersDetails: jest.fn().mockRejectedValue(new Error("boom")),
    } as any;

    const useCase = new GetTaxpayersDetailsUseCase(repository);

    await expect(useCase.execute([20111111112])).rejects.toThrow("boom");
  });
});
