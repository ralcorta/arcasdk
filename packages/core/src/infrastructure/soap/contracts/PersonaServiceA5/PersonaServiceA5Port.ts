/**
 * SOAP client interface (generated). DTOs: @application/dto/register/persona-service-a5.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/register/persona-service-a5.types";

import type {
  IdummyInput,
  IdummyOutput,
  IgetPersonaInput,
  IgetPersonaListInput,
  IgetPersonaListOutput,
  IgetPersonaList_v2Input,
  IgetPersonaList_v2Output,
  IgetPersonaOutput,
  IgetPersona_v2Input,
  IgetPersona_v2Output,
} from "@application/dto/register/persona-service-a5.types";

import { Client } from "soap";

export interface IPersonaServiceA5PortSoap extends Client {
    getPersona: (input: IgetPersonaInput, cb: (err: any | null, result: IgetPersonaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getPersonaList: (input: IgetPersonaListInput, cb: (err: any | null, result: IgetPersonaListOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getPersona_v2: (input: IgetPersona_v2Input, cb: (err: any | null, result: IgetPersona_v2Output, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    dummy: (input: IdummyInput, cb: (err: any | null, result: IdummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getPersonaList_v2: (input: IgetPersonaList_v2Input, cb: (err: any | null, result: IgetPersonaList_v2Output, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    getPersonaAsync: (input: IgetPersonaInput) => Promise<[IgetPersonaOutput, string, {[k: string]: any}, any]>;
    getPersonaListAsync: (input: IgetPersonaListInput) => Promise<[IgetPersonaListOutput, string, {[k: string]: any}, any]>;
    getPersona_v2Async: (input: IgetPersona_v2Input) => Promise<[IgetPersona_v2Output, string, {[k: string]: any}, any]>;
    dummyAsync: (input: IdummyInput) => Promise<[IdummyOutput, string, {[k: string]: any}, any]>;
    getPersonaList_v2Async: (input: IgetPersonaList_v2Input) => Promise<[IgetPersonaList_v2Output, string, {[k: string]: any}, any]>;
}
