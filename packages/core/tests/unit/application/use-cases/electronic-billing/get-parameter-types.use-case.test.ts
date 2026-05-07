import { GetParameterTypesUseCase } from "@application/use-cases/electronic-billing/get-parameter-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import {
  ConceptTypesResultDto,
  DocumentTypesResultDto,
  AliquotTypesResultDto,
  CurrencyTypesResultDto,
  OptionalTypesResultDto,
  TaxTypesResultDto,
} from "@application/dto/electronic-billing.dto";

describe("GetParameterTypesUseCase", () => {
  let useCase: GetParameterTypesUseCase;
  let mockRepository: jest.Mocked<IElectronicBillingRepositoryPort>;

  beforeEach(() => {
    mockRepository = {
      getConceptTypes: jest.fn(),
      getDocumentTypes: jest.fn(),
      getAliquotTypes: jest.fn(),
      getCurrencyTypes: jest.fn(),
      getOptionalTypes: jest.fn(),
      getTaxTypes: jest.fn(),
    } as never;

    useCase = new GetParameterTypesUseCase(mockRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getConceptTypes", () => {
    it("should delegate to repository and return concept types", async () => {
      const mockData: ConceptTypesResultDto = {
        resultGet: {
          conceptoTipo: [
            { id: 1, desc: "Productos", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: 2, desc: "Servicios", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
          ],
        },
      };
      mockRepository.getConceptTypes.mockResolvedValue(mockData);

      const result = await useCase.getConceptTypes();

      expect(result).toEqual(mockData);
      expect(mockRepository.getConceptTypes).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      mockRepository.getConceptTypes.mockRejectedValue(new Error("Repository error"));

      await expect(useCase.getConceptTypes()).rejects.toThrow("Repository error");
    });
  });

  describe("getDocumentTypes", () => {
    it("should delegate to repository and return document types", async () => {
      const mockData: DocumentTypesResultDto = {
        resultGet: {
          docTipo: [
            { id: 80, desc: "CUIT", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: 86, desc: "CUIL", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
          ],
        },
      };
      mockRepository.getDocumentTypes.mockResolvedValue(mockData);

      const result = await useCase.getDocumentTypes();

      expect(result).toEqual(mockData);
      expect(mockRepository.getDocumentTypes).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      mockRepository.getDocumentTypes.mockRejectedValue(new Error("Network error"));

      await expect(useCase.getDocumentTypes()).rejects.toThrow("Network error");
    });
  });

  describe("getAliquotTypes", () => {
    it("should delegate to repository and return aliquot types", async () => {
      const mockData: AliquotTypesResultDto = {
        resultGet: {
          ivaTipo: [
            { id: 3, desc: "0%", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: 4, desc: "10.5%", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: 5, desc: "21%", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
          ],
        },
      };
      mockRepository.getAliquotTypes.mockResolvedValue(mockData);

      const result = await useCase.getAliquotTypes();

      expect(result).toEqual(mockData);
      expect(mockRepository.getAliquotTypes).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      mockRepository.getAliquotTypes.mockRejectedValue(new Error("SOAP error"));

      await expect(useCase.getAliquotTypes()).rejects.toThrow("SOAP error");
    });
  });

  describe("getCurrencyTypes", () => {
    it("should delegate to repository and return currency types", async () => {
      const mockData: CurrencyTypesResultDto = {
        resultGet: {
          moneda: [
            { id: "PES", desc: "Pesos Argentinos", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: "DOL", desc: "Dólares Estadounidenses", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
          ],
        },
      };
      mockRepository.getCurrencyTypes.mockResolvedValue(mockData);

      const result = await useCase.getCurrencyTypes();

      expect(result).toEqual(mockData);
      expect(mockRepository.getCurrencyTypes).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      mockRepository.getCurrencyTypes.mockRejectedValue(new Error("Service unavailable"));

      await expect(useCase.getCurrencyTypes()).rejects.toThrow("Service unavailable");
    });
  });

  describe("getOptionalTypes", () => {
    it("should delegate to repository and return optional types", async () => {
      const mockData: OptionalTypesResultDto = {
        resultGet: {
          opcionalTipo: [
            { id: "1", desc: "Descripción", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: "2", desc: "Referencia de comprobante", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
          ],
        },
      };
      mockRepository.getOptionalTypes.mockResolvedValue(mockData);

      const result = await useCase.getOptionalTypes();

      expect(result).toEqual(mockData);
      expect(mockRepository.getOptionalTypes).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      mockRepository.getOptionalTypes.mockRejectedValue(new Error("Timeout"));

      await expect(useCase.getOptionalTypes()).rejects.toThrow("Timeout");
    });
  });

  describe("getTaxTypes", () => {
    it("should delegate to repository and return tax types", async () => {
      const mockData: TaxTypesResultDto = {
        resultGet: {
          tributoTipo: [
            { id: 1, desc: "Impuesto Municipal", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: 2, desc: "Impuesto Provincial", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
            { id: 3, desc: "Tasa de Seguridad e Higiene", fchDesde: "2020-01-01", fchHasta: "2099-12-31" },
          ],
        },
      };
      mockRepository.getTaxTypes.mockResolvedValue(mockData);

      const result = await useCase.getTaxTypes();

      expect(result).toEqual(mockData);
      expect(mockRepository.getTaxTypes).toHaveBeenCalledTimes(1);
    });

    it("should propagate repository errors", async () => {
      mockRepository.getTaxTypes.mockRejectedValue(new Error("Database error"));

      await expect(useCase.getTaxTypes()).rejects.toThrow("Database error");
    });
  });
});
