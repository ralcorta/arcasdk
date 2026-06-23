import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxpayerDetailsDto } from "@application/dto/register";

describe("GetTaxpayerDetailsUseCase", () => {
  it("delegates getTaxpayerDetails to repository", async () => {
    const details: TaxpayerDetailsDto = {
      idPersona: 20111111112,
      estadoClave: "AC",
      datosGenerales: {
        idPersona: 20111111112,
      },
    };
    const repository: jest.Mocked<IRegisterBaseRepositoryPort> = {
      getTaxpayerDetails: jest.fn().mockResolvedValue(details),
    } as any;

    const useCase = new GetTaxpayerDetailsUseCase(repository);
    const result = await useCase.execute(20111111112);

    expect(repository.getTaxpayerDetails).toHaveBeenCalledWith(20111111112);
    expect(result).toEqual(details);
  });

  it("returns null when taxpayer not found", async () => {
    const repository: jest.Mocked<IRegisterBaseRepositoryPort> = {
      getTaxpayerDetails: jest.fn().mockResolvedValue(null),
    } as any;

    const useCase = new GetTaxpayerDetailsUseCase(repository);
    const result = await useCase.execute(20111111112);

    expect(result).toBeNull();
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IRegisterBaseRepositoryPort> = {
      getTaxpayerDetails: jest.fn().mockRejectedValue(new Error("boom")),
    } as any;

    const useCase = new GetTaxpayerDetailsUseCase(repository);

    await expect(useCase.execute(20111111112)).rejects.toThrow("boom");
  });
});
