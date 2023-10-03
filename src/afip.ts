import { resolve } from "path";
import { Client } from "soap";
import { AfipService } from "./services/afip.service";
import { ElectronicBillingService } from "./services/electronic-billing.service";
import { RegisterScopeFiveService } from "./services/register-scope-five.service";
import { RegisterScopeFourService } from "./services/register-scope-four.service";
import { RegisterScopeTenService } from "./services/register-scope-ten.service";
import { RegisterScopeThirteenService } from "./services/register-scope-thirteen.service";
import { Context, AfipServiceSoapParam } from "./types";

export class Afip {
  private readonly _electronicBillingService: ElectronicBillingService;
  private readonly _registerScopeFourService: RegisterScopeFourService;
  private readonly _registerScopeFiveService: RegisterScopeFiveService;
  private readonly _registerScopeTenService: RegisterScopeTenService;
  private readonly _registerScopeThirteenService: RegisterScopeThirteenService;
  private readonly context: Context;

  constructor(context: Context) {
    this.context = {
      ...context,
      ticketPath: context.ticketPath ?? resolve(__dirname, "auth", "tickets"),
    };

    this._electronicBillingService = new ElectronicBillingService(this.context);
    this._registerScopeFourService = new RegisterScopeFourService(this.context);
    this._registerScopeFiveService = new RegisterScopeFiveService(this.context);
    this._registerScopeTenService = new RegisterScopeTenService(this.context);
    this._registerScopeThirteenService = new RegisterScopeThirteenService(
      this.context
    );
  }

  get electronicBillingService(): ElectronicBillingService {
    return this._electronicBillingService;
  }

  get registerScopeFourService(): RegisterScopeFourService {
    return this._registerScopeFourService;
  }

  get registerScopeFiveService(): RegisterScopeFiveService {
    return this._registerScopeFiveService;
  }

  get registerScopeTenService(): RegisterScopeTenService {
    return this._registerScopeTenService;
  }

  get registerScopeThirteenService(): RegisterScopeThirteenService {
    return this._registerScopeThirteenService;
  }

  public genericService<T extends Client>(
    soapConfig: AfipServiceSoapParam
  ): AfipService<T> {
    return new AfipService(this.context, soapConfig);
  }
}
