import { IPortalAutomationPort } from "@application/ports/portal-automation.port";
import {
  AcceptWebServiceDelegationParams,
  AutomationResult,
  DelegateWebServiceParams,
} from "@application/types/automation.types";

export class AutomationService {
  constructor(private readonly portalAdapter: IPortalAutomationPort) {}

  /**
   * Delegate a web service to another CUIT.
   *
   * The CUIT specified in params.cuit authorizes params.delegateTo
   * to use the web service on their behalf.
   *
   * @example
   * ```ts
   * const result = await automationService.delegateWebService({
   *   cuit: '20111111112',
   *   username: '20111111112',
   *   password: 'mypassword',
   *   service: 'wsfe',
   *   delegateTo: '20222222223',
   * });
   * ```
   */
  async delegateWebService(
    params: DelegateWebServiceParams,
  ): Promise<AutomationResult> {
    return this.portalAdapter.delegateWebService(params);
  }

  /**
   * Accept a pending web service delegation from another CUIT.
   *
   * After another CUIT delegates a web service to you, use this
   * method to accept the delegation.
   *
   * @example
   * ```ts
   * const result = await automationService.acceptWebServiceDelegation({
   *   cuit: '20222222223',
   *   username: '20222222223',
   *   password: 'mypassword',
   *   service: 'wsfe',
   *   delegatedCuit: '20111111112',
   * });
   * ```
   */
  async acceptWebServiceDelegation(
    params: AcceptWebServiceDelegationParams,
  ): Promise<AutomationResult> {
    return this.portalAdapter.acceptWebServiceDelegation(params);
  }

  /**
   * Close any open browser instances.
   */
  async close(): Promise<void> {
    return this.portalAdapter.close();
  }
}
