/**
 * SOAP client interface (generated). DTOs: @application/dto/register/persona-service-a13.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/register/persona-service-a13.types";

import type {
  IdummyInput,
  IdummyOutput,
  IgetIdPersonaListByDocumentoInput,
  IgetIdPersonaListByDocumentoOutput,
  IgetPersonaInput,
  IgetPersonaOutput,
} from "@application/dto/register/persona-service-a13.types";

import { Client } from "soap";

export interface IPersonaServiceA13PortSoap extends Client {
    dummy: (input: IdummyInput, cb: (err: any | null, result: IdummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getIdPersonaListByDocumento: (input: IgetIdPersonaListByDocumentoInput, cb: (err: any | null, result: IgetIdPersonaListByDocumentoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getPersona: (input: IgetPersonaInput, cb: (err: any | null, result: IgetPersonaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    dummyAsync: (input: IdummyInput) => Promise<[IdummyOutput, string, {[k: string]: any}, any]>;
    getIdPersonaListByDocumentoAsync: (input: IgetIdPersonaListByDocumentoInput) => Promise<[IgetIdPersonaListByDocumentoOutput, string, {[k: string]: any}, any]>;
    getPersonaAsync: (input: IgetPersonaInput) => Promise<[IgetPersonaOutput, string, {[k: string]: any}, any]>;
}
