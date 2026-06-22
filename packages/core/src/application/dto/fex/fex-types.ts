/**
 * Application-layer SOAP DTOs for FEXService.
 * Mirrors WSDL codegen shapes without importing infrastructure.
 */
export interface IFEXAuthorizeInput {
    Cmp: {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fecha_cbte: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_Tipo: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Punto_vta: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_nro: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Tipo_expo: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Permiso_existente: string;
        Permisos: FexSoapTypes.IPermisos;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Dst_cmp: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cliente: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cuit_pais_cliente: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Domicilio_cliente: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Id_impositivo: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Moneda_Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Moneda_ctz: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        CanMisMonExt: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Obs_comerciales: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Imp_total: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Obs: string;
        Cmps_asoc: FexSoapTypes.ICmps_asoc;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Forma_pago: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Incoterms: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Incoterms_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Idioma_cbte: number;
        Items: FexSoapTypes.IItems;
        Opcionales: FexSoapTypes.IOpcionales;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fecha_pago: string;
        Actividades: FexSoapTypes.IActividades;
    };
}

export interface IFEXAuthorizeOutput {
    FEXAuthorizeResult: FexSoapTypes.IFEXAuthorizeResult;
}

export interface IFEXGetCMPInput {
    Cmp: {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_tipo: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Punto_vta: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_nro: number;
    };
}

export interface IFEXGetCMPOutput {
    FEXGetCMPResult: FexSoapTypes.IFEXGetCMPResult;
}

export interface IFEXGetPARAM_Cbte_TipoInput {
}

export interface IFEXGetPARAM_Cbte_TipoOutput {
    FEXGetPARAM_Cbte_TipoResult: FexSoapTypes.IFEXGetPARAM_Cbte_TipoResult;
}

export interface IFEXGetPARAM_Tipo_ExpoInput {
}

export interface IFEXGetPARAM_Tipo_ExpoOutput {
    FEXGetPARAM_Tipo_ExpoResult: FexSoapTypes.IFEXGetPARAM_Tipo_ExpoResult;
}

export interface IFEXGetPARAM_IncotermsInput {
}

export interface IFEXGetPARAM_IncotermsOutput {
    FEXGetPARAM_IncotermsResult: FexSoapTypes.IFEXGetPARAM_IncotermsResult;
}

export interface IFEXGetPARAM_IdiomasInput {
}

export interface IFEXGetPARAM_IdiomasOutput {
    FEXGetPARAM_IdiomasResult: FexSoapTypes.IFEXGetPARAM_IdiomasResult;
}

export interface IFEXGetPARAM_UMedInput {
}

export interface IFEXGetPARAM_UMedOutput {
    FEXGetPARAM_UMedResult: FexSoapTypes.IFEXGetPARAM_UMedResult;
}

export interface IFEXGetPARAM_DST_paisInput {
}

export interface IFEXGetPARAM_DST_paisOutput {
    FEXGetPARAM_DST_paisResult: FexSoapTypes.IFEXGetPARAM_DST_paisResult;
}

export interface IFEXGetPARAM_DST_CUITInput {
}

export interface IFEXGetPARAM_DST_CUITOutput {
    FEXGetPARAM_DST_CUITResult: FexSoapTypes.IFEXGetPARAM_DST_CUITResult;
}

export interface IFEXGetPARAM_MONInput {
}

