import { WSAuthParam } from "@application/types/auth.types";

export function mapPadronAuth(auth: WSAuthParam): Record<string, unknown> {
  return {
    token: auth.Auth.Token,
    sign: auth.Auth.Sign,
    cuitRepresentada: auth.Auth.Cuit,
  };
}

export function mapFecredAuth(auth: WSAuthParam): Record<string, unknown> {
  return {
    authRequest: {
      token: auth.Auth.Token,
      sign: auth.Auth.Sign,
      cuitRepresentada: auth.Auth.Cuit,
    },
  };
}

export const padronExcludeMethods = ["dummy"];

export const fexExcludeMethods = ["FEXDummy"];
