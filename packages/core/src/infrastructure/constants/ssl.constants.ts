/**
 * SSL/TLS constants for HTTPS connections
 * These constants are used to configure SSL options for connections to ARCA/AFIP servers
 */

/**
 * Minimum Diffie-Hellman key size for legacy servers
 *
 * AFIP/ARCA production servers use legacy SSL configurations with weak Diffie-Hellman parameters.
 * Setting this to 512 allows connections to these servers while maintaining reasonable security.
 *
 * The default minimum in Node.js is higher (typically 1024), which causes the error
 * "dh key too small" when connecting to legacy servers.
 *
 * @see https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
 */
export const MIN_DH_SIZE_LEGACY = 512;
