import { describe, expect, it } from "@jest/globals";
import {
  Arca,
  ArcaServiceNames,
  AuthRepository,
  DateTimeRef,
  FileSystemTicketStorage,
  GenericService,
} from "@arcasdk/core";

describe("Consumer smoke: paquete instalado como dependencia npm", () => {
  it("expone la API pública esperada desde @arcasdk/core", () => {
    expect(typeof Arca).toBe("function");
    expect(typeof AuthRepository).toBe("function");
    expect(typeof FileSystemTicketStorage).toBe("function");
    expect(typeof GenericService).toBe("function");
    const ref = new DateTimeRef(new Date("2024-06-01T15:30:45.123Z"));
    expect(ref.toUnixSeconds()).toBe(1_717_255_845);
    expect(ArcaServiceNames.WSFE).toBe("wsfe");
  });

  it("Arca expone getters de servicios incluyendo genericService", () => {
    expect(Object.getOwnPropertyDescriptor(Arca.prototype, "genericService")?.get).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(Arca.prototype, "wsfexService")?.get).toBeDefined();
    expect(Object.getOwnPropertyDescriptor(Arca.prototype, "wsfecredService")?.get).toBeDefined();
  });
});
