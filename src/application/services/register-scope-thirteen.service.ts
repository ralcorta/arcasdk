/**
 * Register Scope Thirteen Service
 * Application service for Register Scope Thirteen (Padrón A13)
 * Orchestrates register use cases for scope THIRTEEN
 */
import {
  IRegisterRepositoryPort,
  RegisterScope,
} from "@application/ports/register/register-repository.port";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import { GetTaxIDByDocumentUseCase } from "@application/use-cases/register/get-tax-id-by-document.use-case";
import {
  RegisterServerStatusResultDto,
  RegisterTaxpayerDetailsResultDto,
  RegisterTaxIDByDocumentResultDto,
} from "@application/dto/register.dto";

export class RegisterScopeThirteenService {
  private readonly getServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;
  private readonly getTaxIDByDocumentUseCase: GetTaxIDByDocumentUseCase;

  constructor(private readonly registerRepository: IRegisterRepositoryPort) {
    this.getServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.registerRepository
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.registerRepository
    );
    this.getTaxIDByDocumentUseCase = new GetTaxIDByDocumentUseCase(
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
      scope: RegisterScope.THIRTEEN,
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
      scope: RegisterScope.THIRTEEN,
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

  /**
   * Asks to web service for tax id by document number
   *
   * @return object|null if taxpayer does not exists, return null,
   * if it exists, returns idPersona property of response
   **/
  async getTaxIDByDocument(
    documentNumber: string
  ): Promise<RegisterTaxIDByDocumentResultDto> {
    const result = await this.getTaxIDByDocumentUseCase.execute({
      scope: RegisterScope.THIRTEEN,
      documentNumber,
    });

    return {
      idPersona: result.idPersona?.[0] || 0,
      metadata: {
        fechaHora: "",
        servidor: "",
      },
    };
  }
}
