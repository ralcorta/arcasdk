/**
 * Mock for html2canvas for testing purposes
 */

export default async function html2canvas(
  element: any,
  options?: any,
): Promise<any> {
  // Return a mock canvas object
  return {
    toDataURL: (type: string) => {
      // Return a minimal PNG data URL
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    },
  };
}
