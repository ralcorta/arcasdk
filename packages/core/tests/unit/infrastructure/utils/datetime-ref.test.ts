import { DateTimeRef } from "@infrastructure/utils/datetime-ref";
import {
  MS_PER_SECOND,
  WSAA_TRA_VALIDITY_WINDOW_MS,
} from "@infrastructure/constants/time.constants";

describe("DateTimeRef", () => {
  describe("with a fixed instant", () => {
    const fixed = new Date("2024-06-01T15:30:45.123Z");
    const ref = new DateTimeRef(fixed);

    it("toUnixSeconds floors milliseconds", () => {
      expect(ref.toUnixSeconds()).toBe(
        Math.floor(fixed.getTime() / MS_PER_SECOND),
      );
      expect(ref.toUnixSeconds()).toBe(1_717_255_845);
    });

    it("minusMillisecondsAsIso returns ISO for instant minus offset", () => {
      const offset = 90_000;
      expect(ref.minusMillisecondsAsIso(offset)).toBe(
        new Date(fixed.getTime() - offset).toISOString(),
      );
      expect(ref.minusMillisecondsAsIso(offset)).toBe(
        "2024-06-01T15:29:15.123Z",
      );
    });

    it("plusMillisecondsAsIso returns ISO for instant plus offset", () => {
      const offset = 500;
      expect(ref.plusMillisecondsAsIso(offset)).toBe(
        new Date(fixed.getTime() + offset).toISOString(),
      );
      expect(ref.plusMillisecondsAsIso(offset)).toBe(
        "2024-06-01T15:30:45.623Z",
      );
    });

    it("wsaaTraUniqueIdSeconds delegates to toUnixSeconds", () => {
      expect(ref.wsaaTraUniqueIdSeconds()).toBe(ref.toUnixSeconds());
    });

    it("wsaaTraGenerationTimeIso is now minus WSAA TRA window", () => {
      expect(ref.wsaaTraGenerationTimeIso()).toBe(
        ref.minusMillisecondsAsIso(WSAA_TRA_VALIDITY_WINDOW_MS),
      );
      expect(ref.wsaaTraGenerationTimeIso()).toBe("2024-06-01T15:20:45.123Z");
    });

    it("wsaaTraExpirationTimeIso is now plus WSAA TRA window", () => {
      expect(ref.wsaaTraExpirationTimeIso()).toBe(
        ref.plusMillisecondsAsIso(WSAA_TRA_VALIDITY_WINDOW_MS),
      );
      expect(ref.wsaaTraExpirationTimeIso()).toBe("2024-06-01T15:40:45.123Z");
    });
  });

  describe("now()", () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it("builds a ref for the current system time", () => {
      jest.useFakeTimers();
      jest.setSystemTime(Date.parse("2020-01-01T00:00:00.000Z"));

      const ref = DateTimeRef.now();

      expect(ref.toUnixSeconds()).toBe(1_577_836_800);
      expect(ref.wsaaTraGenerationTimeIso()).toBe("2019-12-31T23:50:00.000Z");
      expect(ref.wsaaTraExpirationTimeIso()).toBe("2020-01-01T00:10:00.000Z");
    });
  });
});
