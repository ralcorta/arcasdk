import { EventEmitter } from "events";
import { Client } from "soap";
import type { ArcaEvent } from "@application/types/events.types";
import {
  SoapEventTracker,
  redactCredentials,
  redactCredentialsDeep,
} from "@infrastructure/soap/soap-event-tracker";

const ENDPOINT = "https://wswhomo.afip.gov.ar/wsfev1/service.asmx";

function createClient(): Client & EventEmitter {
  const client = new EventEmitter() as Client & EventEmitter;
  client.lastEndpoint = ENDPOINT;
  return client;
}

// what node-soap does on a call: emit the XML with the id it got, then answer
function sendRequest(
  client: EventEmitter,
  requestId: string,
  xml = "<soap:Envelope>request</soap:Envelope>",
) {
  client.emit("request", xml, requestId);
}

describe("redactCredentials", () => {
  it("should redact Token and Sign elements, with or without prefix", () => {
    const xml =
      "<ar:Auth><ar:Token>PD94bWwg</ar:Token><ar:Sign>c2lnbg==</ar:Sign>" +
      "<ar:Cuit>20111111112</ar:Cuit></ar:Auth>";

    expect(redactCredentials(xml)).toBe(
      "<ar:Auth><ar:Token>[REDACTED]</ar:Token><ar:Sign>[REDACTED]</ar:Sign>" +
        "<ar:Cuit>20111111112</ar:Cuit></ar:Auth>",
    );
  });

  it("should redact lowercase token and sign (padrón services)", () => {
    expect(
      redactCredentials("<token>abc</token><sign>def</sign><cuit>1</cuit>"),
    ).toBe("<token>[REDACTED]</token><sign>[REDACTED]</sign><cuit>1</cuit>");
  });

  it("should redact the entity-escaped ticket returned by loginCms", () => {
    const xml =
      "<loginCmsReturn>&lt;credentials&gt;&lt;token&gt;PD94&lt;/token&gt;" +
      "&lt;sign&gt;c2ln&lt;/sign&gt;&lt;/credentials&gt;</loginCmsReturn>";

    expect(redactCredentials(xml)).toBe(
      "<loginCmsReturn>&lt;credentials&gt;&lt;token&gt;[REDACTED]&lt;/token&gt;" +
        "&lt;sign&gt;[REDACTED]&lt;/sign&gt;&lt;/credentials&gt;</loginCmsReturn>",
    );
  });

  it("should leave elements that only start with token or sign untouched", () => {
    const xml = "<tokenType>A</tokenType><signature>B</signature>";
    expect(redactCredentials(xml)).toBe(xml);
  });
});

describe("redactCredentialsDeep", () => {
  it("should redact Token and Sign properties in any case and at any depth", () => {
    const params = {
      Auth: { Token: "t", Sign: "s", Cuit: 20111111112 },
      token: "t",
      sign: "s",
      FeCAEReq: { FeDetReq: { FECAEDetRequest: [{ DocNro: 1, Token: "t" }] } },
    };

    expect(redactCredentialsDeep(params)).toEqual({
      Auth: { Token: "[REDACTED]", Sign: "[REDACTED]", Cuit: 20111111112 },
      token: "[REDACTED]",
      sign: "[REDACTED]",
      FeCAEReq: {
        FeDetReq: { FECAEDetRequest: [{ DocNro: 1, Token: "[REDACTED]" }] },
      },
    });
  });

  it("should redact credentials inside string values", () => {
    expect(
      redactCredentialsDeep({
        loginCmsReturn:
          "<credentials><token>t</token><sign>s</sign></credentials>",
      }),
    ).toEqual({
      loginCmsReturn:
        "<credentials><token>[REDACTED]</token><sign>[REDACTED]</sign></credentials>",
    });
  });

  it("should return a copy and leave the original untouched", () => {
    const date = new Date("2026-09-30T12:00:00Z");
    const original = { Auth: { Token: "t" }, list: [{ date }] };

    const copy = redactCredentialsDeep(original) as typeof original;

    expect(original.Auth.Token).toBe("t");
    expect(copy.list).not.toBe(original.list);
    expect(copy.list[0].date).toEqual(date);
    expect(copy.list[0].date).not.toBe(date);
  });

  it("should keep primitives, null and undefined as they are", () => {
    expect(redactCredentialsDeep(12)).toBe(12);
    expect(redactCredentialsDeep(null)).toBeNull();
    expect(redactCredentialsDeep(undefined)).toBeUndefined();
  });
});

