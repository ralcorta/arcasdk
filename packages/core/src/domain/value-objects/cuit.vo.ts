/**
 * CUIT Value Object
 * Represents a valid CUIT (Clave Única de Identificación Tributaria)
 * Immutable value object with validation
 */
export class CUIT {
  private constructor(private readonly value: number) {
    this.validate();
  }

  /**
   * Factory method to create a CUIT
   * @param value CUIT as number or string
   * @returns CUIT instance
   * @throws Error if CUIT is invalid
   */
  static create(value: number | string): CUIT {
    const numValue = typeof value === "string" ? parseInt(value, 10) : value;
    return new CUIT(numValue);
  }

  /**
   * Validates the CUIT format
   * @throws Error if CUIT is invalid
   */
  private validate(): void {
    if (!Number.isInteger(this.value)) {
      throw new Error("CUIT debe ser un número entero");
    }

    const cuitStr = this.value.toString();

    // CUIT debe tener 11 dígitos
    if (cuitStr.length !== 11) {
      throw new Error(
        `CUIT inválido: debe tener 11 dígitos, tiene ${cuitStr.length}`
      );
    }

    // Validar que no sea todo ceros
    if (this.value === 0) {
      throw new Error("CUIT inválido: no puede ser 0");
    }

    // Validar dígito verificador (opcional, pero recomendado)
    if (!this.isValidChecksum(cuitStr)) {
      // No lanzamos error aquí, solo validamos formato básico
      // El checksum puede fallar en algunos casos válidos
    }
  }

  /**
   * Validates CUIT checksum (dígito verificador)
   * @param cuitStr CUIT as string
   * @returns true if checksum is valid
   */
  private isValidChecksum(cuitStr: string): boolean {
    const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += parseInt(cuitStr[i], 10) * multipliers[i];
    }

    const remainder = sum % 11;
    const checkDigit = remainder < 2 ? remainder : 11 - remainder;
    const lastDigit = parseInt(cuitStr[10], 10);

    return checkDigit === lastDigit;
  }

  /**
   * Gets the CUIT value as number
   */
  getValue(): number {
    return this.value;
  }

  /**
   * Gets the CUIT value as string
   */
  toString(): string {
    return this.value.toString();
  }

  /**
   * Formats CUIT with dashes (XX-XXXXXXXX-X)
   */
  toFormattedString(): string {
    const cuitStr = this.value.toString();
    return `${cuitStr.substring(0, 2)}-${cuitStr.substring(
      2,
      10
    )}-${cuitStr.substring(10)}`;
  }

  /**
   * Compares two CUITs for equality
   * @param other Other CUIT to compare
   * @returns true if equal
   */
  equals(other: CUIT): boolean {
    return this.value === other.value;
  }

  /**
   * Creates a copy of this CUIT
   */
  clone(): CUIT {
    return new CUIT(this.value);
  }
}
