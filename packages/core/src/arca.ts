/**
 * Arca - Main Facade Class
 * Entry point for the ARCA SDK
 * Orchestrates all services and adapters using hexagonal architecture
 */
import { resolve } from "path";
import { Context } from "@application/types";
import { FileSystemTicketStorage } from "@infrastructure/outbound/adapters/storage/file-system-ticket-storage";
import { AuthRepository } from "@infrastructure/outbound/adapters/auth/auth.repository";
import { WinstonLogger } from "@infrastructure/outbound/adapters/logger/winston-logger";
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IRegisterRepositoryPort } from "@application/ports/register/register-repository.port";
import { ElectronicBillingService } from "@application/services/electronic-billing.service";
import { RegisterScopeFourService } from "@application/services/register-scope-four.service";
import { RegisterScopeFiveService } from "@application/services/register-scope-five.service";
import { RegisterScopeTenService } from "@application/services/register-scope-ten.service";
import { RegisterScopeThirteenService } from "@application/services/register-scope-thirteen.service";
import { RegisterInscriptionProofService } from "@application/services/register-inscription-proof.service";
import { ElectronicBillingRepository } from "@infrastructure/outbound/adapters/electronic-billing/electronic-billing-repository";
import { RegisterRepository } from "@infrastructure/outbound/adapters/register/register-repository";

export class Arca {
  private readonly _electronicBillingService: ElectronicBillingService;
  private readonly _registerInscriptionProofService: RegisterInscriptionProofService;
  private readonly _registerScopeFourService: RegisterScopeFourService;
  private readonly _registerScopeFiveService: RegisterScopeFiveService;
  private readonly _registerScopeTenService: RegisterScopeTenService;
  private readonly _registerScopeThirteenService: RegisterScopeThirteenService;
  private readonly context: Context;

  constructor(context: Context) {
    // Normalize context
    this.context = {
      ...context,
      ticketPath:
        context.ticketPath ??
        resolve(__dirname, "infrastructure", "storage", "auth", "tickets"),
    };

    const ticketStorage = new FileSystemTicketStorage({
      ticketPath: this.context.ticketPath!,
      cuit: this.context.cuit,
      production: this.context.production ?? false,
    });
    const authRepository: IAuthenticationRepositoryPort = new AuthRepository({
      cert: this.context.cert,
      key: this.context.key,
      cuit: this.context.cuit,
      production: this.context.production ?? false,
      handleTicket: this.context.handleTicket ?? false,
      ticketStorage: this.context.handleTicket ? undefined : ticketStorage,
      credentials: this.context.credentials,
    });
    const logger = new WinstonLogger({
      enableLogging: this.context.enableLogging ?? false,
    });

    const electronicBillingRepository: IElectronicBillingRepositoryPort =
      new ElectronicBillingRepository({
        authRepository,
        logger,
        cuit: this.context.cuit,
        production: this.context.production ?? false,
        useSoap12: this.context.useSoap12 ?? true, // Default to SOAP 1.2
      });

    const registerRepository: IRegisterRepositoryPort = new RegisterRepository({
      authRepository,
      logger,
      cuit: this.context.cuit,
      production: this.context.production ?? false,
    });

    this._electronicBillingService = new ElectronicBillingService(
      electronicBillingRepository
    );
    this._registerInscriptionProofService = new RegisterInscriptionProofService(
      registerRepository
    );
    this._registerScopeFourService = new RegisterScopeFourService(
      registerRepository
    );
    this._registerScopeFiveService = new RegisterScopeFiveService(
      registerRepository
    );
    this._registerScopeTenService = new RegisterScopeTenService(
      registerRepository
    );
    this._registerScopeThirteenService = new RegisterScopeThirteenService(
      registerRepository
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
}
