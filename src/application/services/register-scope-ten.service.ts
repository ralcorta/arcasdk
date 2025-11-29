/**
 * Register Scope Ten Service
 * Application service for Register Scope Ten (Padrón A10)
 * Orchestrates register use cases for scope TEN
 */
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import {
  RegisterServerStatusResultDto,
  RegisterTaxpayerDetailsResultDto,
} from "@application/dto/register.dto";

export class RegisterScopeTenService {
  private readonly getServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;

  constructor(private readonly registerRepository: IRegisterRepositoryPort) {
    this.getServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.registerRepository
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.registerRepository
    );
  }

  /**
   * Asks to web service for servers status
   *
   * @return object { appserver : Web Service status,
   * dbserver : Database status, authserver : Autentication
   * server status}
   **/
  async getServerStatus(): Promise<RegisterServerStatusResultDto> {
    const status = await this.getServerStatusUseCase.execute({
      scope: RegisterScope.TEN,
    });
    return {
      appserver: status.appserver,
      dbserver: status.dbserver,
      authserver: status.authserver,
    };
  }

  /**
   * Asks to web service for taxpayer details
   *
   * @return object|null if taxpayer does not exists, return null,
   * if it exists, returns full response
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<RegisterTaxpayerDetailsResultDto | null> {
    const result = await this.getTaxpayerDetailsUseCase.execute({
      scope: RegisterScope.TEN,
      identifier,
    });

    if (!result) {
      return null;
    }

    return {
      metadata: {
        fechaHora: "",
        servidor: "",
      },
      persona: result,
    };
  }
}
