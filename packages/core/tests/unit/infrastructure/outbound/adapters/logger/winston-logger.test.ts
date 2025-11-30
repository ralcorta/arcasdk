import { WinstonLogger } from "@arcasdk/core/src/infrastructure/outbound/adapters/logger/winston-logger";
import { createArcaLogger } from "@arcasdk/core/src/infrastructure/utils/logger";

jest.mock("@infrastructure/utils/logger");

describe("WinstonLogger", () => {
  let logger: WinstonLogger;
  let mockWinstonLogger: any;

  beforeEach(() => {
    mockWinstonLogger = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    (
      createArcaLogger as jest.MockedFunction<typeof createArcaLogger>
    ).mockReturnValue(mockWinstonLogger as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create logger with logging disabled by default", () => {
      logger = new WinstonLogger();
      expect(createArcaLogger).toHaveBeenCalledWith(false);
    });

    it("should create logger with logging enabled when specified", () => {
      logger = new WinstonLogger({ enableLogging: true });
      expect(createArcaLogger).toHaveBeenCalledWith(true);
    });

    it("should create logger with logging disabled when explicitly set", () => {
      logger = new WinstonLogger({ enableLogging: false });
      expect(createArcaLogger).toHaveBeenCalledWith(false);
    });
  });

  describe("info", () => {
    it("should log info message", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Info message";
      const meta = { key: "value" };

      logger.info(message, meta);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message, meta);
    });

    it("should log info message without meta", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Info message";

      logger.info(message);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message, undefined);
    });
  });

  describe("error", () => {
    it("should log error message with error object", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Error message";
      const error = new Error("Test error");
      const meta = { key: "value" };

      logger.error(message, error, meta);

      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, {
        error,
        key: "value",
      });
    });

    it("should log error message without error object", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Error message";
      const meta = { key: "value" };

      logger.error(message, undefined, meta);

      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, {
        error: undefined,
        key: "value",
      });
    });

    it("should log error message without meta", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Error message";
      const error = new Error("Test error");

      logger.error(message, error);

      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, {
        error,
      });
    });
  });

  describe("warn", () => {
    it("should log warning message", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Warning message";
      const meta = { key: "value" };

      logger.warn(message, meta);

      expect(mockWinstonLogger.warn).toHaveBeenCalledWith(message, meta);
    });

    it("should log warning message without meta", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Warning message";

      logger.warn(message);

      expect(mockWinstonLogger.warn).toHaveBeenCalledWith(message, undefined);
    });
  });

  describe("debug", () => {
    it("should log debug message", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Debug message";
      const meta = { key: "value" };

      logger.debug(message, meta);

      expect(mockWinstonLogger.debug).toHaveBeenCalledWith(message, meta);
    });

    it("should log debug message without meta", () => {
      logger = new WinstonLogger({ enableLogging: true });
      const message = "Debug message";

      logger.debug(message);

      expect(mockWinstonLogger.debug).toHaveBeenCalledWith(message, undefined);
    });
  });
});
