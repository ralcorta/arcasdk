/**
 * Winston Logger
 * Implements ILoggerPort using Winston
 */
import { ILoggerPort } from "@infrastructure/outbound/ports/logger/logger.port";
import { createArcaLogger } from "@infrastructure/utils/logger";
import { Logger } from "winston";
import { WinstonLoggerConfig } from "@infrastructure/outbound/ports/logger/logger.types";

export class WinstonLogger implements ILoggerPort {
  private logger: Logger;

  constructor(config: WinstonLoggerConfig = {}) {
    this.logger = createArcaLogger(config.enableLogging ?? false);
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  error(message: string, error?: Error, meta?: any): void {
    this.logger.error(message, { error, ...meta });
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }
}
