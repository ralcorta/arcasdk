import { WSAuthParam } from "@application/types/auth.types";

export function mapPadronAuth(auth: WSAuthParam): Record<string, unknown> {
  return {
    token: auth.Auth.Token,
    sign: auth.Auth.Sign,
    cuitRepresentada: auth.Auth.Cuit,
  };
}

export function mapAuthRequest(auth: WSAuthParam): Record<string, unknown> {
  return {
    authRequest: {
      token: auth.Auth.Token,
      sign: auth.Auth.Sign,
      cuitRepresentada: auth.Auth.Cuit,
    },
  };
}

export const mapFecredAuth = mapAuthRequest;
export const mapWsctAuth = mapAuthRequest;

export const padronExcludeMethods = ["dummy"];

export const fexExcludeMethods = ["FEXDummy"];

export const wsctExcludeMethods = ["dummy"];

export const cdcExcludeMethods = ["ComprobanteDummy"];