describe("SoapEventTracker", () => {
  let client: Client & EventEmitter;
  let events: ArcaEvent[];
  let tracker: SoapEventTracker;

  beforeEach(() => {
    client = createClient();
    events = [];
    tracker = new SoapEventTracker(client, (event) => events.push(event));
  });

  it("should emit request and response events sharing the request id", async () => {
    const params = { FeCAEReq: { FeCabReq: { PtoVta: 3 } } };
    const response = await tracker.track(
      "wsfe",
      "FECAESolicitar",
      params,
      async (o) => {
        sendRequest(client, o.exchangeId);
        return [
          { FECAESolicitarResult: { FeCabResp: { Resultado: "A" } } },
          "<soap:Envelope>response</soap:Envelope>",
          {},
          "",
        ];
      },
    );

    expect(response[0]).toEqual({
      FECAESolicitarResult: { FeCabResp: { Resultado: "A" } },
    });
    expect(events).toHaveLength(2);
    const [request, answer] = events;
    expect(request).toEqual({
      type: "request",
      service: "wsfe",
      method: "FECAESolicitar",
      endpoint: ENDPOINT,
      requestId: expect.any(String),
      params,
      xml: "<soap:Envelope>request</soap:Envelope>",
    });
    expect(answer).toEqual({
      type: "response",
      service: "wsfe",
      method: "FECAESolicitar",
      endpoint: ENDPOINT,
      requestId: request.requestId,
      result: { FECAESolicitarResult: { FeCabResp: { Resultado: "A" } } },
      xml: "<soap:Envelope>response</soap:Envelope>",
      durationMs: expect.any(Number),
    });
  });

  it("should redact credentials in params, result and xml", async () => {
    await tracker.track(
      "wsfe",
      "FECompUltimoAutorizado",
      { Auth: { Token: "secret", Sign: "secret", Cuit: 1 } },
      async (o) => {
        sendRequest(client, o.exchangeId, "<Token>secret</Token>");
        return [
          { ticket: "<sign>secret</sign>" },
          "<Sign>secret</Sign>",
          {},
          "",
        ];
      },
    );

    const [request, response] = events;
    expect(request.type === "request" && request.params).toEqual({
      Auth: { Token: "[REDACTED]", Sign: "[REDACTED]", Cuit: 1 },
    });
    expect(request.xml).toBe("<Token>[REDACTED]</Token>");
    expect(response.type === "response" && response.result).toEqual({
      ticket: "<sign>[REDACTED]</sign>",
    });
    expect(response.xml).toBe("<Sign>[REDACTED]</Sign>");
  });

  it("should redact the signed access request sent to WSAA", async () => {
    await tracker.track(
      "wsaa",
      "loginCms",
      { in0: "MIIG8wYJKo" },
      async (o) => {
        sendRequest(
          client,
          o.exchangeId,
          "<soap:Body><impl:loginCms><in0>MIIG8wYJKo</in0></impl:loginCms></soap:Body>",
        );
        return [{ loginCmsReturn: "" }, "", {}, ""];
      },
    );

    expect(events[0]).toMatchObject({
      params: { in0: "[REDACTED]" },
      xml: "<soap:Body><impl:loginCms><in0>[REDACTED]</in0></impl:loginCms></soap:Body>",
    });
  });

  it("should not redact in0 outside WSAA", async () => {
    await tracker.track("wsfe", "FEDummy", { in0: "value" }, async (o) => {
      sendRequest(client, o.exchangeId, "<in0>value</in0>");
      return [{}, "", {}, ""];
    });

    expect(events[0]).toMatchObject({
      params: { in0: "value" },
      xml: "<in0>value</in0>",
    });
  });

  it("should not let a listener change what is sent or returned", async () => {
    const params = { PtoVta: 3 };
    const mutating = new SoapEventTracker(client, (event) => {
      if (event.type === "request") {
        (event.params as { PtoVta: number }).PtoVta = 99;
      }
      if (event.type === "response") {
        (event.result as { CAE: string }).CAE = "tampered";
      }
    });

    let sentParams: unknown;
    const response = await mutating.track(
      "wsfe",
      "FECAESolicitar",
      params,
      async (o) => {
        sendRequest(client, o.exchangeId);
        sentParams = { ...params };
        return [{ CAE: "123" }, "<r/>", {}, ""];
      },
    );

    expect(sentParams).toEqual({ PtoVta: 3 });
    expect(response[0]).toEqual({ CAE: "123" });
  });

  it("should emit an error event with the response body and rethrow", async () => {
    const fault = Object.assign(new Error("soap:Server: boom"), {
      body: "<soap:Fault><Token>secret</Token></soap:Fault>",
    });

    await expect(
      tracker.track("ws_sr_padron_a5", "getPersona_v2", {}, async (o) => {
        sendRequest(client, o.exchangeId);
        throw fault;
      }),
    ).rejects.toBe(fault);

    expect(events.map((e) => e.type)).toEqual(["request", "error"]);
    expect(events[1]).toMatchObject({
      type: "error",
      service: "ws_sr_padron_a5",
      method: "getPersona_v2",
      requestId: events[0].requestId,
      error: fault,
      xml: "<soap:Fault><Token>[REDACTED]</Token></soap:Fault>",
    });
  });

  it("should include the fault read from the XML", async () => {
    const fault = Object.assign(new Error("soap:Server: boom"), {
      root: {
        Envelope: {
          Body: {
            Fault: {
              faultcode: "soap:Server",
              faultstring: "No existe persona con ese Id",
              detail: { token: "secret" },
            },
          },
        },
      },
    });

    await expect(
      tracker.track("ws_sr_padron_a5", "getPersona_v2", {}, async () => {
        throw fault;
      }),
    ).rejects.toBe(fault);

    expect(events[0]).toMatchObject({
      type: "error",
      fault: {
        faultcode: "soap:Server",
        faultstring: "No existe persona con ese Id",
        detail: { token: "[REDACTED]" },
      },
    });
    expect(fault.root.Envelope.Body.Fault.detail.token).toBe("secret");
  });

  it("should leave fault undefined when the error has none", async () => {
    await expect(
      tracker.track("wsfe", "FEDummy", {}, async () => {
        throw new Error("ECONNRESET");
      }),
    ).rejects.toThrow("ECONNRESET");

    expect(events[0]).toMatchObject({ type: "error", fault: undefined });
  });

  it("should take the body of an HTTP error from response.data", async () => {
    const httpError = Object.assign(new Error("Request failed"), {
      response: { data: "<html>502</html>" },
    });

    await expect(
      tracker.track("wsfe", "FEDummy", {}, async () => {
        throw httpError;
      }),
    ).rejects.toBe(httpError);

    expect(events).toEqual([
      expect.objectContaining({ type: "error", xml: "<html>502</html>" }),
    ]);
  });

  it("should emit an error event without xml for a network error", async () => {
    await expect(
      tracker.track("wsfe", "FEDummy", {}, async () => {
        throw new Error("ECONNRESET");
      }),
    ).rejects.toThrow("ECONNRESET");

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ type: "error", xml: undefined });
  });

  it("should keep overlapping calls apart", async () => {
    let releaseFirst!: () => void;
    const first = tracker.track(
      "wsfe",
      "FECAESolicitar",
      { n: 1 },
      async (o) => {
        sendRequest(client, o.exchangeId, "<first/>");
        await new Promise<void>((resolve) => (releaseFirst = resolve));
        return [{ n: 1 }, "<first-response/>", {}, ""];
      },
    );
    const second = tracker.track(
      "wsfe",
      "FECompConsultar",
      { n: 2 },
      async (o) => {
        sendRequest(client, o.exchangeId, "<second/>");
        return [{ n: 2 }, "<second-response/>", {}, ""];
      },
    );
    await second;
    releaseFirst();
    await first;

    const byMethod = (method: string) =>
      events.filter((e) => e.method === method).map((e) => e.xml);
    expect(byMethod("FECAESolicitar")).toEqual([
      "<first/>",
      "<first-response/>",
    ]);
    expect(byMethod("FECompConsultar")).toEqual([
      "<second/>",
      "<second-response/>",
    ]);
    expect(new Set(events.map((e) => e.requestId)).size).toBe(2);
  });

  it("should ignore requests from calls it is not tracking", () => {
    sendRequest(client, "someone-else");
    expect(events).toHaveLength(0);
  });

  it("should not let a throwing listener break the call", async () => {
    const failing = new SoapEventTracker(client, () => {
      throw new Error("listener failed");
    });

    await expect(
      failing.track("wsfe", "FECAESolicitar", {}, async (o) => {
        sendRequest(client, o.exchangeId);
        return [{ cae: "123" }, "<r/>", {}, ""];
      }),
    ).resolves.toEqual([{ cae: "123" }, "<r/>", {}, ""]);
  });

  it("should keep the original error when a listener throws on it", async () => {
    const failing = new SoapEventTracker(client, () => {
      throw new Error("listener failed");
    });

    await expect(
      failing.track("wsfe", "FEDummy", {}, async () => {
        throw new Error("ARCA down");
      }),
    ).rejects.toThrow("ARCA down");
  });
});
