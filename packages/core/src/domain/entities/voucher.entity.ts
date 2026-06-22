import {
  IVoucher as IVoucherData,
  ICbtesAsoc,
  ITributo,
  IIva,
} from "../types/voucher.types";

export class Voucher {
  private constructor(private readonly data: IVoucherData) {
    this.validate();
  }

  static create(data: IVoucherData): Voucher {
    return new Voucher(data);
  }

  private validate(): void {
    if (!this.data.PtoVta || this.data.PtoVta <= 0) {
      throw new Error("Punto de venta inválido. Debe ser mayor a cero.");
    }

    if (!this.data.CbteTipo || this.data.CbteTipo <= 0) {
      throw new Error("Tipo de comprobante inválido. Debe ser mayor a cero.");
    }

    if (!this.data.CbteDesde || !this.data.CbteHasta) {
      throw new Error(
        "Números de comprobante inválidos. CbteDesde y CbteHasta son requeridos.",
      );
    }

    if (this.data.CbteDesde > this.data.CbteHasta) {
      throw new Error("CbteDesde no puede ser mayor que CbteHasta.");
    }

    if (this.data.CbteDesde < 0 || this.data.CbteHasta < 0) {
      throw new Error("Los números de comprobante no pueden ser negativos.");
    }

    const expectedCantReg = this.data.CbteHasta - this.data.CbteDesde + 1;
    if (this.data.CantReg !== expectedCantReg) {
      throw new Error(
        `CantReg (${this.data.CantReg}) debe ser igual a la cantidad de comprobantes (${expectedCantReg})`,
      );
    }

    if (this.isTypeC()) {
      this.validateFacturaC();
    }

    if (this.isTypeA() || this.isTypeB()) {
      this.validateFacturaWithIVA();
    }

    this.validateIVAConsistency();

    const calculatedTotal =
      this.data.ImpNeto + this.data.ImpTrib + this.data.ImpIVA;
    if (Math.abs(this.data.ImpTotal - calculatedTotal) > 0.01) {
      throw new Error(
        `El campo 'Importe Total' ImpTotal (${this.data.ImpTotal}), debe ser igual a la suma de ImpNeto (${this.data.ImpNeto}) + ImpTrib (${this.data.ImpTrib}) + ImpIVA (${this.data.ImpIVA}) = ${calculatedTotal}.`,
      );
    }

    if (
      !this.data.Concepto ||
      this.data.Concepto < 1 ||
      this.data.Concepto > 3
    ) {
      throw new Error(
        "Concepto inválido. Debe ser 1 (Productos), 2 (Servicios) o 3 (Productos y Servicios).",
      );
    }

    if (!this.data.DocTipo || this.data.DocTipo <= 0) {
      throw new Error("Tipo de documento inválido.");
    }

    if (!this.data.MonId || this.data.MonId.length === 0) {
      throw new Error("Moneda (MonId) es requerida.");
    }

    if (!this.data.MonCotiz || this.data.MonCotiz <= 0) {
      throw new Error("Cotización de moneda (MonCotiz) debe ser mayor a cero.");
    }
  }

  /**
   * Validates Factura C (Type C) specific rules
   * Type C vouchers are for exempt operations and must not include IVA
   * @throws Error if Type C rules are violated
   */
  private validateFacturaC(): void {
    if (this.data.ImpIVA !== 0) {
      throw new Error(
        "El campo ImpIVA (Importe de IVA) para comprobantes tipo C debe ser igual a cero (0).",
      );
    }

    if (this.data.Iva && this.data.Iva.length > 0) {
      throw new Error(
        "Para comprobantes tipo C el array Iva no debe informarse.",
      );
    }
  }

  /**
   * Validates Factura A/B specific rules
   * Type A/B vouchers must include IVA information when ImpIVA > 0
   * @throws Error if Type A/B rules are violated
   */
  private validateFacturaWithIVA(): void {
    if (
      this.data.ImpIVA > 0 &&
      (!this.data.Iva || this.data.Iva.length === 0)
    ) {
      const type = this.data.CbteTipo === 1 ? "A" : "B";
      throw new Error(
        `Para comprobantes tipo ${type}, si ImpIVA es mayor a 0, debe informarse el array Iva con el detalle de alícuotas.`,
      );
    }
  }

  /**
   * Validates that the IVA array totals match the ImpIVA field
   * @throws Error if IVA array totals don't match ImpIVA
   */
  private validateIVAConsistency(): void {
    if (this.data.Iva && this.data.Iva.length > 0) {
      const totalIVA = this.data.Iva.reduce((sum, iva) => sum + iva.Importe, 0);

      if (Math.abs(this.data.ImpIVA - totalIVA) > 0.01) {
        throw new Error(
          `El campo ImpIVA (${this.data.ImpIVA}) debe ser igual a la suma de los importes del array Iva (${totalIVA}).`,
        );
      }
    }
  }

  getPtoVta(): number {
    return this.data.PtoVta;
  }

  getCbteTipo(): number {
    return this.data.CbteTipo;
  }

  getCbteDesde(): number {
    return this.data.CbteDesde;
  }

  getCbteHasta(): number {
    return this.data.CbteHasta;
  }

  getImpTotal(): number {
    return this.data.ImpTotal;
  }

  getImpIVA(): number {
    return this.data.ImpIVA;
  }

  getImpNeto(): number {
    return this.data.ImpNeto;
  }

  getImpTrib(): number {
    return this.data.ImpTrib;
  }

  isTypeC(): boolean {
    return this.data.CbteTipo === 11;
  }

  isTypeA(): boolean {
    return this.data.CbteTipo === 1;
  }

  isTypeB(): boolean {
    return this.data.CbteTipo === 6;
  }

  getCbteFch(): string {
    return this.data.CbteFch;
  }

  getConcepto(): number {
    return this.data.Concepto;
  }

  getDocTipo(): number {
    return this.data.DocTipo;
  }

  getDocNro(): number {
    return this.data.DocNro;
  }

  getMonId(): string {
    return this.data.MonId;
  }

  getMonCotiz(): number {
    return this.data.MonCotiz;
  }

  getIva(): IIva[] | undefined {
    return this.data.Iva;
  }

  getTributos(): ITributo[] | undefined {
    return this.data.Tributos;
  }

  getCbtesAsoc(): ICbtesAsoc[] | undefined {
    return this.data.CbtesAsoc;
  }

  toDTO(): IVoucherData {
    return { ...this.data };
  }

  getCantReg(): number {
    return this.data.CantReg;
  }
}
