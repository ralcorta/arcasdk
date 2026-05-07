import { describe, expect, it } from "@jest/globals";
import {
  Arca,
  AuthRepository,
  DateTimeRef,
  FileSystemTicketStorage,
  ServiceNamesEnum,
} from "@arcasdk/core";

describe("Consumer smoke: paquete instalado como dependencia npm", () => {
  it("expone la API pública esperada desde @arcasdk/core", () => {
    expect(typeof Arca).toBe("function");
    expect(typeof AuthRepository).toBe("function");
    expect(typeof FileSystemTicketStorage).toBe("function");
    const ref = new DateTimeRef(new Date("2024-06-01T15:30:45.123Z"));
    expect(ref.toUnixSeconds()).toBe(1_717_255_845);
    expect(ServiceNamesEnum.WSFE).toBe("wsfe");
  });
});
