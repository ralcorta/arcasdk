/**
 * Default Configuration Constants
 * Centralized default values for context and application configuration
 */

/**
 * Default value for useHttpsAgent configuration
 *
 * When false (default), the HTTPS agent is not used, which is suitable for:
 * - Cloudflare Workers and other edge runtimes
 * - Modern Node.js environments that don't require legacy SSL configurations
 *
 * When true, enables the HTTPS agent with legacy SSL support, required for:
 * - Legacy ARCA/AFIP servers that use weak Diffie-Hellman parameters
 *
 * @default false
 */
export const DEFAULT_USE_HTTPS_AGENT = false;
