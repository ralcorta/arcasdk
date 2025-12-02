/**
 * Register Scope Ten Service
 * Application service for Register Scope Ten (Padrón A10)
 * Orchestrates register use cases for scope TEN
 */
import { IRegisterScopeTenRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";

export class RegisterScopeTenService {
  private readonly getRegisterServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;

  constructor(private readonly repository: IRegisterScopeTenRepositoryPort) {
    this.getRegisterServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.repository
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.repository
    );
  }

  /**
   * Asks to web service for servers status
   **/
  async getServerStatus(): Promise<RegisterServerStatusDto> {
    return this.getRegisterServerStatusUseCase.execute();
  }

  /**
   * Asks to web service for taxpayer details
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    return this.getTaxpayerDetailsUseCase.execute(identifier);
  }
}
