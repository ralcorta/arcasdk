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
        Permisos: ServiceSoap12Types.IPermisos;
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
        Cmps_asoc: ServiceSoap12Types.ICmps_asoc;
        Forma_pago: string;
        Incoterms: string;
        Incoterms_Ds: string;
        Idioma_cbte: number;
        Items: ServiceSoap12Types.IItems;
        Opcionales: ServiceSoap12Types.IOpcionales;
        Fecha_pago: string;
        Actividades: ServiceSoap12Types.IActividades;
    };
}

export interface IFEXAuthorizeOutput {
    FEXAuthorizeResult: ServiceSoap12Types.IFEXAuthorizeResult;
}

export interface IFEXGetCMPInput {
    Cmp: {
        Cbte_tipo: number;
        Punto_vta: number;
        Cbte_nro: number;
    };
}

export interface IFEXGetCMPOutput {
    FEXGetCMPResult: ServiceSoap12Types.IFEXGetCMPResult;
}

export interface IFEXGetPARAM_Cbte_TipoInput {
}

export interface IFEXGetPARAM_Cbte_TipoOutput {
    FEXGetPARAM_Cbte_TipoResult: ServiceSoap12Types.IFEXGetPARAM_Cbte_TipoResult;
}

export interface IFEXGetPARAM_Tipo_ExpoInput {
}

export interface IFEXGetPARAM_Tipo_ExpoOutput {
    FEXGetPARAM_Tipo_ExpoResult: ServiceSoap12Types.IFEXGetPARAM_Tipo_ExpoResult;
}

export interface IFEXGetPARAM_IncotermsInput {
}

export interface IFEXGetPARAM_IncotermsOutput {
    FEXGetPARAM_IncotermsResult: ServiceSoap12Types.IFEXGetPARAM_IncotermsResult;
}

export interface IFEXGetPARAM_IdiomasInput {
}

export interface IFEXGetPARAM_IdiomasOutput {
    FEXGetPARAM_IdiomasResult: ServiceSoap12Types.IFEXGetPARAM_IdiomasResult;
}

export interface IFEXGetPARAM_UMedInput {
}

export interface IFEXGetPARAM_UMedOutput {
    FEXGetPARAM_UMedResult: ServiceSoap12Types.IFEXGetPARAM_UMedResult;
}

export interface IFEXGetPARAM_DST_paisInput {
}

export interface IFEXGetPARAM_DST_paisOutput {
    FEXGetPARAM_DST_paisResult: ServiceSoap12Types.IFEXGetPARAM_DST_paisResult;
}

export interface IFEXGetPARAM_DST_CUITInput {
}

export interface IFEXGetPARAM_DST_CUITOutput {
    FEXGetPARAM_DST_CUITResult: ServiceSoap12Types.IFEXGetPARAM_DST_CUITResult;
}

export interface IFEXGetPARAM_MONInput {
}

