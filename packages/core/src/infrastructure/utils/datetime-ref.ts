import {
  MS_PER_SECOND,
  WSAA_TRA_VALIDITY_WINDOW_MS,
} from "@infrastructure/constants/time.constants";

/**
 * Reference instant for time derivations (Unix seconds, ISO strings, offsets).
 */
export class DateTimeRef {
  constructor(private readonly instant: Date) {}

  static now(): DateTimeRef {
    return new DateTimeRef(new Date());
  }

  /** Seconds since Unix epoch (integer). */
  toUnixSeconds(): number {
    return Math.floor(this.instant.getTime() / MS_PER_SECOND);
  }

  /** ISO-8601 for this instant minus `offsetMs`. */
  minusMillisecondsAsIso(offsetMs: number): string {
    return new Date(this.instant.getTime() - offsetMs).toISOString();
  }

  /** ISO-8601 for this instant plus `offsetMs`. */
  plusMillisecondsAsIso(offsetMs: number): string {
    return new Date(this.instant.getTime() + offsetMs).toISOString();
  }

  /** WSAA TRA `uniqueId` (Unix seconds at request time). */
  wsaaTraUniqueIdSeconds(): number {
    return this.toUnixSeconds();
  }

  /** WSAA TRA `generationTime`: request time minus the TRA validity window. */
  wsaaTraGenerationTimeIso(): string {
    return this.minusMillisecondsAsIso(WSAA_TRA_VALIDITY_WINDOW_MS);
  }

  /** WSAA TRA `expirationTime`: request time plus the TRA validity window. */
  wsaaTraExpirationTimeIso(): string {
    return this.plusMillisecondsAsIso(WSAA_TRA_VALIDITY_WINDOW_MS);
  }
}
