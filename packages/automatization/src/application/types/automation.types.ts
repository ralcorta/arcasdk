/**
 * Parameters for delegating a web service to another CUIT.
 * The delegating CUIT authorizes another CUIT to use a web service on their behalf.
 */
export interface DelegateWebServiceParams {
  /** CUIT to operate as on the ARCA portal */
  cuit: string;
  /** CUIT used for login. Usually same as `cuit`, but your own CUIT when managing a society */
  username: string;
  /** Clave fiscal password for ARCA login */
  password: string;
  /** Web service ID to delegate (e.g. 'wsfe', 'ws_sr_padron_a13') */
  service: string;
  /** CUIT to delegate the web service to */
  delegateTo: string;
}

/**
 * Parameters for accepting a web service delegation from another CUIT.
 * After another CUIT delegates a web service, the receiving CUIT accepts it.
 */
export interface AcceptWebServiceDelegationParams {
  /** CUIT to operate as on the ARCA portal */
  cuit: string;
  /** CUIT used for login. Usually same as `cuit`, but your own CUIT when managing a society */
  username: string;
  /** Clave fiscal password for ARCA login */
  password: string;
  /** Web service ID that was delegated (e.g. 'wsfe', 'ws_sr_padron_a13') */
  service: string;
  /** CUIT that delegated the web service to you */
  delegatedCuit: string;
}

export type AutomationStatus = "complete" | "error";

export interface AutomationResult<
  T = { status: "created" | "accepted" | "already_exists" },
> {
  status: AutomationStatus;
  data?: T;
  error?: string;
}
