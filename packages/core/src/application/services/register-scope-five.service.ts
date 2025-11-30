/**
 * Register Scope Five Service
 * Application service for Register Scope Five (Padrón A5)
 * Orchestrates register use cases for scope FIVE
 */
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import { GetTaxpayersDetailsUseCase } from "@application/use-cases/register/get-taxpayers-details.use-case";
import {
  RegisterServerStatusResultDto,
  RegisterTaxpayerDetailsResultDto,
  RegisterTaxpayersListResultDto,
} from "@application/dto/register.dto";

export class RegisterScopeFiveService {
  private readonly getServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;
  private readonly getTaxpayersDetailsUseCase: GetTaxpayersDetailsUseCase;

  constructor(private readonly registerRepository: IRegisterRepositoryPort) {
    this.getServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.registerRepository
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.registerRepository
    );
    this.getTaxpayersDetailsUseCase = new GetTaxpayersDetailsUseCase(
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
      scope: RegisterScope.FIVE,
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
      scope: RegisterScope.FIVE,
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
      datosGenerales: result.datosGenerales,
      datosMonotributo: result.datosMonotributo,
      datosRegimenGeneral: result.datosRegimenGeneral,
      errorConstancia: result.errorConstancia,
      errorMonotributo: {},
      errorRegimenGeneral: {},
    };
  }

  /**
   * Asks to web service for taxpayers details
   *
   * @return [object] returns web service full response
   **/
  async getTaxpayersDetails(
    identifiers: number[]
  ): Promise<RegisterTaxpayersListResultDto> {
    const result = await this.getTaxpayersDetailsUseCase.execute({
      scope: RegisterScope.FIVE,
      identifiers,
    });

    return {
      metadata: {
        fechaHora: "",
        servidor: "",
      },
      persona: result.persona || [],
      cantidadRegistros: result.cantidadRegistros,
      errorConstancia: result.errorConstancia,
    };
  }
}
