export type SoapAsyncFunc<I, O> = (
  input: I,
  options?: any,
  extraHeaders?: any
) => Promise<[O, string, { [k: string]: any }, string]>;
