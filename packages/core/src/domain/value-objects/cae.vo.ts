/**
 * CAE Value Object
 * Represents a CAE (Código de Autorización Electrónico)
 * Immutable value object with validation
 */
export class CAE {
  private constructor(private readonly value: string) {
    this.validate();
  }

  /**
   * Factory method to create a CAE
   * @param value CAE as string
   * @returns CAE instance
   * @throws Error if CAE is invalid
   */
  static create(value: string): CAE {
    return new CAE(value);
  }

  /**
   * Validates the CAE format
   * @throws Error if CAE is invalid
   */
  private validate(): void {
    if (!this.value || typeof this.value !== "string") {
      throw new Error("CAE debe ser una cadena de texto");
    }

    // CAE debe tener exactamente 14 dígitos
    if (!/^\d{14}$/.test(this.value)) {
      throw new Error(
        `CAE inválido: debe tener 14 dígitos, tiene "${this.value}"`
      );
    }

    // Validar que no sea todo ceros
    if (this.value === "00000000000000") {
      throw new Error("CAE inválido: no puede ser todo ceros");
    }
  }

  /**
   * Gets the CAE value as string
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Gets the CAE value as string (alias for getValue)
   */
  toString(): string {
    return this.value;
  }

  /**
   * Formats CAE with dashes (XXXX-XXXX-XXXX-XX)
   */
  toFormattedString(): string {
    return `${this.value.substring(0, 4)}-${this.value.substring(
      4,
      8
    )}-${this.value.substring(8, 12)}-${this.value.substring(12)}`;
  }

  /**
   * Compares two CAEs for equality
   * @param other Other CAE to compare
   * @returns true if equal
   */
  equals(other: CAE): boolean {
    return this.value === other.value;
  }

  /**
   * Creates a copy of this CAE
   */
  clone(): CAE {
    return new CAE(this.value);
  }

  /**
   * Checks if CAE is valid (not empty and has correct format)
   */
  isValid(): boolean {
    return this.value.length === 14 && /^\d{14}$/.test(this.value);
  }
}
