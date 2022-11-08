import { resolve } from "path";
import { AfipContext, Context } from "./afip-context";
import { ElectronicBillingService } from "./services/electronic-billing.service";
import { RegisterScopeFiveService } from "./services/register-scope-five.service";
import { RegisterScopeFourService } from "./services/register-scope-four.service";
import { RegisterScopeTenService } from "./services/register-scope-ten.service";
import { RegisterScopeThirteenService } from "./services/register-scope-thirteen.service";

export class Afip {
  private readonly _electronicBillingService: ElectronicBillingService;
  private readonly _registerScopeFourService: RegisterScopeFourService;
  private readonly _registerScopeFiveService: RegisterScopeFiveService;
  private readonly _registerScopeTenService: RegisterScopeTenService;
  private readonly _registerScopeTThirteenService: RegisterScopeThirteenService;
  private readonly context: AfipContext;

  constructor(context: Context) {
    this.context = {
      ...context,
      ticketPath: context.ticketPath ?? resolve(__dirname, "auth", "tickets"),
    };

    this._electronicBillingService = new ElectronicBillingService(this.context);
    this._registerScopeFourService = new RegisterScopeFourService(this.context);
    this._registerScopeFiveService = new RegisterScopeFiveService(this.context);
    this._registerScopeTenService = new RegisterScopeTenService(this.context);
    this._registerScopeTThirteenService = new RegisterScopeThirteenService(
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

  get registerScopeTThirteenService(): RegisterScopeThirteenService {
    return this._registerScopeTThirteenService;
  }
}
