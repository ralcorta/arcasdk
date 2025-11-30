/**
 * Get Parameter Types Use Case
 * Retrieves various parameter types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import {
  ConceptTypesResultDto,
  DocumentTypesResultDto,
  AliquotTypesResultDto,
  CurrencyTypesResultDto,
  OptionalTypesResultDto,
  TaxTypesResultDto,
} from "@application/dto/electronic-billing.dto";

export class GetParameterTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Get concept types
   * @returns Concept types information
   */
  async getConceptTypes(): Promise<ConceptTypesResultDto> {
    return this.electronicBillingRepository.getConceptTypes();
  }

  /**
   * Get document types
   * @returns Document types information
   */
  async getDocumentTypes(): Promise<DocumentTypesResultDto> {
    return this.electronicBillingRepository.getDocumentTypes();
  }

  /**
   * Get aliquot types
   * @returns Aliquot types information
   */
  async getAliquotTypes(): Promise<AliquotTypesResultDto> {
    return this.electronicBillingRepository.getAliquotTypes();
  }

  /**
   * Get currency types
   * @returns Currency types information
   */
  async getCurrencyTypes(): Promise<CurrencyTypesResultDto> {
    return this.electronicBillingRepository.getCurrencyTypes();
  }

  /**
   * Get optional types
   * @returns Optional types information
   */
  async getOptionalTypes(): Promise<OptionalTypesResultDto> {
    return this.electronicBillingRepository.getOptionalTypes();
  }

  /**
   * Get tax types
   * @returns Tax types information
   */
  async getTaxTypes(): Promise<TaxTypesResultDto> {
    return this.electronicBillingRepository.getTaxTypes();
  }
}
