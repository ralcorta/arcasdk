import { isAfipNotFoundError } from "@infrastructure/utils/afip-errors";

describe("isAfipNotFoundError", () => {
  it("should return true when error has code 602", () => {
    const error = { code: 602 };
    expect(isAfipNotFoundError(error)).toBe(true);
  });

  it("should return true when error message contains 'no existe'", () => {
    const error = { message: "No existe la entidad" };
    expect(isAfipNotFoundError(error)).toBe(true);
  });

  it("should return true when error message contains 'no existe' (case insensitive)", () => {
    const error = { message: "NO EXISTE" };
    expect(isAfipNotFoundError(error)).toBe(true);
  });

  it("should return false when error is null", () => {
    expect(isAfipNotFoundError(null)).toBe(false);
  });

  it("should return false when error is undefined", () => {
    expect(isAfipNotFoundError(undefined)).toBe(false);
  });

  it("should return false when error has different code", () => {
    const error = { code: 500 };
    expect(isAfipNotFoundError(error)).toBe(false);
  });

  it("should return false when error message does not contain 'no existe'", () => {
    const error = { message: "Server error" };
    expect(isAfipNotFoundError(error)).toBe(false);
  });

  it("should return false when error message is not a string", () => {
    const error = { message: 123 };
    expect(isAfipNotFoundError(error)).toBe(false);
  });

  it("should return true when error has code 602 even with additional properties", () => {
    const error = { code: 602, message: "Some error", data: {} };
    expect(isAfipNotFoundError(error)).toBe(true);
  });
});
