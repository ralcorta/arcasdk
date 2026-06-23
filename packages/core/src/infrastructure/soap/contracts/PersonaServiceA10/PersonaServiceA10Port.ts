/**
 * SOAP client interface (generated). DTOs: @application/dto/register/persona-service-a10.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/register/persona-service-a10.types";

import type {
  IdummyInput,
  IdummyOutput,
  IgetPersonaInput,
  IgetPersonaOutput,
} from "@application/dto/register/persona-service-a10.types";

import { Client } from "soap";

export interface IPersonaServiceA10PortSoap extends Client {
    getPersona: (input: IgetPersonaInput, cb: (err: any | null, result: IgetPersonaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    dummy: (input: IdummyInput, cb: (err: any | null, result: IdummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    getPersonaAsync: (input: IgetPersonaInput) => Promise<[IgetPersonaOutput, string, {[k: string]: any}, any]>;
    dummyAsync: (input: IdummyInput) => Promise<[IdummyOutput, string, {[k: string]: any}, any]>;
}
