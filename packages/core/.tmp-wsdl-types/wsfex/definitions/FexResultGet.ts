import { Permisos } from "./Permisos";
import { CmpsAsoc } from "./CmpsAsoc";
import { Items } from "./Items";
import { Opcionales } from "./Opcionales";
import { Actividades } from "./Actividades";

/**
 * FEXResultGet
 * @targetNSAlias `tns`
 * @targetNamespace `http://ar.gov.afip.dif.fexv1/`
 */
export interface FexResultGet {
    /** s:long */
    Id?: number;
    /** s:string */
    Fecha_cbte?: string;
    /** s:short */
    Cbte_tipo?: number;
    /** s:int */
    Punto_vta?: number;
    /** s:long */
    Cbte_nro?: number;
    /** s:short */
    Tipo_expo?: number;
    /** s:string */
    Permiso_existente?: string;
    /** Permisos */
    Permisos?: Permisos;
    /** s:short */
    Dst_cmp?: number;
    /** s:string */
    Cliente?: string;
    /** s:long */
    Cuit_pais_cliente?: number;
    /** s:string */
    Domicilio_cliente?: string;
    /** s:string */
    Id_impositivo?: string;
    /** s:string */
    Moneda_Id?: string;
    /** s:decimal */
    Moneda_ctz?: number;
    /** s:string */
    CanMisMonExt?: string;
    /** s:string */
    Obs_comerciales?: string;
    /** s:decimal */
    Imp_total?: number;
    /** s:string */
    Obs?: string;
    /** Cmps_asoc */
    Cmps_asoc?: CmpsAsoc;
    /** s:string */
    Forma_pago?: string;
    /** s:string */
    Incoterms?: string;
    /** s:string */
    Incoterms_Ds?: string;
    /** s:short */
    Idioma_cbte?: number;
    /** Items */
    Items?: Items;
    /** s:string */
    Fecha_cbte_cae?: string;
    /** s:string */
    Fch_venc_Cae?: string;
    /** s:string */
    Cae?: string;
    /** s:string */
    Resultado?: string;
    /** s:string */
    Motivos_Obs?: string;
    /** Opcionales */
    Opcionales?: Opcionales;
    /** s:string */
    Fecha_pago?: string;
    /** Actividades */
    Actividades?: Actividades;
}
