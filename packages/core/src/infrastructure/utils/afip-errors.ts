/**
 * Utility functions for handling specific AFIP SOAP faults and responses
 */

/**
 * Checks if an error thrown by the AFIP SOAP client indicates that the requested
 * entity (person, voucher, etc.) does not exist in their database.
 *
 * AFIP typically uses error code 602 or includes "no existe" in the message.
 */
export function isAfipNotFoundError(error: any): boolean {
  if (!error) return false;

  return (
    error.code === 602 ||
    (typeof error.message === "string" &&
      error.message.toLowerCase().includes("no existe"))
  );
}
