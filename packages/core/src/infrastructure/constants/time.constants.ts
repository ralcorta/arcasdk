export const MS_PER_SECOND = 1_000;
export const MS_PER_MINUTE = 60 * MS_PER_SECOND;

/**
 * Half-width of the WSAA TRA validity window around the request time.
 * `generationTime` and `expirationTime` in the TRA are set as now ± this value.
 */
export const WSAA_TRA_VALIDITY_WINDOW_MS = 10 * MS_PER_MINUTE;
