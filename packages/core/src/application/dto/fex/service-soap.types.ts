/**
 * SOAP DTOs generated from WSDL. Do not edit manually.
 * Regenerate: npm run generate:soap-interfaces
 */
export interface IFEXAuthorizeInput {
    Cmp: {
        Id: number;
        Fecha_cbte: string;
        Cbte_Tipo: number;
        Punto_vta: number;
        Cbte_nro: number;
        Tipo_expo: number;
        Permiso_existente: string;
        Permisos: ServiceSoapTypes.IPermisos;
        Dst_cmp: number;
        Cliente: string;
        Cuit_pais_cliente: number;
        Domicilio_cliente: string;
        Id_impositivo: string;
        Moneda_Id: string;
        Moneda_ctz: number;
        CanMisMonExt: string;
        Obs_comerciales: string;
        Imp_total: number;
        Obs: string;
        Cmps_asoc: ServiceSoapTypes.ICmps_asoc;
        Forma_pago: string;
        Incoterms: string;
        Incoterms_Ds: string;
        Idioma_cbte: number;
        Items: ServiceSoapTypes.IItems;
        Opcionales: ServiceSoapTypes.IOpcionales;
        Fecha_pago: string;
        Actividades: ServiceSoapTypes.IActividades;
    };
}

export interface IFEXAuthorizeOutput {
    FEXAuthorizeResult: ServiceSoapTypes.IFEXAuthorizeResult;
}

export interface IFEXGetCMPInput {
    Cmp: {
        Cbte_tipo: number;
        Punto_vta: number;
        Cbte_nro: number;
    };
}

export interface IFEXGetCMPOutput {
    FEXGetCMPResult: ServiceSoapTypes.IFEXGetCMPResult;
}

export interface IFEXGetPARAM_Cbte_TipoInput {
}

export interface IFEXGetPARAM_Cbte_TipoOutput {
    FEXGetPARAM_Cbte_TipoResult: ServiceSoapTypes.IFEXGetPARAM_Cbte_TipoResult;
}

export interface IFEXGetPARAM_Tipo_ExpoInput {
}

export interface IFEXGetPARAM_Tipo_ExpoOutput {
    FEXGetPARAM_Tipo_ExpoResult: ServiceSoapTypes.IFEXGetPARAM_Tipo_ExpoResult;
}

export interface IFEXGetPARAM_IncotermsInput {
}

export interface IFEXGetPARAM_IncotermsOutput {
    FEXGetPARAM_IncotermsResult: ServiceSoapTypes.IFEXGetPARAM_IncotermsResult;
}

export interface IFEXGetPARAM_IdiomasInput {
}

export interface IFEXGetPARAM_IdiomasOutput {
    FEXGetPARAM_IdiomasResult: ServiceSoapTypes.IFEXGetPARAM_IdiomasResult;
}

export interface IFEXGetPARAM_UMedInput {
}

export interface IFEXGetPARAM_UMedOutput {
    FEXGetPARAM_UMedResult: ServiceSoapTypes.IFEXGetPARAM_UMedResult;
}

export interface IFEXGetPARAM_DST_paisInput {
}

export interface IFEXGetPARAM_DST_paisOutput {
    FEXGetPARAM_DST_paisResult: ServiceSoapTypes.IFEXGetPARAM_DST_paisResult;
}

export interface IFEXGetPARAM_DST_CUITInput {
}

export interface IFEXGetPARAM_DST_CUITOutput {
    FEXGetPARAM_DST_CUITResult: ServiceSoapTypes.IFEXGetPARAM_DST_CUITResult;
}

export interface IFEXGetPARAM_MONInput {
}

