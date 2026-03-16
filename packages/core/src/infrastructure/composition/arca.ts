/**
 * Arca - Main Facade Class
 * Entry point for the ARCA SDK
 * Orchestrates all services and adapters using hexagonal architecture
 */
import { resolve } from "path";
import { Context } from "@application/types";
import { FileSystemTicketStorage } from "@infrastructure/outbound/adapters/storage/file-system-ticket-storage";
import { AuthRepository } from "@infrastructure/outbound/adapters/auth/auth.repository";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ElectronicBillingService } from "@application/services/electronic-billing.service";
import { RegisterScopeFourService } from "@application/services/register-scope-four.service";
import { RegisterScopeFiveService } from "@application/services/register-scope-five.service";
import { RegisterScopeTenService } from "@application/services/register-scope-ten.service";
import { RegisterScopeThirteenService } from "@application/services/register-scope-thirteen.service";
import { RegisterInscriptionProofService } from "@application/services/register-inscription-proof.service";
import { ElectronicBillingRepository } from "@infrastructure/outbound/adapters/electronic-billing/electronic-billing-repository";
import { RegisterScopeFourRepository } from "@infrastructure/outbound/adapters/register/register-scope-four.repository";
import { RegisterScopeFiveRepository } from "@infrastructure/outbound/adapters/register/register-scope-five.repository";
import { RegisterScopeTenRepository } from "@infrastructure/outbound/adapters/register/register-scope-ten.repository";
import { RegisterScopeThirteenRepository } from "@infrastructure/outbound/adapters/register/register-scope-thirteen.repository";
import { RegisterInscriptionProofRepository } from "@infrastructure/outbound/adapters/register/register-inscription-proof.repository";
import { GenericService } from "@application/services/generic.service";
import { GenericRepository } from "@infrastructure/outbound/adapters/generic/generic-repository";
import { DEFAULT_USE_HTTPS_AGENT } from "@infrastructure/constants";

export class Arca {
  private readonly _electronicBillingService: ElectronicBillingService;
  private readonly _registerInscriptionProofService: RegisterInscriptionProofService;
  private readonly _registerScopeFourService: RegisterScopeFourService;
  private readonly _registerScopeFiveService: RegisterScopeFiveService;
  private readonly _registerScopeTenService: RegisterScopeTenService;
  private readonly _registerScopeThirteenService: RegisterScopeThirteenService;
  private readonly _genericService: GenericService;
  private readonly context: Context;

  constructor(context: Context) {
    this.context = {
      ...context,
      ticketPath:
        context.ticketPath ??
        resolve(__dirname, "..", "storage", "auth", "tickets"),
    };

    const useHttpsAgent = this.context.useHttpsAgent ?? DEFAULT_USE_HTTPS_AGENT;

    const authRepository: IAuthenticationRepositoryPort = new AuthRepository({
      cert: this.context.cert,
      key: this.context.key,
      cuit: this.context.cuit,
      production: this.context.production ?? false,
      handleTicket: this.context.handleTicket ?? false,
      ticketStorage: this.context.handleTicket
        ? undefined
        : new FileSystemTicketStorage({
            ticketPath: this.context.ticketPath!,
            cuit: this.context.cuit,
            production: this.context.production ?? false,
          }),
      credentials: this.context.credentials,
      useHttpsAgent,
    });

    const baseRepositoryConfig = {
      authRepository,
      cuit: this.context.cuit,
      production: this.context.production ?? false,
      useHttpsAgent,
    };

    const soapConfig = {
      ...baseRepositoryConfig,
      useSoap12: this.context.useSoap12 ?? true,
    };

    this._electronicBillingService = new ElectronicBillingService(
      new ElectronicBillingRepository(soapConfig),
    );
    this._registerInscriptionProofService = new RegisterInscriptionProofService(
      new RegisterInscriptionProofRepository(baseRepositoryConfig),
    );
    this._registerScopeFourService = new RegisterScopeFourService(
      new RegisterScopeFourRepository(baseRepositoryConfig),
    );
    this._registerScopeFiveService = new RegisterScopeFiveService(
      new RegisterScopeFiveRepository(baseRepositoryConfig),
    );
    this._registerScopeTenService = new RegisterScopeTenService(
      new RegisterScopeTenRepository(baseRepositoryConfig),
    );
    this._registerScopeThirteenService = new RegisterScopeThirteenService(
      new RegisterScopeThirteenRepository(baseRepositoryConfig),
    );
    this._genericService = new GenericService(
      new GenericRepository(soapConfig),
    );
  }

  get electronicBillingService(): ElectronicBillingService {
    return this._electronicBillingService;
  }

  get registerInscriptionProofService(): RegisterInscriptionProofService {
    return this._registerInscriptionProofService;
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

  get genericService(): GenericService {
    return this._genericService;
  }
}
