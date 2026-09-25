export function isAfipNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const err = error as Record<string, unknown>;
  return (
    err.code === 602 ||
    (typeof err.message === "string" &&
      err.message.toLowerCase().includes("no existe"))
  );
}

// WSAA emite un solo TA por certificado y servicio hasta que vence.
export function isAlreadyAuthenticatedError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const err = error as {
    message?: unknown;
    root?: { Envelope?: { Body?: { Fault?: { faultcode?: unknown } } } };
  };
  const faultCode = err.root?.Envelope?.Body?.Fault?.faultcode;
  return [faultCode, err.message].some(
    (value) =>
      typeof value === "string" && value.includes("coe.alreadyAuthenticated"),
  );
}
