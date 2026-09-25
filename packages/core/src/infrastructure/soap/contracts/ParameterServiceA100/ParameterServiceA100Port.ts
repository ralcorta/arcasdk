/**
 * SOAP client interface (generated). DTOs: @application/dto/register/parameter-service-a100.types
 * Regenerate: npm run generate:soap-interfaces
 */
export * from "@application/dto/register/parameter-service-a100.types";

import type {
  IdummyInput,
  IdummyOutput,
  IgetParameterCollectionByNameInput,
  IgetParameterCollectionByNameOutput,
} from "@application/dto/register/parameter-service-a100.types";

import { Client } from "soap";

export interface IParameterServiceA100PortSoap extends Client {
    dummy: (input: IdummyInput, cb: (err: any | null, result: IdummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    getParameterCollectionByName: (input: IgetParameterCollectionByNameInput, cb: (err: any | null, result: IgetParameterCollectionByNameOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;

    dummyAsync: (input: IdummyInput) => Promise<[IdummyOutput, string, {[k: string]: any}, any]>;
    getParameterCollectionByNameAsync: (input: IgetParameterCollectionByNameInput) => Promise<[IgetParameterCollectionByNameOutput, string, {[k: string]: any}, any]>;
}
