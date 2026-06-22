export class CAE {
  private constructor(private readonly value: string) {
    this.validate();
  }

  
  static create(value: string): CAE {
    return new CAE(value);
  }

  
  private validate(): void {
    if (!this.value || typeof this.value !== "string") {
      throw new Error("CAE debe ser una cadena de texto");
    }

    if (!/^\d{14}$/.test(this.value)) {
      throw new Error(
        `CAE inválido: debe tener 14 dígitos, tiene "${this.value}"`,
      );
    }

    if (this.value === "00000000000000") {
      throw new Error("CAE inválido: no puede ser todo ceros");
    }
  }

  
  getValue(): string {
    return this.value;
  }

  
  toString(): string {
    return this.value;
  }

  
  toFormattedString(): string {
    return `${this.value.substring(0, 4)}-${this.value.substring(
      4,
      8,
    )}-${this.value.substring(8, 12)}-${this.value.substring(12)}`;
  }

  
  equals(other: CAE): boolean {
    return this.value === other.value;
  }

  
  clone(): CAE {
    return new CAE(this.value);
  }

  
  isValid(): boolean {
    return this.value.length === 14 && /^\d{14}$/.test(this.value);
  }
}
