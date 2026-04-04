export enum SoapRuntime {
  Node = "node",
  Universal = "universal",
}

/**
 * Picks the SOAP transport: Node vs fetch-based universal.
 * Non-Node environments (Workers, browsers, etc.) use {@link SoapRuntime.Universal}.
 */
export function detectSoapRuntime(isNode: boolean): SoapRuntime {
  return isNode ? SoapRuntime.Node : SoapRuntime.Universal;
}
