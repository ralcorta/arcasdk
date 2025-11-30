/**
 * Authentication Types
 * Types for authentication operations in the application layer
 */

/**
 * Authentication parameters for SOAP requests
 * This type is independent of infrastructure SOAP types
 */
export interface AuthParams {
  Token: string;
  Sign: string;
  Cuit: number;
}

/**
 * WSAuthParam - Authentication wrapper for SOAP requests
 */
export type WSAuthParam = {
  Auth: AuthParams;
};

