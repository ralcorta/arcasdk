import { LoginUseCase } from "@application/use-cases/authentication/login.use-case";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
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
    const result = await useCase.execute("wsfe");

    expect(repository.login).toHaveBeenCalledWith("wsfe");
    expect(result).toBe(ticket);
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn().mockRejectedValue(new Error("boom")),
      requestLogin: jest.fn(),
      getAuthParams: jest.fn(),
    };

    const useCase = new LoginUseCase(repository);

    await expect(useCase.execute("wsfe")).rejects.toThrow("boom");
  });
});
