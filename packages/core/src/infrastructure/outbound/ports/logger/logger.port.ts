/**
 * Logger Port
 * Outbound port for logging operations
 */
export interface ILoggerPort {
  /**
   * Log an info message
   * @param message Log message
   * @param meta Additional metadata
   */
  info(message: string, meta?: any): void;

  /**
   * Log an error message
   * @param message Log message
   * @param error Error object (optional)
   * @param meta Additional metadata
   */
  error(message: string, error?: Error, meta?: any): void;

  /**
   * Log a warning message
   * @param message Log message
   * @param meta Additional metadata
   */
  warn(message: string, meta?: any): void;

  /**
   * Log a debug message
   * @param message Log message
   * @param meta Additional metadata
   */
  debug(message: string, meta?: any): void;
}

