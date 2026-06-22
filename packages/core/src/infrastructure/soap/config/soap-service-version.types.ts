
export const SoapServiceVersions = {
  
  ServiceSoap12: "ServiceSoap12",
  
  ServiceSoap: "ServiceSoap",
} as const;

export type SoapServiceVersion =
  (typeof SoapServiceVersions)[keyof typeof SoapServiceVersions];
