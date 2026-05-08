import { GetAuthParamsUseCase } from "@application/use-cases/authentication/get-auth-params.use-case";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

describe("GetAuthParamsUseCase", () => {
  it("delegates getAuthParams to repository", async () => {
    const ticket = {} as AccessTicket;
    const auth = { Auth: { Token: "t", Sign: "s", Cuit: 20111111112 } };
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn(),
      requestLogin: jest.fn(),
      getAuthParams: jest.fn().mockReturnValue(auth),
    };

    const useCase = new GetAuthParamsUseCase(repository);
    const result = await useCase.execute({ ticket, cuit: 20111111112 });

    expect(repository.getAuthParams).toHaveBeenCalledWith(ticket, 20111111112);
    expect(result).toEqual(auth);
  });

  it("propagates repository errors", async () => {
    const ticket = {} as AccessTicket;
    const repository: jest.Mocked<IAuthenticationRepositoryPort> = {
      login: jest.fn(),
      requestLogin: jest.fn(),
      getAuthParams: jest.fn().mockImplementation(() => {
        throw new Error("boom");
      }),
    };

    const useCase = new GetAuthParamsUseCase(repository);

    await expect(
      useCase.execute({ ticket, cuit: 20111111112 }),
    ).rejects.toThrow("boom");
  });
});
