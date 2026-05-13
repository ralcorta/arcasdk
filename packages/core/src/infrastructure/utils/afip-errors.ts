export function isAfipNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const err = error as Record<string, unknown>;
  return (
    err.code === 602 ||
    (typeof err.message === "string" &&
      err.message.toLowerCase().includes("no existe"))
  );
}
