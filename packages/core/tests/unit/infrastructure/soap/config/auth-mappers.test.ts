import {
  fexExcludeMethods,
  mapFecredAuth,
  mapPadronAuth,
  padronExcludeMethods,
} from "@infrastructure/soap/config/auth-mappers";
import { WSAuthParam } from "@application/types/auth.types";

describe("auth-mappers", () => {
  const auth: WSAuthParam = {
    Auth: { Token: "tok", Sign: "sig", Cuit: 20111111112 },
  };

  it("mapPadronAuth maps WSAuthParam to padron wire shape", () => {
    expect(mapPadronAuth(auth)).toEqual({
      token: "tok",
      sign: "sig",
      cuitRepresentada: 20111111112,
    });
  });

  it("mapFecredAuth maps WSAuthParam to FECRED authRequest shape", () => {
    expect(mapFecredAuth(auth)).toEqual({
      authRequest: {
        token: "tok",
        sign: "sig",
        cuitRepresentada: 20111111112,
      },
    });
  });

  it("padronExcludeMethods excludes dummy", () => {
    expect(padronExcludeMethods).toEqual(["dummy"]);
  });

  it("fexExcludeMethods excludes FEXDummy", () => {
    expect(fexExcludeMethods).toEqual(["FEXDummy"]);
  });
});
