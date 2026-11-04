import { IRegisterScopeHundredRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ParameterCollectionDto } from "@application/dto/register";

export class GetParameterCollectionUseCase {
  constructor(
    private readonly repository: IRegisterScopeHundredRepositoryPort,
  ) {}

  async execute(
    collectionName: string,
  ): Promise<ParameterCollectionDto | null> {
    return this.repository.getParameterCollection(collectionName);
  }
}
