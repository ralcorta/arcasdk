export function isAfipNotFoundError(error: any): boolean {
  if (!error) return false;

  return (
    error.code === 602 ||
    (typeof error.message === "string" &&
      error.message.toLowerCase().includes("no existe"))
  );
}
