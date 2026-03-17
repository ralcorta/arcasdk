import { MIN_DH_SIZE_LEGACY } from "@infrastructure/constants";

/**
 * Creates a legacy-compatible HTTPS agent for Node.js
 * This matches requirements for older AFIP servers
 */
export async function createLegacyHttpsAgent() {
  /**
   * IMPORTANT: We use dynamic imports (import()) here to ensure this file
   * can be loaded in non-Node.js environments (like Cloudflare Workers)
   * without throwing errors for missing built-in modules like 'https' or 'crypto'.
   */
  const [https, crypto] = await Promise.all([
    import("https"),
    import("crypto"),
  ]);

  const secureOptions =
    crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT |
    crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION;

  return new https.Agent({
    rejectUnauthorized: true,
    minDHSize: MIN_DH_SIZE_LEGACY,
    ciphers: "DEFAULT@SECLEVEL=1",
    secureProtocol: "TLSv1_2_method",
    secureOptions,
  });
}