export interface IFEXGetPARAM_MONOutput {
    FEXGetPARAM_MONResult: ServiceSoap12Types.IFEXGetPARAM_MONResult;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONInput {
    Fecha_CTZ: string;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONOutput {
    FEXGetPARAM_MON_CON_COTIZACIONResult: ServiceSoap12Types.IFEXGetPARAM_MON_CON_COTIZACIONResult;
}

export interface IFEXGetLast_CMPInput {
}

export interface IFEXGetLast_CMPOutput {
    FEXGetLast_CMPResult: ServiceSoap12Types.IFEXGetLast_CMPResult;
}

export interface IFEXDummyInput {}

export interface IFEXDummyOutput {
    FEXDummyResult: ServiceSoap12Types.IFEXDummyResult;
}

export interface IFEXGetPARAM_CtzInput {
    Mon_id: string;
    FchCotiz: string;
}

export interface IFEXGetPARAM_CtzOutput {
    FEXGetPARAM_CtzResult: ServiceSoap12Types.IFEXGetPARAM_CtzResult;
}

export interface IFEXGetLast_IDInput {
}

export interface IFEXGetLast_IDOutput {
    FEXGetLast_IDResult: ServiceSoap12Types.IFEXGetLast_IDResult;
}

export interface IFEXGetPARAM_PtoVentaInput {
}

export interface IFEXGetPARAM_PtoVentaOutput {
    FEXGetPARAM_PtoVentaResult: ServiceSoap12Types.IFEXGetPARAM_PtoVentaResult;
}

export interface IFEXCheck_PermisoInput {
    ID_Permiso: string;
    Dst_merc: number;
}

export interface IFEXCheck_PermisoOutput {
    FEXCheck_PermisoResult: ServiceSoap12Types.IFEXCheck_PermisoResult;
}

export interface IFEXGetPARAM_OpcionalesInput {
}

export interface IFEXGetPARAM_OpcionalesOutput {
    FEXGetPARAM_OpcionalesResult: ServiceSoap12Types.IFEXGetPARAM_OpcionalesResult;
}

export interface IFEXGetPARAM_ActividadesInput {
}

export interface IFEXGetPARAM_ActividadesOutput {
    FEXGetPARAM_ActividadesResult: ServiceSoap12Types.IFEXGetPARAM_ActividadesResult;
}


export namespace ServiceSoap12Types {
    export interface IPermiso {
        Id_permiso: string;
        Dst_merc: number;
    }
    export interface IPermisos {
        Permiso: ServiceSoap12Types.IPermiso[];
    }
    export interface ICmp_asoc {
        Cbte_tipo: number;
        Cbte_punto_vta: number;
        Cbte_nro: number;
        Cbte_cuit: number;
    }
    export interface ICmps_asoc {
        Cmp_asoc: Array<ServiceSoap12Types.ICmp_asoc>;
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
        Item: ServiceSoap12Types.IItem[];
    }
    export interface IOpcional {
        Id: string;
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoap12Types.IOpcional[];
    }
    export interface IActividad {
        Id: number;
    }
    export interface IActividades {
        Actividad: ServiceSoap12Types.IActividad[];
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
        FEXResultAuth: ServiceSoap12Types.IFEXResultAuth;
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
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
            Permisos: ServiceSoap12Types.IPermisos;
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
            Cmps_asoc: ServiceSoap12Types.ICmps_asoc;
            Forma_pago: string;
            Incoterms: string;
            Incoterms_Ds: string;
            Idioma_cbte: number;
            Items: ServiceSoap12Types.IItems;
            Fecha_cbte_cae: string;
            Fch_venc_Cae: string;
            Cae: string;
            Resultado: string;
            Motivos_Obs: string;
            Opcionales: ServiceSoap12Types.IOpcionales;
            Fecha_pago: string;
            Actividades: ServiceSoap12Types.IActividades;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Cbte_Tipo {
        Cbte_Id: number;
        Cbte_Ds: string;
        Cbte_vig_desde: string;
        Cbte_vig_hasta: string;
    }
    export interface IFEXGetPARAM_Cbte_TipoResult {
        FEXResultGet: {
            ClsFEXResponse_Cbte_Tipo: Array<ServiceSoap12Types.IClsFEXResponse_Cbte_Tipo>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Tex {
        Tex_Id: number;
        Tex_Ds: string;
        Tex_vig_desde: string;
        Tex_vig_hasta: string;
    }
    export interface IFEXGetPARAM_Tipo_ExpoResult {
        FEXResultGet: {
            ClsFEXResponse_Tex: Array<ServiceSoap12Types.IClsFEXResponse_Tex>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Inc {
        Inc_Id: string;
        Inc_Ds: string;
        Inc_vig_desde: string;
        Inc_vig_hasta: string;
    }
    export interface IFEXGetPARAM_IncotermsResult {
        FEXResultGet: {
            ClsFEXResponse_Inc: Array<ServiceSoap12Types.IClsFEXResponse_Inc>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Idi {
        Idi_Id: number;
        Idi_Ds: string;
        Idi_vig_desde: string;
        Idi_vig_hasta: string;
    }
    export interface IFEXGetPARAM_IdiomasResult {
        FEXResultGet: {
            ClsFEXResponse_Idi: Array<ServiceSoap12Types.IClsFEXResponse_Idi>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_UMed {
        Umed_Id: number;
        Umed_Ds: string;
        Umed_vig_desde: string;
        Umed_vig_hasta: string;
    }
    export interface IFEXGetPARAM_UMedResult {
        FEXResultGet: {
            ClsFEXResponse_UMed: Array<ServiceSoap12Types.IClsFEXResponse_UMed>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_DST_pais {
        DST_Codigo: string;
        DST_Ds: string;
    }
    export interface IFEXGetPARAM_DST_paisResult {
        FEXResultGet: {
            ClsFEXResponse_DST_pais: Array<ServiceSoap12Types.IClsFEXResponse_DST_pais>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_DST_cuit {
        DST_CUIT: number;
        DST_Ds: string;
    }
    export interface IFEXGetPARAM_DST_CUITResult {
        FEXResultGet: {
            ClsFEXResponse_DST_cuit: Array<ServiceSoap12Types.IClsFEXResponse_DST_cuit>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Mon {
        Mon_Id: string;
        Mon_Ds: string;
        Mon_vig_desde: string;
        Mon_vig_hasta: string;
    }
    export interface IFEXGetPARAM_MONResult {
        FEXResultGet: {
            ClsFEXResponse_Mon: Array<ServiceSoap12Types.IClsFEXResponse_Mon>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Mon_CON_Cotizacion {
        Mon_Id: string;
        Mon_Ds: string;
        Mon_ctz: string;
        Fecha_ctz: string;
    }
    export interface IFEXGetPARAM_MON_CON_COTIZACIONResult {
        FEXResultGet: {
            ClsFEXResponse_Mon_CON_Cotizacion: Array<ServiceSoap12Types.IClsFEXResponse_Mon_CON_Cotizacion>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IFEXResult_LastCMP {
        Cbte_nro: number;
        Cbte_fecha: string;
    }
    export interface IFEXGetLast_CMPResult {
        FEXResult_LastCMP: ServiceSoap12Types.IFEXResult_LastCMP;
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
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
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IFEXGetLast_IDResult {
        FEXResultGet: {
            Id: number;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_PtoVenta {
        Pve_Nro: number;
        Pve_Bloqueado: string;
        Pve_FchBaja: string;
    }
    export interface IFEXGetPARAM_PtoVentaResult {
        FEXResultGet: {
            ClsFEXResponse_PtoVenta: Array<ServiceSoap12Types.IClsFEXResponse_PtoVenta>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IFEXCheck_PermisoResult {
        FEXResultGet: {
            Status: string;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Opc {
        Opc_Id: number;
        Opc_Ds: string;
        Opc_vig_desde: string;
        Opc_vig_hasta: string;
    }
    export interface IFEXGetPARAM_OpcionalesResult {
        FEXResultGet: {
            ClsFEXResponse_Opc: Array<ServiceSoap12Types.IClsFEXResponse_Opc>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_ActividadTipo {
        Id: number;
        Orden: number;
        Desc: string;
    }
    export interface IFEXGetPARAM_ActividadesResult {
        FEXResultGet: {
            ClsFEXResponse_ActividadTipo: Array<ServiceSoap12Types.IClsFEXResponse_ActividadTipo>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
}
