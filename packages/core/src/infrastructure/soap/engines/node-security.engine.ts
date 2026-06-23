import { MIN_DH_SIZE_LEGACY } from "@infrastructure/constants";

export async function createLegacyHttpsAgent() {
  
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
