/**
 * VoucherNumber Value Object
 * Represents a voucher/comprobante number with validations
 * Immutable value object
 */
export class VoucherNumber {
  private constructor(private readonly value: number) {
    this.validate();
  }

  /**
   * Factory method to create a VoucherNumber
   * @param value Voucher number
   * @returns VoucherNumber instance
   * @throws Error if number is invalid
   */
  static create(value: number): VoucherNumber {
    return new VoucherNumber(value);
  }

  /**
   * Validates the voucher number
   * @throws Error if number is invalid
   */
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

  /**
   * Gets the voucher number value
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Gets the voucher number as string
   */
  toString(): string {
    return this.value.toString();
  }

  /**
   * Formats voucher number with leading zeros (8 digits)
   */
  toFormattedString(): string {
    return this.value.toString().padStart(8, "0");
  }

  /**
   * Compares two voucher numbers for equality
   * @param other Other VoucherNumber to compare
   * @returns true if equal
   */
  equals(other: VoucherNumber): boolean {
    return this.value === other.value;
  }

  /**
   * Checks if this number is greater than another
   * @param other Other VoucherNumber to compare
   * @returns true if this is greater
   */
  isGreaterThan(other: VoucherNumber): boolean {
    return this.value > other.value;
  }

  /**
   * Checks if this number is less than another
   * @param other Other VoucherNumber to compare
   * @returns true if this is less
   */
  isLessThan(other: VoucherNumber): boolean {
    return this.value < other.value;
  }

  /**
   * Gets the next voucher number
   * @returns Next VoucherNumber
   */
  next(): VoucherNumber {
    return VoucherNumber.create(this.value + 1);
  }

  /**
   * Gets the previous voucher number
   * @returns Previous VoucherNumber
   * @throws Error if value is 1 (can't go below 1)
   */
  previous(): VoucherNumber {
    if (this.value <= 1) {
      throw new Error(
        "No se puede obtener el número anterior, ya está en el mínimo"
      );
    }
    return VoucherNumber.create(this.value - 1);
  }

  /**
   * Creates a copy of this VoucherNumber
   */
  clone(): VoucherNumber {
    return new VoucherNumber(this.value);
  }
}
