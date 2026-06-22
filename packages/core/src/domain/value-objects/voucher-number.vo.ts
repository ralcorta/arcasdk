export class VoucherNumber {
  private constructor(private readonly value: number) {
    this.validate();
  }

  
  static create(value: number): VoucherNumber {
    return new VoucherNumber(value);
  }

  
  private validate(): void {
    if (!Number.isInteger(this.value)) {
      throw new Error("Número de comprobante debe ser un número entero");
    }

    if (this.value < 1) {
      throw new Error("Número de comprobante debe ser mayor a cero");
    }

    if (this.value > 99999999) {
      throw new Error("Número de comprobante no puede ser mayor a 99999999");
    }
  }

  
  getValue(): number {
    return this.value;
  }

  
  toString(): string {
    return this.value.toString();
  }

  
  toFormattedString(): string {
    return this.value.toString().padStart(8, "0");
  }

  
  equals(other: VoucherNumber): boolean {
    return this.value === other.value;
  }

  
  isGreaterThan(other: VoucherNumber): boolean {
    return this.value > other.value;
  }

  
  isLessThan(other: VoucherNumber): boolean {
    return this.value < other.value;
  }

  
  next(): VoucherNumber {
    return VoucherNumber.create(this.value + 1);
  }

  
  previous(): VoucherNumber {
    if (this.value <= 1) {
      throw new Error(
        "No se puede obtener el número anterior, ya está en el mínimo",
      );
    }
    return VoucherNumber.create(this.value - 1);
  }

  
  clone(): VoucherNumber {
    return new VoucherNumber(this.value);
  }
}
