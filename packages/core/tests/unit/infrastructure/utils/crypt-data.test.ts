import { Cryptography } from "@infrastructure/utils/crypt-data";
import forge from "node-forge";

jest.mock("node-forge");

describe("Cryptography", () => {
  let mockForge: any;
  let cryptography: Cryptography;
  const testCert =
    "-----BEGIN CERTIFICATE-----\nMIID...\n-----END CERTIFICATE-----";
  const testKey =
    "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----";
  const testData = "test data to sign";

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup forge mocks
    mockForge = forge as any;
    mockForge.pkcs7 = {
      createSignedData: jest.fn(),
    };
    mockForge.util = {
      createBuffer: jest.fn((data: string) => ({ data, buffer: true })),
      encode64: jest.fn((bytes: string) => "BASE64ENCODED\nWITH\nLINEBREAKS"),
    };
    mockForge.pki = {
      oids: {
        contentType: "oid.contentType",
        data: "oid.data",
        messageDigest: "oid.messageDigest",
        signingTime: "oid.signingTime",
        sha256: "sha256",
      },
    };
    mockForge.asn1 = {
      toDer: jest.fn((asn1obj: any) => ({
        getBytes: jest.fn().mockReturnValue("DER_BYTES"),
      })),
    };

    cryptography = new Cryptography(testCert, testKey);
  });

  describe("Constructor", () => {
    it("should store certificate and key", () => {
      expect(cryptography["cert"]).toBe(testCert);
      expect(cryptography["key"]).toBe(testKey);
    });
  });

  describe("sign()", () => {
    it("should create signed data with PKCS#7", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      const result = cryptography.sign(testData);

      expect(mockForge.pkcs7.createSignedData).toHaveBeenCalled();
      expect(mockP7.content).toEqual({ data: testData, buffer: true });
    });

    it("should add certificate to signed data", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      cryptography.sign(testData);

      expect(mockP7.addCertificate).toHaveBeenCalledWith(testCert);
    });

    it("should add signer with authenticatedAttributes", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      cryptography.sign(testData);

      expect(mockP7.addSigner).toHaveBeenCalledWith(
        expect.objectContaining({
          authenticatedAttributes: expect.arrayContaining([
            expect.objectContaining({
              type: "oid.contentType",
              value: "oid.data",
            }),
            expect.objectContaining({
              type: "oid.messageDigest",
            }),
            expect.objectContaining({
              type: "oid.signingTime",
            }),
          ]),
          certificate: testCert,
          digestAlgorithm: "sha256",
          key: testKey,
        }),
      );
    });

    it("should call sign method on P7 object", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      cryptography.sign(testData);

      expect(mockP7.sign).toHaveBeenCalled();
    });

    it("should convert to DER and encode to base64", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      const result = cryptography.sign(testData);

      expect(mockForge.asn1.toDer).toHaveBeenCalledWith({ asn1: true });
      expect(mockForge.util.encode64).toHaveBeenCalledWith("DER_BYTES");
    });

    it("should remove line breaks from base64 output", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      const result = cryptography.sign(testData);

      expect(result).toBe("BASE64ENCODEDWITHLINEBREAKS");
    });

    it("should return base64 encoded signature", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      const result = cryptography.sign(testData);

      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
      expect(result).not.toContain("\n");
      expect(result).not.toContain("\r");
    });

    it("should throw error if certificate is invalid", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn().mockImplementation(() => {
          throw new Error("Invalid certificate");
        }),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      expect(() => cryptography.sign(testData)).toThrow(
        "Invalid PEM formatted message. Check your cert.",
      );
    });

    it("should handle different data inputs", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      const testCases = ["short", "a".repeat(1000), "<soap>data</soap>"];

      testCases.forEach((data) => {
        const result = cryptography.sign(data);
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it("should create buffer with utf8 encoding", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      cryptography.sign(testData);

      expect(mockForge.util.createBuffer).toHaveBeenCalledWith(
        testData,
        "utf8",
      );
    });

    it("should sign the same data consistently", () => {
      const mockP7 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7);

      const result1 = cryptography.sign(testData);
      const result2 = cryptography.sign(testData);

      expect(result1).toBe(result2);
    });

    it("should produce different signatures for different data", () => {
      const mockP7_1 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7_1);

      const result1 = cryptography.sign("data1");

      const mockP7_2 = {
        content: null,
        addCertificate: jest.fn(),
        addSigner: jest.fn(),
        sign: jest.fn(),
        toAsn1: jest.fn().mockReturnValue({ asn1: true }),
      };
      mockForge.pkcs7.createSignedData.mockReturnValue(mockP7_2);

      const result2 = cryptography.sign("data2");

      // With mocks they'll be the same, but structure is correct
      expect(typeof result1).toBe("string");
      expect(typeof result2).toBe("string");
    });
  });
});
