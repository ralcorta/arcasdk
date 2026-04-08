import { SoapServiceVersion } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";

export type SoapAsyncResultTuple<O = unknown, H = unknown> = [
  O,
  string,
  H,
  string,
];

export type SoapAsyncFunc<I, O> = (
  input: I,
  options?: any,
  extraHeaders?: any,
) => Promise<SoapAsyncResultTuple<O, { [k: string]: any }>>;

export type SoapServices<T> = Record<
  "Service",
  Record<
    SoapServiceVersion,
    Record<keyof T, Record<"input" | "output", Record<string, any>>>
  >
>;
