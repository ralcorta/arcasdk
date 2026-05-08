import { afterEach, beforeEach, expect } from "@jest/globals";

/**
 * Logs antes/después de cada test de integración.
 * Solo cargar desde setupFilesAfterEnv.
 */
export function registerIntegrationTestLogs(label: string): void {
  let startedAt = 0;
  beforeEach(() => {
    startedAt = Date.now();
    const name = expect.getState().currentTestName ?? "(unknown)";
    console.info(`\n[${label}] ▶ ${name}`);
  });
  afterEach(() => {
    const name = expect.getState().currentTestName ?? "(unknown)";
    console.info(`[${label}] ◀ ${name} (${Date.now() - startedAt}ms)`);
  });
}
