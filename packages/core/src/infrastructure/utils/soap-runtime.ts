export const SoapRuntime = {
  Node: "node",
  Universal: "universal",
} as const;

export type SoapRuntimeValue = (typeof SoapRuntime)[keyof typeof SoapRuntime];

/**
 * Picks the SOAP transport: Node vs fetch-based universal.
 * Non-Node environments (Workers, browsers, etc.) use {@link SoapRuntime.Universal}.
 */
export function detectSoapRuntime(isNode: boolean): SoapRuntimeValue {
  return isNode ? SoapRuntime.Node : SoapRuntime.Universal;
}
