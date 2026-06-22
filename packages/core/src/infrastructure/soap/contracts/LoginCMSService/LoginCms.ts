/**
 * SOAP client interface (generated). DTOs: @application/dto/authentication/login-cms.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/authentication/login-cms.types";

import type {
  IloginCmsInput,
  IloginCmsOutput,
} from "@application/dto/authentication/login-cms.types";

import { Client } from "soap";

export interface ILoginCmsSoap extends Client {
    loginCms: (input: IloginCmsInput, cb: (err: any | null, result: IloginCmsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    loginCmsAsync: (input: IloginCmsInput) => Promise<[IloginCmsOutput, string, {[k: string]: any}, any]>;
}
