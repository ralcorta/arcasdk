import { createLogger, format, transports, Logger } from "winston";

export function createArcaLogger(enableLogging: boolean = false): Logger {
  const logger = createLogger({
    format: format.json(),
    exitOnError: true,
    silent: !enableLogging,
  });

  if (enableLogging) {
    logger.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    );
  }

  return logger;
}
const defaultLogger = createArcaLogger(false);

export { defaultLogger as logger };
