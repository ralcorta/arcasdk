import { IRegisterScopeHundredRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  ParameterCollectionDto,
  ServerStatus,
} from "@application/dto/register";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { GetParameterCollectionUseCase } from "@application/use-cases/register/get-parameter-collection.use-case";

export class RegisterScopeHundredService {
  private readonly getRegisterServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getParameterCollectionUseCase: GetParameterCollectionUseCase;

  constructor(
    private readonly repository: IRegisterScopeHundredRepositoryPort,
  ) {
    this.getRegisterServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.repository,
    );
    this.getParameterCollectionUseCase = new GetParameterCollectionUseCase(
      this.repository,
    );
  }

  async getServerStatus(): Promise<ServerStatus> {
    return this.getRegisterServerStatusUseCase.execute();
  }

  async getParameterCollection(
    collectionName: string,
  ): Promise<ParameterCollectionDto | null> {
    return this.getParameterCollectionUseCase.execute(collectionName);
  }
}
