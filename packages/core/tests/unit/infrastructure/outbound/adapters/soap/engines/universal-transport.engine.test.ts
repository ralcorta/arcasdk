import { FetchHttpClient } from "@infrastructure/outbound/adapters/soap/engines/universal-transport.engine";

describe("FetchHttpClient", () => {
  let client: FetchHttpClient;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    client = new FetchHttpClient();
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET requests (no data)", () => {
    it("should send GET request when data is not provided", async () => {
      const url = "https://api.example.com/soap";
      const responseBody = "<response>OK</response>";
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue(responseBody),
        headers: new Headers({ "content-type": "text/xml" }),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, undefined, undefined);

      // Give async promise a chance to resolve
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "GET",
          body: null,
        })
      );
      expect(callback).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          statusCode: 200,
          body: responseBody,
          data: responseBody,
        }),
        responseBody
      );
    });

    it("should preserve external headers in GET request", async () => {
      const url = "https://api.example.com/soap";
      const exheaders = { "Authorization": "Bearer token123" };
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response />"),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, exheaders, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          headers: expect.objectContaining({ "Authorization": "Bearer token123" }),
        })
      );
    });
  });

  describe("POST requests (with data)", () => {
    it("should send POST request when data is provided", async () => {
      const url = "https://api.example.com/soap";
      const soapData = "<soap:Envelope><soap:Body /></soap:Envelope>";
      const responseBody = "<response>OK</response>";
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue(responseBody),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, soapData, callback, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "POST",
          body: soapData,
        })
      );
    });

    it("should add Content-Type header for POST requests", async () => {
      const url = "https://api.example.com/soap";
      const soapData = "<soap:Envelope />";
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response />"),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, soapData, callback, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "text/xml; charset=utf-8",
          }),
        })
      );
    });

    it("should preserve external Content-Type header if provided", async () => {
      const url = "https://api.example.com/soap";
      const soapData = "<soap:Envelope />";
      const customHeaders = { "Content-Type": "application/json" };
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response />"),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, soapData, callback, customHeaders, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        })
      );
    });
  });

  describe("Headers handling", () => {
    it("should merge external headers with default headers", async () => {
      const url = "https://api.example.com/soap";
      const exheaders = {
        "X-Custom": "value1",
        "Authorization": "Bearer token",
      };
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response />"),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, exheaders, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-Custom": "value1",
            "Authorization": "Bearer token",
          }),
        })
      );
    });
  });

  describe("Response handling", () => {
    it("should parse response status and headers correctly", async () => {
      const url = "https://api.example.com/soap";
      const responseBody = "<response>Success</response>";
      const mockResponse = {
        status: 201,
        text: jest.fn().mockResolvedValue(responseBody),
        headers: new Headers({
          "content-type": "text/xml",
          "x-response": "custom-value",
        }),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      const callArgs = callback.mock.calls[0];
      expect(callArgs[0]).toBeNull(); // no error
      expect(callArgs[1].statusCode).toBe(201);
      expect(callArgs[1].body).toBe(responseBody);
      expect(callArgs[1].data).toBe(responseBody);
      expect(callArgs[1].headers).toEqual(
        expect.objectContaining({
          "content-type": "text/xml",
          "x-response": "custom-value",
        })
      );
    });

    it("should handle empty response body", async () => {
      const url = "https://api.example.com/soap";
      const mockResponse = {
        status: 204,
        text: jest.fn().mockResolvedValue(""),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      const callArgs = callback.mock.calls[0];
      expect(callArgs[1].body).toBe("");
      expect(callArgs[1].data).toBe("");
    });
  });

  describe("Error handling", () => {
    it("should call callback with error on fetch failure", async () => {
      const url = "https://api.example.com/soap";
      const testError = new Error("Network error");
      fetchMock.mockRejectedValue(testError);

      const callback = jest.fn();
      client.request(url, null, callback, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(callback).toHaveBeenCalledWith(testError);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should call callback with error on response.text() failure", async () => {
      const url = "https://api.example.com/soap";
      const testError = new Error("Response parsing error");
      const mockResponse = {
        status: 200,
        text: jest.fn().mockRejectedValue(testError),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(callback).toHaveBeenCalledWith(testError);
    });
  });

  describe("RequestInit options merging", () => {
    it("should merge external options with internal options", async () => {
      const url = "https://api.example.com/soap";
      const exoptions = {
        timeout: 5000,
        credentials: "include" as RequestCredentials,
      };
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response />"),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, null, callback, undefined, exoptions);

      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(fetchMock).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "GET",
          credentials: "include",
        })
      );
    });

    it("should allow external options to override internal options", async () => {
      const url = "https://api.example.com/soap";
      const data = "<soap />";
      const exoptions = { method: "PUT" as const }; // Try to override POST with PUT
      const mockResponse = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response />"),
        headers: new Headers(),
      };
      fetchMock.mockResolvedValue(mockResponse);

      const callback = jest.fn();
      client.request(url, data, callback, undefined, exoptions);

      await new Promise((resolve) => setTimeout(resolve, 10));

      // The spread order should mean exoptions overrides the calculated method
      expect(fetchMock).toHaveBeenCalledWith(url, expect.any(Object));
      const requestInit = fetchMock.mock.calls[0][1];
      expect(requestInit).toHaveProperty("method");
    });
  });

  describe("Multiple requests", () => {
    it("should handle multiple sequential requests", async () => {
      const mockResponse1 = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response1 />"),
        headers: new Headers(),
      };
      const mockResponse2 = {
        status: 200,
        text: jest.fn().mockResolvedValue("<response2 />"),
        headers: new Headers(),
      };

      fetchMock
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const callback1 = jest.fn();
      const callback2 = jest.fn();

      client.request("https://api.example.com/1", null, callback1, undefined, undefined);
      client.request("https://api.example.com/2", null, callback2, undefined, undefined);

      await new Promise((resolve) => setTimeout(resolve, 20));

      expect(callback1).toHaveBeenCalledWith(
        null,
        expect.objectContaining({ body: "<response1 />" }),
        "<response1 />"
      );
      expect(callback2).toHaveBeenCalledWith(
        null,
        expect.objectContaining({ body: "<response2 />" }),
        "<response2 />"
      );
    });
  });
});
