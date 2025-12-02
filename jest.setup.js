jest.setTimeout(30000);

// Global error sanitization to prevent circular structure issues in Jest serialization
const originalProcessEmit = process.emit;
process.emit = function (event, error, ...args) {
  if (event === "unhandledRejection" && error && typeof error === "object") {
    // Sanitize the error to avoid circular structure issues
    const sanitizedError = new Error(error?.message || "Unknown error");
    sanitizedError.name = error?.name || "Error";
    if (error?.code) {
      sanitizedError.code = error.code;
    }
    if (error?.stack) {
      sanitizedError.stack = error.stack;
    }
    return originalProcessEmit.call(this, event, sanitizedError, ...args);
  }
  return originalProcessEmit.apply(this, arguments);
};
