/**
 * `servicios1.afip.gov.ar` (production WSFE and WSFEX) prefers DHE with a 1024-bit key, which OpenSSL rejects with
 * `dh key too small` at `SECLEVEL=2`. Without DHE it negotiates another suite and the rest of TLS validation stays as is.
 */
export const LEGACY_HTTPS_CIPHERS = "DEFAULT:!DHE";

export async function createLegacyHttpsAgent() {
  const https = await import("https");

  return new https.Agent({
    rejectUnauthorized: true,
    ciphers: LEGACY_HTTPS_CIPHERS,
  });
}
