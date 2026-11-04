import { GetParameterCollectionUseCase } from "@application/use-cases/register/get-parameter-collection.use-case";
import { IRegisterScopeHundredRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ParameterCollectionDto } from "@application/dto/register";

describe("GetParameterCollectionUseCase", () => {
  it("delegates getParameterCollection to repository", async () => {
    const collection: ParameterCollectionDto = {
      name: "SUPA.E_PROVINCIA",
      parameters: [
        {
          id: "0",
          description: "CIUDAD AUTONOMA BUENOS AIRES",
          attributes: { COD_PROVINCIA: "0" },
        },
      ],
    };
    const repository: jest.Mocked<IRegisterScopeHundredRepositoryPort> = {
      getServerStatus: jest.fn(),
      getParameterCollection: jest.fn().mockResolvedValue(collection),
    };

    const useCase = new GetParameterCollectionUseCase(repository);
    const result = await useCase.execute("SUPA.E_PROVINCIA");

    expect(repository.getParameterCollection).toHaveBeenCalledWith(
      "SUPA.E_PROVINCIA",
    );
    expect(result).toEqual(collection);
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IRegisterScopeHundredRepositoryPort> = {
      getServerStatus: jest.fn(),
      getParameterCollection: jest.fn().mockRejectedValue(new Error("boom")),
    };

    const useCase = new GetParameterCollectionUseCase(repository);

    await expect(useCase.execute("SUPA.E_PROVINCIA")).rejects.toThrow("boom");
  });
});
