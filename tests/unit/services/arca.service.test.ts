/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "soap";
import { EndpointsEnum, SoapServiceVersion } from "../../../src/enums";
import { ArcaService } from "../../../src/services/arca.service";
import { IServiceSoap12Soap } from "../../../src/soap/interfaces/Service/ServiceSoap12";
import { ServiceNamesEnum } from "../../../src/soap/service-names.enum";
import { WsdlPathEnum } from "../../../src/soap/wsdl-path.enum";
import { ArcaServiceSoapParam, Context } from "../../../src/types";
import { testCuit } from "../../mocks/data/voucher.mock";
import { ContextTest } from "../../utils/context-test.utils";
import { mockFn } from "../../utils/jest.utils";

describe("ArcaService", () => {
  let arcaService: ArcaService<Client>;
  let context: Context;
  let soapParams: ArcaServiceSoapParam;

  beforeAll(async () => {
    // Use integration test context which ensures production: false (homologation servers)
    context = await ContextTest.getIntegrationTestContext({
      cuit: testCuit,
    });
    soapParams = {
      url: EndpointsEnum.WSFEV1,
      url_test: EndpointsEnum.WSFEV1_TEST,
      wsdl: WsdlPathEnum.WSFE,
      wsdl_test: WsdlPathEnum.WSFE_TEST,
      serviceName: ServiceNamesEnum.WSFE,
      v12: true,
    };
  });

  it("should call ArcaAuth login method and return the result", async () => {
    arcaService = new ArcaService<Client>(context, soapParams);
    const expectedLoginResult = {
      Auth: {
        Token: "your_token",
        Sign: "your_sign",
        Cuit: 123456789,
      },
    };

    const arcaAuthMock = {
      login: jest.fn().mockResolvedValue(expectedLoginResult),
    };

    arcaService["_afipAuth"] = arcaAuthMock as any;

    const result = await arcaService.login();

    expect(result).toEqual(expectedLoginResult);
    expect(arcaAuthMock.login).toHaveBeenCalledWith(ServiceNamesEnum.WSFE);
  });

  it("should create a proxy client with the correct behavior", async () => {
    arcaService = new ArcaService<IServiceSoap12Soap>(context, soapParams);
    const methodName = "FEDummy";
    const asyncMethodName = `${methodName}Async`;
    const soapServiceContent = {
      input: {
        Auth: "auth_content",
      },
    };
    const soapServices = {
      [asyncMethodName]: soapServiceContent,
      [methodName]: soapServiceContent,
    };
    const expectedDescribeResult = {
      Service: {
        [SoapServiceVersion.ServiceSoap12]: soapServices,
        [SoapServiceVersion.ServiceSoap]: soapServices,
      },
    };
    const expectedWsAuthResult = {
      Auth: {
        Token: "your_token",
        Sign: "your_sign",
        Cuit: 123456789,
      },
    };
    const methodInput = { param1: "value1", param2: "value2" };

    const soapClientMock: any = {
      describe: jest.fn().mockReturnValue(expectedDescribeResult),
      [asyncMethodName]: mockFn(),
      [methodName]: mockFn(),
    };

    arcaService["instanceSoapClient"] = jest
      .fn()
      .mockResolvedValue(soapClientMock);

    arcaService["getWsAuth"] = jest
      .fn()
      .mockResolvedValue(expectedWsAuthResult);

    const proxyClient = await arcaService["proxySoapClient"]();

    const describeResult = proxyClient.describe();
    expect(describeResult).toEqual(expectedDescribeResult);

    await proxyClient[asyncMethodName](methodInput);

    const nonExistentMethod = "NonExistentMethod";
    const nonExistentMethodResult = proxyClient[nonExistentMethod];
    expect(nonExistentMethodResult).toBeUndefined();

    expect(soapClientMock.describe).toHaveBeenCalled();
    expect(arcaService["getWsAuth"]).toHaveBeenCalled();
  });
});
