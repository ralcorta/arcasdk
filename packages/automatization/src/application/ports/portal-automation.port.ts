import {
  AcceptWebServiceDelegationParams,
  AutomationResult,
  DelegateWebServiceParams,
} from "@application/types/automation.types";

export interface IPortalAutomationPort {
  delegateWebService(
    params: DelegateWebServiceParams,
  ): Promise<AutomationResult>;
  acceptWebServiceDelegation(
    params: AcceptWebServiceDelegationParams,
  ): Promise<AutomationResult>;
  close(): Promise<void>;
}
