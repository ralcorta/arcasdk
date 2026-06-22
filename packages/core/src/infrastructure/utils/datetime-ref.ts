import {
  MS_PER_SECOND,
  WSAA_TRA_VALIDITY_WINDOW_MS,
} from "@infrastructure/constants/time.constants";

export class DateTimeRef {
  constructor(private readonly instant: Date) {}

  static now(): DateTimeRef {
    return new DateTimeRef(new Date());
  }

  
  toUnixSeconds(): number {
    return Math.floor(this.instant.getTime() / MS_PER_SECOND);
  }

  
  minusMillisecondsAsIso(offsetMs: number): string {
    return new Date(this.instant.getTime() - offsetMs).toISOString();
  }

  
  plusMillisecondsAsIso(offsetMs: number): string {
    return new Date(this.instant.getTime() + offsetMs).toISOString();
  }

  
  wsaaTraUniqueIdSeconds(): number {
    return this.toUnixSeconds();
  }

  
  wsaaTraGenerationTimeIso(): string {
    return this.minusMillisecondsAsIso(WSAA_TRA_VALIDITY_WINDOW_MS);
  }

  
  wsaaTraExpirationTimeIso(): string {
    return this.plusMillisecondsAsIso(WSAA_TRA_VALIDITY_WINDOW_MS);
  }
}
