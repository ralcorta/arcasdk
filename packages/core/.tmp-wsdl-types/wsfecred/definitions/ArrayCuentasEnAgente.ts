import { CtaAgente } from "./CtaAgente";

/**
 * arrayCuentasEnAgente
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gob.afip.wsfecred/FECredService/`
 */
export interface ArrayCuentasEnAgente {
    /** cuentaEnAgente[] */
    cuentaEnAgente?: Array<CtaAgente>;
}
