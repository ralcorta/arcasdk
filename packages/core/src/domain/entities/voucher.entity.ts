/**
 * Voucher Entity
 * Domain entity representing an electronic voucher/comprobante
 */
import {
  IVoucher as IVoucherData,
  ICbtesAsoc,
  IComprador,
  ITributo,
  IIva,
  IOpcional,
} from "../types/voucher.types";

/**
 * Voucher Entity
 * Represents an electronic voucher with business logic and validations
 */
export class Voucher {
  private constructor(private readonly data: IVoucherData) {
    this.validate();
  }

  /**
   * Factory method to create a Voucher
   * @param data Voucher data
   * @returns Voucher instance
   */
  static create(data: IVoucherData): Voucher {
    return new Voucher(data);
  }

  /**
   * Validates the voucher according to business rules
   * @throws Error if validation fails
   */
  private validate(): void {
    // Validate Punto de Venta
    if (!this.data.PtoVta || this.data.PtoVta <= 0) {
      throw new Error("Punto de venta inválido. Debe ser mayor a cero.");
    }

    // Validate Tipo de Comprobante
    if (!this.data.CbteTipo || this.data.CbteTipo <= 0) {
      throw new Error("Tipo de comprobante inválido. Debe ser mayor a cero.");
    }

    // Validate Números de Comprobante
    if (!this.data.CbteDesde || !this.data.CbteHasta) {
      throw new Error(
        "Números de comprobante inválidos. CbteDesde y CbteHasta son requeridos."
      );
    }

    if (this.data.CbteDesde > this.data.CbteHasta) {
      throw new Error("CbteDesde no puede ser mayor que CbteHasta.");
    }

    if (this.data.CbteDesde < 0 || this.data.CbteHasta < 0) {
      throw new Error("Los números de comprobante no pueden ser negativos.");
    }

    // Validate CantReg
    const expectedCantReg = this.data.CbteHasta - this.data.CbteDesde + 1;
    if (this.data.CantReg !== expectedCantReg) {
      throw new Error(
        `CantReg (${this.data.CantReg}) debe ser igual a la cantidad de comprobantes (${expectedCantReg})`
      );
    }

    // Validate Factura C (type 11) - No debe tener IVA
    if (this.isFacturaC()) {
      if (this.data.ImpIVA !== 0) {
        throw new Error(
          "El campo ImpIVA (Importe de IVA) para comprobantes tipo C debe ser igual a cero (0)."
        );
      }

      if (this.data.Iva && this.data.Iva.length > 0) {
        throw new Error(
          "Para comprobantes tipo C el objeto IVA no debe informarse."
        );
      }
    }

    // Validate Total Calculation
    const calculatedTotal =
      this.data.ImpNeto + this.data.ImpTrib + this.data.ImpIVA;
    if (Math.abs(this.data.ImpTotal - calculatedTotal) > 0.01) {
      throw new Error(
        `El campo 'Importe Total' ImpTotal (${this.data.ImpTotal}), debe ser igual a la suma de ImpNeto (${this.data.ImpNeto}) + ImpTrib (${this.data.ImpTrib}) + ImpIVA (${this.data.ImpIVA}) = ${calculatedTotal}.`
      );
    }

    // Validate Concepto
    if (
      !this.data.Concepto ||
      this.data.Concepto < 1 ||
      this.data.Concepto > 3
    ) {
      throw new Error(
        "Concepto inválido. Debe ser 1 (Productos), 2 (Servicios) o 3 (Productos y Servicios)."
      );
    }

    // Validate Document Type
    if (!this.data.DocTipo || this.data.DocTipo <= 0) {
      throw new Error("Tipo de documento inválido.");
    }

    // Validate Currency
    if (!this.data.MonId || this.data.MonId.length === 0) {
      throw new Error("Moneda (MonId) es requerida.");
    }

    if (!this.data.MonCotiz || this.data.MonCotiz <= 0) {
      throw new Error("Cotización de moneda (MonCotiz) debe ser mayor a cero.");
    }
  }

  /**
   * Gets the Punto de Venta
   */
  getPtoVta(): number {
    return this.data.PtoVta;
  }

  /**
   * Gets the Tipo de Comprobante
   */
  getCbteTipo(): number {
    return this.data.CbteTipo;
  }

  /**
   * Gets the CbteDesde
   */
  getCbteDesde(): number {
    return this.data.CbteDesde;
  }

  /**
   * Gets the CbteHasta
   */
  getCbteHasta(): number {
    return this.data.CbteHasta;
  }

  /**
   * Gets the total amount
   */
  getImpTotal(): number {
    return this.data.ImpTotal;
  }

  /**
   * Gets the IVA amount
   */
  getImpIVA(): number {
    return this.data.ImpIVA;
  }

  /**
   * Gets the net amount
   */
  getImpNeto(): number {
    return this.data.ImpNeto;
  }

  /**
   * Gets the taxes amount
   */
  getImpTrib(): number {
    return this.data.ImpTrib;
  }

  /**
   * Checks if this is a Factura C (type 11)
   */
  isFacturaC(): boolean {
    return this.data.CbteTipo === 11;
  }

  /**
   * Checks if this is a Factura A (type 1)
   */
  isFacturaA(): boolean {
    return this.data.CbteTipo === 1;
  }

  /**
   * Checks if this is a Factura B (type 6)
   */
  isFacturaB(): boolean {
    return this.data.CbteTipo === 6;
  }

  /**
   * Gets the voucher date
   */
  getCbteFch(): string {
    return this.data.CbteFch;
  }

  /**
   * Gets the concept type
   */
  getConcepto(): number {
    return this.data.Concepto;
  }

  /**
   * Gets the document type
   */
  getDocTipo(): number {
    return this.data.DocTipo;
  }

  /**
   * Gets the document number
   */
  getDocNro(): number {
    return this.data.DocNro;
  }

  /**
   * Gets the currency ID
   */
  getMonId(): string {
    return this.data.MonId;
  }

  /**
   * Gets the currency exchange rate
   */
  getMonCotiz(): number {
    return this.data.MonCotiz;
  }

  /**
   * Gets the IVA array (if any)
   */
  getIva(): IIva[] | undefined {
    return this.data.Iva;
  }

  /**
   * Gets the Tributos array (if any)
   */
  getTributos(): ITributo[] | undefined {
    return this.data.Tributos;
  }

  /**
   * Gets the associated vouchers (if any)
   */
  getCbtesAsoc(): ICbtesAsoc[] | undefined {
    return this.data.CbtesAsoc;
  }

  /**
   * Converts the entity to DTO for external use
   * @returns IVoucherData DTO
   */
  toDTO(): IVoucherData {
    return { ...this.data };
  }

  /**
   * Gets the number of vouchers in this range
   */
  getCantReg(): number {
    return this.data.CantReg;
  }
}
