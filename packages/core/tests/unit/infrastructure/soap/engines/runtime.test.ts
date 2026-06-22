import {
  detectSoapRuntime,
  SoapRuntime,
} from "@infrastructure/utils/soap-runtime";

describe("detectSoapRuntime", () => {
  it("should return node when isNode=true", () => {
    expect(detectSoapRuntime(true)).toBe(SoapRuntime.Node);
  });

  it("should return universal when isNode=false", () => {
    expect(detectSoapRuntime(false)).toBe(SoapRuntime.Universal);
  });
});