export interface IFEXGetPARAM_MONOutput {
    FEXGetPARAM_MONResult: ServiceSoapTypes.IFEXGetPARAM_MONResult;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONInput {
    Fecha_CTZ: string;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONOutput {
    FEXGetPARAM_MON_CON_COTIZACIONResult: ServiceSoapTypes.IFEXGetPARAM_MON_CON_COTIZACIONResult;
}

export interface IFEXGetLast_CMPInput {
}

export interface IFEXGetLast_CMPOutput {
    FEXGetLast_CMPResult: ServiceSoapTypes.IFEXGetLast_CMPResult;
}

export interface IFEXDummyInput {}

export interface IFEXDummyOutput {
    FEXDummyResult: ServiceSoapTypes.IFEXDummyResult;
}

export interface IFEXGetPARAM_CtzInput {
    Mon_id: string;
    FchCotiz: string;
}

export interface IFEXGetPARAM_CtzOutput {
    FEXGetPARAM_CtzResult: ServiceSoapTypes.IFEXGetPARAM_CtzResult;
}

export interface IFEXGetLast_IDInput {
}

export interface IFEXGetLast_IDOutput {
    FEXGetLast_IDResult: ServiceSoapTypes.IFEXGetLast_IDResult;
}

export interface IFEXGetPARAM_PtoVentaInput {
}

export interface IFEXGetPARAM_PtoVentaOutput {
    FEXGetPARAM_PtoVentaResult: ServiceSoapTypes.IFEXGetPARAM_PtoVentaResult;
}

export interface IFEXCheck_PermisoInput {
    ID_Permiso: string;
    Dst_merc: number;
}

export interface IFEXCheck_PermisoOutput {
    FEXCheck_PermisoResult: ServiceSoapTypes.IFEXCheck_PermisoResult;
}

export interface IFEXGetPARAM_OpcionalesInput {
}

export interface IFEXGetPARAM_OpcionalesOutput {
    FEXGetPARAM_OpcionalesResult: ServiceSoapTypes.IFEXGetPARAM_OpcionalesResult;
}

export interface IFEXGetPARAM_ActividadesInput {
}

export interface IFEXGetPARAM_ActividadesOutput {
    FEXGetPARAM_ActividadesResult: ServiceSoapTypes.IFEXGetPARAM_ActividadesResult;
}


export namespace ServiceSoapTypes {
    export interface IPermiso {
        Id_permiso: string;
        Dst_merc: number;
    }
    export interface IPermisos {
        Permiso: ServiceSoapTypes.IPermiso[];
    }
    export interface ICmp_asoc {
        Cbte_tipo: number;
        Cbte_punto_vta: number;
        Cbte_nro: number;
        Cbte_cuit: number;
    }
    export interface ICmps_asoc {
        Cmp_asoc: Array<ServiceSoapTypes.ICmp_asoc>;
    }
    export interface IItem {
        Pro_codigo: string;
        Pro_ds: string;
        Pro_qty: number;
        Pro_umed: number;
        Pro_precio_uni: number;
        Pro_bonificacion: number;
        Pro_total_item: number;
    }
    export interface IItems {
        Item: ServiceSoapTypes.IItem[];
    }
    export interface IOpcional {
        Id: string;
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoapTypes.IOpcional[];
    }
    export interface IActividad {
        Id: number;
    }
    export interface IActividades {
        Actividad: ServiceSoapTypes.IActividad[];
    }
    export interface IFEXResultAuth {
        Id: number;
        Cuit: number;
        Cbte_tipo: number;
        Punto_vta: number;
        Cbte_nro: number;
        Cae: string;
        Fch_venc_Cae: string;
        Fch_cbte: string;
        Resultado: string;
        Reproceso: string;
        Motivos_Obs: string;
    }
    export interface IFEXErr {
        ErrCode: number;
        ErrMsg: string;
    }
    export interface IFEXEvents {
        EventCode: number;
        EventMsg: string;
    }
    export interface IFEXAuthorizeResult {
        FEXResultAuth: ServiceSoapTypes.IFEXResultAuth;
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IFEXGetCMPResult {
        FEXResultGet: {
            Id: number;
            Fecha_cbte: string;
            Cbte_tipo: number;
            Punto_vta: number;
            Cbte_nro: number;
            Tipo_expo: number;
            Permiso_existente: string;
            Permisos: ServiceSoapTypes.IPermisos;
            Dst_cmp: number;
            Cliente: string;
            Cuit_pais_cliente: number;
            Domicilio_cliente: string;
            Id_impositivo: string;
            Moneda_Id: string;
            Moneda_ctz: number;
            CanMisMonExt: string;
            Obs_comerciales: string;
            Imp_total: number;
            Obs: string;
            Cmps_asoc: ServiceSoapTypes.ICmps_asoc;
            Forma_pago: string;
            Incoterms: string;
            Incoterms_Ds: string;
            Idioma_cbte: number;
            Items: ServiceSoapTypes.IItems;
            Fecha_cbte_cae: string;
            Fch_venc_Cae: string;
            Cae: string;
            Resultado: string;
            Motivos_Obs: string;
            Opcionales: ServiceSoapTypes.IOpcionales;
            Fecha_pago: string;
            Actividades: ServiceSoapTypes.IActividades;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Cbte_Tipo {
        Cbte_Id: number;
        Cbte_Ds: string;
        Cbte_vig_desde: string;
        Cbte_vig_hasta: string;
    }
    export interface IFEXGetPARAM_Cbte_TipoResult {
        FEXResultGet: {
            ClsFEXResponse_Cbte_Tipo: Array<ServiceSoapTypes.IClsFEXResponse_Cbte_Tipo>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Tex {
        Tex_Id: number;
        Tex_Ds: string;
        Tex_vig_desde: string;
        Tex_vig_hasta: string;
    }
    export interface IFEXGetPARAM_Tipo_ExpoResult {
        FEXResultGet: {
            ClsFEXResponse_Tex: Array<ServiceSoapTypes.IClsFEXResponse_Tex>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Inc {
        Inc_Id: string;
        Inc_Ds: string;
        Inc_vig_desde: string;
        Inc_vig_hasta: string;
    }
    export interface IFEXGetPARAM_IncotermsResult {
        FEXResultGet: {
            ClsFEXResponse_Inc: Array<ServiceSoapTypes.IClsFEXResponse_Inc>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Idi {
        Idi_Id: number;
        Idi_Ds: string;
        Idi_vig_desde: string;
        Idi_vig_hasta: string;
    }
    export interface IFEXGetPARAM_IdiomasResult {
        FEXResultGet: {
            ClsFEXResponse_Idi: Array<ServiceSoapTypes.IClsFEXResponse_Idi>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_UMed {
        Umed_Id: number;
        Umed_Ds: string;
        Umed_vig_desde: string;
        Umed_vig_hasta: string;
    }
    export interface IFEXGetPARAM_UMedResult {
        FEXResultGet: {
            ClsFEXResponse_UMed: Array<ServiceSoapTypes.IClsFEXResponse_UMed>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_DST_pais {
        DST_Codigo: string;
        DST_Ds: string;
    }
    export interface IFEXGetPARAM_DST_paisResult {
        FEXResultGet: {
            ClsFEXResponse_DST_pais: Array<ServiceSoapTypes.IClsFEXResponse_DST_pais>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_DST_cuit {
        DST_CUIT: number;
        DST_Ds: string;
    }
    export interface IFEXGetPARAM_DST_CUITResult {
        FEXResultGet: {
            ClsFEXResponse_DST_cuit: Array<ServiceSoapTypes.IClsFEXResponse_DST_cuit>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Mon {
        Mon_Id: string;
        Mon_Ds: string;
        Mon_vig_desde: string;
        Mon_vig_hasta: string;
    }
    export interface IFEXGetPARAM_MONResult {
        FEXResultGet: {
            ClsFEXResponse_Mon: Array<ServiceSoapTypes.IClsFEXResponse_Mon>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Mon_CON_Cotizacion {
        Mon_Id: string;
        Mon_Ds: string;
        Mon_ctz: string;
        Fecha_ctz: string;
    }
    export interface IFEXGetPARAM_MON_CON_COTIZACIONResult {
        FEXResultGet: {
            ClsFEXResponse_Mon_CON_Cotizacion: Array<ServiceSoapTypes.IClsFEXResponse_Mon_CON_Cotizacion>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IFEXResult_LastCMP {
        Cbte_nro: number;
        Cbte_fecha: string;
    }
    export interface IFEXGetLast_CMPResult {
        FEXResult_LastCMP: ServiceSoapTypes.IFEXResult_LastCMP;
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IFEXDummyResult {
        AppServer: string;
        DbServer: string;
        AuthServer: string;
    }
    export interface IFEXGetPARAM_CtzResult {
        FEXResultGet: {
            Mon_ctz: number;
            Mon_fecha: string;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IFEXGetLast_IDResult {
        FEXResultGet: {
            Id: number;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_PtoVenta {
        Pve_Nro: number;
        Pve_Bloqueado: string;
        Pve_FchBaja: string;
    }
    export interface IFEXGetPARAM_PtoVentaResult {
        FEXResultGet: {
            ClsFEXResponse_PtoVenta: Array<ServiceSoapTypes.IClsFEXResponse_PtoVenta>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IFEXCheck_PermisoResult {
        FEXResultGet: {
            Status: string;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_Opc {
        Opc_Id: number;
        Opc_Ds: string;
        Opc_vig_desde: string;
        Opc_vig_hasta: string;
    }
    export interface IFEXGetPARAM_OpcionalesResult {
        FEXResultGet: {
            ClsFEXResponse_Opc: Array<ServiceSoapTypes.IClsFEXResponse_Opc>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
    export interface IClsFEXResponse_ActividadTipo {
        Id: number;
        Orden: number;
        Desc: string;
    }
    export interface IFEXGetPARAM_ActividadesResult {
        FEXResultGet: {
            ClsFEXResponse_ActividadTipo: Array<ServiceSoapTypes.IClsFEXResponse_ActividadTipo>;
        };
        FEXErr: ServiceSoapTypes.IFEXErr;
        FEXEvents: ServiceSoapTypes.IFEXEvents;
    }
}
