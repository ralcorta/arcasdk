import { GetActivitiesUseCase } from "@application/use-cases/electronic-billing/get-activities.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetActivitiesUseCase", () => {
  it("returns repository activities", async () => {
    const expected = { resultGet: { actividadTipo: [{ id: 1, desc: "Act" }] } };
    const repository = {
      getActivities: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetActivitiesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getActivities).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getActivities: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetActivitiesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
