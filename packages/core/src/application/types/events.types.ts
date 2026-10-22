import { ArcaServiceName } from "./service-name.types";

/** Service a call went to: an ARCA business service, or WSAA while logging in */
export type ArcaEventService = ArcaServiceName | "wsaa";

interface ArcaEventBase {
  /** Service the call went to */
  service: ArcaEventService;
  /** ARCA operation, e.g. `FECAESolicitar` or `loginCms` */
  method: string;
  /** URL the request was sent to */
  endpoint?: string;
  /** Identifies one call: its request event and its response or error event share it */
  requestId: string;
}

/** Emitted right before the request goes out */
export interface ArcaRequestEvent extends ArcaEventBase {
  type: "request";
  /** Parameters of the call, as passed to ARCA before converting them to XML */
  params: unknown;
  /** XML sent to ARCA */
  xml: string;
}

/** Emitted when ARCA answered and the answer could be read */
export interface ArcaResponseEvent extends ArcaEventBase {
  type: "response";
  /** ARCA's answer converted from XML, before the SDK maps it to its own types */
  result: unknown;
  /** XML received from ARCA */
  xml: string;
  durationMs: number;
}

/** Emitted when the call failed: network error, HTTP error or SOAP fault */
export interface ArcaErrorEvent extends ArcaEventBase {
  type: "error";
  error: unknown;
  /**
   * SOAP fault ARCA answered with, read from the XML, when the call failed
   * with one: `faultcode`, `faultstring` and `detail` (SOAP 1.1) or `Code`,
   * `Reason` and `Detail` (SOAP 1.2)
   */
  fault?: unknown;
  /** Body ARCA answered with, when there was one */
  xml?: string;
  durationMs: number;
}

/**
 * Event for one call to ARCA. `params`, `result`, `fault` and `xml` are copies with
 * the WSAA token and sign, and the signed request sent to WSAA, replaced by
 * `[REDACTED]`.
 */
export type ArcaEvent = ArcaRequestEvent | ArcaResponseEvent | ArcaErrorEvent;

/**
 * Receives every SDK event. It is called synchronously; whatever it throws is
 * ignored, so a failing listener never breaks a call to ARCA.
 */
export type ArcaEventListener = (event: ArcaEvent) => void;
