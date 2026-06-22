import { RequestLoginUseCase } from "@application/use-cases/authentication/request-login.use-case";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

describe("RequestLoginUseCase", () => {
  it("delegates requestLogin to repository", async () => {
    const ticket = {} as AccessTicket;
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn(),
      requestLogin: jest.fn().mockResolvedValue(ticket),
      getAuthParams: jest.fn(),
    };

    const useCase = new RequestLoginUseCase(repository);
    const result = await useCase.execute(ArcaServiceNames.WSFE);

    expect(repository.requestLogin).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
    expect(result).toBe(ticket);
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn(),
      requestLogin: jest.fn().mockRejectedValue(new Error("boom")),
      getAuthParams: jest.fn(),
    };

    const useCase = new RequestLoginUseCase(repository);

    await expect(useCase.execute(ArcaServiceNames.WSFE)).rejects.toThrow("boom");
  });
});
