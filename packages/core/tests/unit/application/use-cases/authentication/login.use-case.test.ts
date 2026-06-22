import { LoginUseCase } from "@application/use-cases/authentication/login.use-case";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

describe("LoginUseCase", () => {
  it("delegates login to repository", async () => {
    const ticket = {} as AccessTicket;
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn().mockResolvedValue(ticket),
      requestLogin: jest.fn(),
      getAuthParams: jest.fn(),
    };

    const useCase = new LoginUseCase(repository);
    const result = await useCase.execute(ArcaServiceNames.WSFE);

    expect(repository.login).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
    expect(result).toBe(ticket);
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn().mockRejectedValue(new Error("boom")),
      requestLogin: jest.fn(),
      getAuthParams: jest.fn(),
    };

    const useCase = new LoginUseCase(repository);

    await expect(useCase.execute(ArcaServiceNames.WSFE)).rejects.toThrow("boom");
  });
});
