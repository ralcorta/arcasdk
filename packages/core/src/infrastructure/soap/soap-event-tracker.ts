import { Client } from "soap";
import type {
  ArcaEvent,
  ArcaEventListener,
  ArcaEventService,
} from "@application/types/events.types";

interface PendingCall {
  service: ArcaEventService;
  method: string;
  params: unknown;
  endpoint?: string;
}

const REDACTED = "[REDACTED]";

// token and sign elements, plain (SOAP headers and bodies) or entity-escaped
// (the login ticket WSAA returns inside loginCmsReturn)
const CREDENTIAL_ELEMENTS = [
  /(<(?:[\w.-]+:)?(token|sign)\b[^>]*>)[\s\S]*?(<\/(?:[\w.-]+:)?\2\s*>)/gi,
  /(&lt;(?:[\w.-]+:)?(token|sign)\b(?:(?!&gt;)[\s\S])*&gt;)[\s\S]*?(&lt;\/(?:[\w.-]+:)?\2\s*&gt;)/gi,
];
const CREDENTIAL_KEY = /^(token|sign)$/i;
// the signed access request sent to WSAA can be replayed while it is valid
const SIGNED_LOGIN_REQUEST =
  /(<(?:[\w.-]+:)?in0\b[^>]*>)[\s\S]*?(<\/(?:[\w.-]+:)?in0\s*>)/gi;

let requestSequence = 0;

/** Replaces the content of every WSAA token and sign element with `[REDACTED]` */
export function redactCredentials(xml: string): string {
  return CREDENTIAL_ELEMENTS.reduce(
    (redacted, pattern) => redacted.replace(pattern, `$1${REDACTED}$3`),
    xml,
  );
}

/**
 * Deep copy of a call's params or result with the WSAA token and sign
 * redacted: `Token`/`Sign` properties (any case) and token and sign elements
 * inside string values, such as the ticket loginCms returns.
 */
export function redactCredentialsDeep(value: unknown): unknown {
  if (typeof value === "string") return redactCredentials(value);
  if (Array.isArray(value)) return value.map(redactCredentialsDeep);
  if (value instanceof Date) return new Date(value.getTime());
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        CREDENTIAL_KEY.test(key) ? REDACTED : redactCredentialsDeep(entry),
      ]),
    );
  }
  return value;
}

function redactLoginParams(params: unknown): unknown {
  const copy = redactCredentialsDeep(params);
  return copy !== null && typeof copy === "object" && "in0" in copy
    ? { ...copy, in0: REDACTED }
    : copy;
}

// node-soap keeps the envelope it read from a fault in error.root
function faultOf(error: unknown): unknown {
  const root = (
    error as { root?: { Envelope?: { Body?: { Fault?: unknown } } } } | null
  )?.root;
  return root?.Envelope?.Body?.Fault;
}

function nextRequestId(): string {
  requestSequence = (requestSequence + 1) % Number.MAX_SAFE_INTEGER;
  return `${Date.now().toString(36)}-${requestSequence.toString(36)}`;
}

function responseBodyOf(error: unknown): string | undefined {
  const candidate = error as {
    body?: unknown;
    response?: { data?: unknown };
  } | null;
  const body = candidate?.body ?? candidate?.response?.data;
  return typeof body === "string" ? body : undefined;
}

/**
 * Emits the request, response and error events of the calls made through one
 * SOAP client. node-soap builds the XML, so the request event comes from its
 * `request` event; the id is passed to node-soap as `exchangeId`, which ties
 * that event to its call even when calls on the client overlap.
 */
export class SoapEventTracker {
  private readonly pending = new Map<string, PendingCall>();

  constructor(
    private readonly client: Client,
    private readonly onEvent: ArcaEventListener,
  ) {
    client.on("request", (xml: string, requestId: string) => {
      const call = this.pending.get(requestId);
      if (!call) return;
      // node-soap sets lastEndpoint right before emitting, in the same tick
      call.endpoint = this.client.lastEndpoint;
      const isLogin = call.service === "wsaa";
      this.emit(() => ({
        type: "request",
        service: call.service,
        method: call.method,
        endpoint: call.endpoint,
        requestId,
        params: isLogin
          ? redactLoginParams(call.params)
          : redactCredentialsDeep(call.params),
        xml: isLogin
          ? xml.replace(SIGNED_LOGIN_REQUEST, `$1${REDACTED}$2`)
          : redactCredentials(xml),
      }));
    });
  }

  /**
   * Runs one call and emits its events. `invoke` must pass the options it
   * receives to the node-soap method, so the request carries the id.
   */
  async track<T>(
    service: ArcaEventService,
    method: string,
    params: unknown,
    invoke: (options: { exchangeId: string }) => Promise<T>,
  ): Promise<T> {
    const requestId = nextRequestId();
    const call: PendingCall = { service, method, params };
    this.pending.set(requestId, call);
    const startedAt = Date.now();
    const base = () => ({
      service,
      method,
      endpoint: call.endpoint,
      requestId,
      durationMs: Date.now() - startedAt,
    });

    try {
      const response = await invoke({ exchangeId: requestId });
      const [result, rawResponse] = Array.isArray(response)
        ? response
        : [response, undefined];
      this.emit(() => ({
        type: "response",
        ...base(),
        result: redactCredentialsDeep(result),
        xml:
          typeof rawResponse === "string" ? redactCredentials(rawResponse) : "",
      }));
      return response;
    } catch (error) {
      const body = responseBodyOf(error);
      const fault = faultOf(error);
      this.emit(() => ({
        type: "error",
        ...base(),
        error,
        fault: fault === undefined ? undefined : redactCredentialsDeep(fault),
        xml: body === undefined ? undefined : redactCredentials(body),
      }));
      throw error;
    } finally {
      this.pending.delete(requestId);
    }
  }

  // builds the event inside the guard too, so nothing here can break a call
  private emit(build: () => ArcaEvent): void {
    try {
      this.onEvent(build());
    } catch {
      // a listener must never break a call to ARCA
    }
  }
}
