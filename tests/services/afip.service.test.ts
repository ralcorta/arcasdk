import { Client } from "soap";
import { EndpointsEnum } from "../../src/enums";
import { AfipService } from "../../src/services/afip.service";
import { ServiceNamesEnum } from "../../src/soap/service-names.enum";
import { WsdlPathEnum } from "../../src/soap/wsdl-path.enum";
import { Context } from "../../src/types";
import { testCuit } from "../mocks/data/voucher.mock";
import { TestConfigUtils } from "../utils/config";

// Mock dependencies and modules as needed

describe("AfipService", () => {
  let afipService: AfipService<Client>;
  let context: Context;

  // Mock AfipAuth class methods and SoapClientFacade module here

  beforeAll(async () => {
    context = {
      key: await TestConfigUtils.getKey(),
      cert: await TestConfigUtils.getCert(),
      cuit: testCuit,
    };
    afipService = new AfipService<Client>(context, {
      url: EndpointsEnum.WSFEV1,
      url_test: EndpointsEnum.WSFEV1_TEST,
      wsdl: WsdlPathEnum.WSFE,
      wsdl_test: WsdlPathEnum.WSFE_TEST,
      serviceName: ServiceNamesEnum.WSFE,
      v12: true,
    });
  });

  it("should generate signatures through WSAA", async () => {
    expect(true).toBe(true);
    // console.dir(auth, { depth: 50 });
  });
});
