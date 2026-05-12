/**
 * Mock for JSDOM for testing purposes
 */

export class JSDOM {
  window: any;

  constructor(html: string, options?: any) {
    this.window = {
      document: {
        body: {},
      },
    };
  }
}
