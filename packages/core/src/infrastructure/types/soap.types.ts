import { SoapServiceVersion } from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";

export type SoapAsyncResultTuple<O = unknown, H = unknown> = [
  O,
  string,
  H,
  string,
];

export type SoapAsyncFunc<I, O> = (
  input: Partial<I>,
  options?: Record<string, unknown>,
  extraHeaders?: Record<string, unknown>,
) => Promise<SoapAsyncResultTuple<O, Record<string, unknown>>>;

export type SoapServices<T> = Record<
  "Service",
  Record<
    SoapServiceVersion,
    Record<keyof T, Record<"input" | "output", Record<string, unknown>>>
  >
>;