export interface IFEXGetPARAM_MONOutput {
    FEXGetPARAM_MONResult: FexSoapTypes.IFEXGetPARAM_MONResult;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONInput {
    /** s:string(undefined) */
    Fecha_CTZ: string;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONOutput {
    FEXGetPARAM_MON_CON_COTIZACIONResult: FexSoapTypes.IFEXGetPARAM_MON_CON_COTIZACIONResult;
}

export interface IFEXGetLast_CMPInput {
}

export interface IFEXGetLast_CMPOutput {
    FEXGetLast_CMPResult: FexSoapTypes.IFEXGetLast_CMPResult;
}

export interface IFEXDummyInput {}

export interface IFEXDummyOutput {
    FEXDummyResult: FexSoapTypes.IFEXDummyResult;
}

export interface IFEXGetPARAM_CtzInput {
    /** s:string(undefined) */
    Mon_id: string;
    /** s:string(undefined) */
    FchCotiz: string;
}

export interface IFEXGetPARAM_CtzOutput {
    FEXGetPARAM_CtzResult: FexSoapTypes.IFEXGetPARAM_CtzResult;
}

export interface IFEXGetLast_IDInput {
}

export interface IFEXGetLast_IDOutput {
    FEXGetLast_IDResult: FexSoapTypes.IFEXGetLast_IDResult;
}

export interface IFEXGetPARAM_PtoVentaInput {
}

export interface IFEXGetPARAM_PtoVentaOutput {
    FEXGetPARAM_PtoVentaResult: FexSoapTypes.IFEXGetPARAM_PtoVentaResult;
}

export interface IFEXCheck_PermisoInput {
    /** s:string(undefined) */
    ID_Permiso: string;
    /** s: number(undefined) */
    Dst_merc: number;
}

export interface IFEXCheck_PermisoOutput {
    FEXCheck_PermisoResult: FexSoapTypes.IFEXCheck_PermisoResult;
}

export interface IFEXGetPARAM_OpcionalesInput {
}

export interface IFEXGetPARAM_OpcionalesOutput {
    FEXGetPARAM_OpcionalesResult: FexSoapTypes.IFEXGetPARAM_OpcionalesResult;
}

export interface IFEXGetPARAM_ActividadesInput {
}

export interface IFEXGetPARAM_ActividadesOutput {
    FEXGetPARAM_ActividadesResult: FexSoapTypes.IFEXGetPARAM_ActividadesResult;
}

export namespace FexSoapTypes {
    export interface IPermiso {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Id_permiso: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Dst_merc: number;
    }
    export interface IPermisos {
        Permiso: FexSoapTypes.IPermiso[];
    }
    export interface ICmp_asoc {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_tipo: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_punto_vta: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_nro: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_cuit: number;
    }
    export interface ICmps_asoc {
        Cmp_asoc: Array<FexSoapTypes.ICmp_asoc>;
    }
    export interface IItem {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pro_codigo: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pro_ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Pro_qty: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Pro_umed: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Pro_precio_uni: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Pro_bonificacion: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Pro_total_item: number;
    }
    export interface IItems {
        Item: FexSoapTypes.IItem[];
    }
    export interface IOpcional {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: FexSoapTypes.IOpcional[];
    }
    export interface IActividad {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Id: number;
    }
    export interface IActividades {
        Actividad: FexSoapTypes.IActividad[];
    }
    export interface IFEXResultAuth {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cuit: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_tipo: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Punto_vta: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_nro: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cae: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fch_venc_Cae: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fch_cbte: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Resultado: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Reproceso: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Motivos_Obs: string;
    }
    export interface IFEXErr {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        ErrCode: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        ErrMsg: string;
    }
    export interface IFEXEvents {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        EventCode: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        EventMsg: string;
    }
    export interface IFEXAuthorizeResult {
        FEXResultAuth: FexSoapTypes.IFEXResultAuth;
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IFEXGetCMPResult {
        FEXResultGet: {
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Id: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Fecha_cbte: string;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Cbte_tipo: number;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Punto_vta: number;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Cbte_nro: number;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Tipo_expo: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Permiso_existente: string;
            Permisos: FexSoapTypes.IPermisos;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Dst_cmp: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Cliente: string;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Cuit_pais_cliente: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Domicilio_cliente: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Id_impositivo: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Moneda_Id: string;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Moneda_ctz: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            CanMisMonExt: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Obs_comerciales: string;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Imp_total: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Obs: string;
            Cmps_asoc: FexSoapTypes.ICmps_asoc;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Forma_pago: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Incoterms: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Incoterms_Ds: string;
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Idioma_cbte: number;
            Items: FexSoapTypes.IItems;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Fecha_cbte_cae: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Fch_venc_Cae: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Cae: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Resultado: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Motivos_Obs: string;
            Opcionales: FexSoapTypes.IOpcionales;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Fecha_pago: string;
            Actividades: FexSoapTypes.IActividades;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Cbte_Tipo {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_vig_hasta: string;
    }
    export interface IFEXGetPARAM_Cbte_TipoResult {
        FEXResultGet: {
            ClsFEXResponse_Cbte_Tipo: Array<FexSoapTypes.IClsFEXResponse_Cbte_Tipo>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Tex {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Tex_Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Tex_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Tex_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Tex_vig_hasta: string;
    }
    export interface IFEXGetPARAM_Tipo_ExpoResult {
        FEXResultGet: {
            ClsFEXResponse_Tex: Array<FexSoapTypes.IClsFEXResponse_Tex>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Inc {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Inc_Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Inc_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Inc_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Inc_vig_hasta: string;
    }
    export interface IFEXGetPARAM_IncotermsResult {
        FEXResultGet: {
            ClsFEXResponse_Inc: Array<FexSoapTypes.IClsFEXResponse_Inc>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Idi {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Idi_Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Idi_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Idi_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Idi_vig_hasta: string;
    }
    export interface IFEXGetPARAM_IdiomasResult {
        FEXResultGet: {
            ClsFEXResponse_Idi: Array<FexSoapTypes.IClsFEXResponse_Idi>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_UMed {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Umed_Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Umed_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Umed_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Umed_vig_hasta: string;
    }
    export interface IFEXGetPARAM_UMedResult {
        FEXResultGet: {
            ClsFEXResponse_UMed: Array<FexSoapTypes.IClsFEXResponse_UMed>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_DST_pais {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        DST_Codigo: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        DST_Ds: string;
    }
    export interface IFEXGetPARAM_DST_paisResult {
        FEXResultGet: {
            ClsFEXResponse_DST_pais: Array<FexSoapTypes.IClsFEXResponse_DST_pais>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_DST_cuit {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        DST_CUIT: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        DST_Ds: string;
    }
    export interface IFEXGetPARAM_DST_CUITResult {
        FEXResultGet: {
            ClsFEXResponse_DST_cuit: Array<FexSoapTypes.IClsFEXResponse_DST_cuit>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Mon {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_vig_hasta: string;
    }
    export interface IFEXGetPARAM_MONResult {
        FEXResultGet: {
            ClsFEXResponse_Mon: Array<FexSoapTypes.IClsFEXResponse_Mon>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Mon_CON_Cotizacion {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Mon_ctz: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fecha_ctz: string;
    }
    export interface IFEXGetPARAM_MON_CON_COTIZACIONResult {
        FEXResultGet: {
            ClsFEXResponse_Mon_CON_Cotizacion: Array<FexSoapTypes.IClsFEXResponse_Mon_CON_Cotizacion>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IFEXResult_LastCMP {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Cbte_nro: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_fecha: string;
    }
    export interface IFEXGetLast_CMPResult {
        FEXResult_LastCMP: FexSoapTypes.IFEXResult_LastCMP;
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IFEXDummyResult {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        AppServer: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        DbServer: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        AuthServer: string;
    }
    export interface IFEXGetPARAM_CtzResult {
        FEXResultGet: {
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Mon_ctz: number;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Mon_fecha: string;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IFEXGetLast_IDResult {
        FEXResultGet: {
            /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
            Id: number;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_PtoVenta {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Pve_Nro: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pve_Bloqueado: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pve_FchBaja: string;
    }
    export interface IFEXGetPARAM_PtoVentaResult {
        FEXResultGet: {
            ClsFEXResponse_PtoVenta: Array<FexSoapTypes.IClsFEXResponse_PtoVenta>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IFEXCheck_PermisoResult {
        FEXResultGet: {
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Status: string;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Opc {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Opc_Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Opc_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Opc_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Opc_vig_hasta: string;
    }
    export interface IFEXGetPARAM_OpcionalesResult {
        FEXResultGet: {
            ClsFEXResponse_Opc: Array<FexSoapTypes.IClsFEXResponse_Opc>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_ActividadTipo {
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Id: number;
        /** http://ar.gov.afip.dif.fexv1/#s: number(undefined) */
        Orden: number;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Desc: string;
    }
    export interface IFEXGetPARAM_ActividadesResult {
        FEXResultGet: {
            ClsFEXResponse_ActividadTipo: Array<FexSoapTypes.IClsFEXResponse_ActividadTipo>;
        };
        FEXErr: FexSoapTypes.IFEXErr;
        FEXEvents: FexSoapTypes.IFEXEvents;
    }
}
