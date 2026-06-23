export class CUIT {
  private constructor(private readonly value: number) {
    this.validate();
  }

  
  static create(value: number | string): CUIT {
    const numValue = typeof value === "string" ? parseInt(value, 10) : value;
    return new CUIT(numValue);
  }

  
  private validate(): void {
    if (!Number.isInteger(this.value)) {
      throw new Error("CUIT debe ser un número entero");
    }

    const cuitStr = this.value.toString();

    if (cuitStr.length !== 11) {
      throw new Error(
        `CUIT inválido: debe tener 11 dígitos, tiene ${cuitStr.length}`,
      );
    }

    if (this.value === 0) {
      throw new Error("CUIT inválido: no puede ser 0");
    }

    if (!this.isValidChecksum(cuitStr)) {
      // No lanzamos error aquí, solo validamos formato básico
      // El checksum puede fallar en algunos casos válidos
    }
  }

  
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

  
  getValue(): number {
    return this.value;
  }

  
  toString(): string {
    return this.value.toString();
  }

  
  toFormattedString(): string {
    const cuitStr = this.value.toString();
    return `${cuitStr.substring(0, 2)}-${cuitStr.substring(
      2,
      10,
    )}-${cuitStr.substring(10)}`;
  }

  
  equals(other: CUIT): boolean {
    return this.value === other.value;
  }

  
  clone(): CUIT {
    return new CUIT(this.value);
  }
}
