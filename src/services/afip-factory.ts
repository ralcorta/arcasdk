import { Client } from "soap";
import { AfipContext, AfipServiceSoapParam } from "../types";
import { AfipService } from "./afip.service";

export class AfipFactory {
  static async instance<T extends Client>(
    context: AfipContext,
    soapParams: AfipServiceSoapParam
  ): Promise<AfipService<T>> {
    const afipService = new AfipService<T>(context, soapParams);
    await afipService.getClient();
    return afipService;
  }
}
