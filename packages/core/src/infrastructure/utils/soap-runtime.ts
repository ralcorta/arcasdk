export const SoapRuntime = {
  Node: "node",
  Universal: "universal",
} as const;

export type SoapRuntimeValue = (typeof SoapRuntime)[keyof typeof SoapRuntime];

export function detectSoapRuntime(isNode: boolean): SoapRuntimeValue {
  return isNode ? SoapRuntime.Node : SoapRuntime.Universal;
}
