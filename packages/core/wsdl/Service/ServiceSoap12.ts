/* tslint:disable:max-line-length no-empty-interface */
export interface IFEXAuthorizeInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
    Cmp: {
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Id: long;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fecha_cbte: string;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Cbte_Tipo: short;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Punto_vta: int;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cbte_nro: long;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Tipo_expo: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Permiso_existente: string;
        Permisos: ServiceSoap12Types.IPermisos;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Dst_cmp: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cliente: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit_pais_cliente: long;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Domicilio_cliente: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Id_impositivo: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Moneda_Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
        Moneda_ctz: decimal;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        CanMisMonExt: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Obs_comerciales: string;
        /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
        Imp_total: decimal;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Obs: string;
        Cmps_asoc: ServiceSoap12Types.ICmps_asoc;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Forma_pago: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Incoterms: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Incoterms_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Idioma_cbte: short;
        Items: ServiceSoap12Types.IItems;
        Opcionales: ServiceSoap12Types.IOpcionales;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Fecha_pago: string;
        Actividades: ServiceSoap12Types.IActividades;
    };
}

export interface IFEXAuthorizeOutput {
    FEXAuthorizeResult: ServiceSoap12Types.IFEXAuthorizeResult;
}

export interface IFEXGetCMPInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
    Cmp: {
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Cbte_tipo: short;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Punto_vta: int;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cbte_nro: long;
    };
}

export interface IFEXGetCMPOutput {
    FEXGetCMPResult: ServiceSoap12Types.IFEXGetCMPResult;
}

export interface IFEXGetPARAM_Cbte_TipoInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_Cbte_TipoOutput {
    FEXGetPARAM_Cbte_TipoResult: ServiceSoap12Types.IFEXGetPARAM_Cbte_TipoResult;
}

export interface IFEXGetPARAM_Tipo_ExpoInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_Tipo_ExpoOutput {
    FEXGetPARAM_Tipo_ExpoResult: ServiceSoap12Types.IFEXGetPARAM_Tipo_ExpoResult;
}

export interface IFEXGetPARAM_IncotermsInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_IncotermsOutput {
    FEXGetPARAM_IncotermsResult: ServiceSoap12Types.IFEXGetPARAM_IncotermsResult;
}

export interface IFEXGetPARAM_IdiomasInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_IdiomasOutput {
    FEXGetPARAM_IdiomasResult: ServiceSoap12Types.IFEXGetPARAM_IdiomasResult;
}

export interface IFEXGetPARAM_UMedInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_UMedOutput {
    FEXGetPARAM_UMedResult: ServiceSoap12Types.IFEXGetPARAM_UMedResult;
}

export interface IFEXGetPARAM_DST_paisInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_DST_paisOutput {
    FEXGetPARAM_DST_paisResult: ServiceSoap12Types.IFEXGetPARAM_DST_paisResult;
}

export interface IFEXGetPARAM_DST_CUITInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_DST_CUITOutput {
    FEXGetPARAM_DST_CUITResult: ServiceSoap12Types.IFEXGetPARAM_DST_CUITResult;
}

export interface IFEXGetPARAM_MONInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_MONOutput {
    FEXGetPARAM_MONResult: ServiceSoap12Types.IFEXGetPARAM_MONResult;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
    /** s:string(undefined) */
    Fecha_CTZ: string;
}

export interface IFEXGetPARAM_MON_CON_COTIZACIONOutput {
    FEXGetPARAM_MON_CON_COTIZACIONResult: ServiceSoap12Types.IFEXGetPARAM_MON_CON_COTIZACIONResult;
}

export interface IFEXGetLast_CMPInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Pto_venta: int;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Cbte_Tipo: short;
    };
}

export interface IFEXGetLast_CMPOutput {
    FEXGetLast_CMPResult: ServiceSoap12Types.IFEXGetLast_CMPResult;
}

export interface IFEXDummyInput {}

export interface IFEXDummyOutput {
    FEXDummyResult: ServiceSoap12Types.IFEXDummyResult;
}

export interface IFEXGetPARAM_CtzInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
    /** s:string(undefined) */
    Mon_id: string;
    /** s:string(undefined) */
    FchCotiz: string;
}

export interface IFEXGetPARAM_CtzOutput {
    FEXGetPARAM_CtzResult: ServiceSoap12Types.IFEXGetPARAM_CtzResult;
}

export interface IFEXGetLast_IDInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetLast_IDOutput {
    FEXGetLast_IDResult: ServiceSoap12Types.IFEXGetLast_IDResult;
}

export interface IFEXGetPARAM_PtoVentaInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_PtoVentaOutput {
    FEXGetPARAM_PtoVentaResult: ServiceSoap12Types.IFEXGetPARAM_PtoVentaResult;
}

export interface IFEXCheck_PermisoInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
    /** s:string(undefined) */
    ID_Permiso: string;
    /** s:int(undefined) */
    Dst_merc: int;
}

export interface IFEXCheck_PermisoOutput {
    FEXCheck_PermisoResult: ServiceSoap12Types.IFEXCheck_PermisoResult;
}

export interface IFEXGetPARAM_OpcionalesInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_OpcionalesOutput {
    FEXGetPARAM_OpcionalesResult: ServiceSoap12Types.IFEXGetPARAM_OpcionalesResult;
}

export interface IFEXGetPARAM_ActividadesInput {
    Auth: {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Token: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Sign: string;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
    };
}

export interface IFEXGetPARAM_ActividadesOutput {
    FEXGetPARAM_ActividadesResult: ServiceSoap12Types.IFEXGetPARAM_ActividadesResult;
}

export interface IServiceSoap12Soap {
    FEXAuthorize: (input: IFEXAuthorizeInput, cb: (err: any | null, result: IFEXAuthorizeOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetCMP: (input: IFEXGetCMPInput, cb: (err: any | null, result: IFEXGetCMPOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Cbte_Tipo: (input: IFEXGetPARAM_Cbte_TipoInput, cb: (err: any | null, result: IFEXGetPARAM_Cbte_TipoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Tipo_Expo: (input: IFEXGetPARAM_Tipo_ExpoInput, cb: (err: any | null, result: IFEXGetPARAM_Tipo_ExpoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Incoterms: (input: IFEXGetPARAM_IncotermsInput, cb: (err: any | null, result: IFEXGetPARAM_IncotermsOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Idiomas: (input: IFEXGetPARAM_IdiomasInput, cb: (err: any | null, result: IFEXGetPARAM_IdiomasOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_UMed: (input: IFEXGetPARAM_UMedInput, cb: (err: any | null, result: IFEXGetPARAM_UMedOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_DST_pais: (input: IFEXGetPARAM_DST_paisInput, cb: (err: any | null, result: IFEXGetPARAM_DST_paisOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_DST_CUIT: (input: IFEXGetPARAM_DST_CUITInput, cb: (err: any | null, result: IFEXGetPARAM_DST_CUITOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_MON: (input: IFEXGetPARAM_MONInput, cb: (err: any | null, result: IFEXGetPARAM_MONOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_MON_CON_COTIZACION: (input: IFEXGetPARAM_MON_CON_COTIZACIONInput, cb: (err: any | null, result: IFEXGetPARAM_MON_CON_COTIZACIONOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetLast_CMP: (input: IFEXGetLast_CMPInput, cb: (err: any | null, result: IFEXGetLast_CMPOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXDummy: (input: IFEXDummyInput, cb: (err: any | null, result: IFEXDummyOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Ctz: (input: IFEXGetPARAM_CtzInput, cb: (err: any | null, result: IFEXGetPARAM_CtzOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetLast_ID: (input: IFEXGetLast_IDInput, cb: (err: any | null, result: IFEXGetLast_IDOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_PtoVenta: (input: IFEXGetPARAM_PtoVentaInput, cb: (err: any | null, result: IFEXGetPARAM_PtoVentaOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXCheck_Permiso: (input: IFEXCheck_PermisoInput, cb: (err: any | null, result: IFEXCheck_PermisoOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Opcionales: (input: IFEXGetPARAM_OpcionalesInput, cb: (err: any | null, result: IFEXGetPARAM_OpcionalesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
    FEXGetPARAM_Actividades: (input: IFEXGetPARAM_ActividadesInput, cb: (err: any | null, result: IFEXGetPARAM_ActividadesOutput, raw: string,  soapHeader: {[k: string]: any; }) => any, options?: any, extraHeaders?: any) => void;
}

export namespace ServiceSoap12Types {
    export interface IPermiso {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Id_permiso: string;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Dst_merc: int;
    }
    export interface IPermisos {
        Permiso: ServiceSoap12Types.IPermiso[];
    }
    export interface ICmp_asoc {
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Cbte_tipo: short;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Cbte_punto_vta: int;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cbte_nro: long;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cbte_cuit: long;
    }
    export interface ICmps_asoc {
        Cmp_asoc: Array<ServiceSoap12Types.ICmp_asoc>;
    }
    export interface IItem {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pro_codigo: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pro_ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
        Pro_qty: decimal;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Pro_umed: int;
        /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
        Pro_precio_uni: decimal;
        /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
        Pro_bonificacion: decimal;
        /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
        Pro_total_item: decimal;
    }
    export interface IItems {
        Item: ServiceSoap12Types.IItem[];
    }
    export interface IOpcional {
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Id: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Valor: string;
    }
    export interface IOpcionales {
        Opcional: ServiceSoap12Types.IOpcional[];
    }
    export interface IActividad {
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Id: long;
    }
    export interface IActividades {
        Actividad: ServiceSoap12Types.IActividad[];
    }
    export interface IFEXResultAuth {
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Id: long;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cuit: long;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Cbte_tipo: short;
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Punto_vta: int;
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cbte_nro: long;
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
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        ErrCode: int;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        ErrMsg: string;
    }
    export interface IFEXEvents {
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        EventCode: int;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        EventMsg: string;
    }
    export interface IFEXAuthorizeResult {
        FEXResultAuth: ServiceSoap12Types.IFEXResultAuth;
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IFEXGetCMPResult {
        FEXResultGet: {
            /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
            Id: long;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Fecha_cbte: string;
            /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
            Cbte_tipo: short;
            /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
            Punto_vta: int;
            /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
            Cbte_nro: long;
            /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
            Tipo_expo: short;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Permiso_existente: string;
            Permisos: ServiceSoap12Types.IPermisos;
            /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
            Dst_cmp: short;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Cliente: string;
            /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
            Cuit_pais_cliente: long;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Domicilio_cliente: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Id_impositivo: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Moneda_Id: string;
            /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
            Moneda_ctz: decimal;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            CanMisMonExt: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Obs_comerciales: string;
            /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
            Imp_total: decimal;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Obs: string;
            Cmps_asoc: ServiceSoap12Types.ICmps_asoc;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Forma_pago: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Incoterms: string;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Incoterms_Ds: string;
            /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
            Idioma_cbte: short;
            Items: ServiceSoap12Types.IItems;
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
            Opcionales: ServiceSoap12Types.IOpcionales;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Fecha_pago: string;
            Actividades: ServiceSoap12Types.IActividades;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Cbte_Tipo {
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Cbte_Id: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Tex_Id: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Tex_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Tex_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
            ClsFEXResponse_Inc: Array<ServiceSoap12Types.IClsFEXResponse_Inc>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Idi {
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Idi_Id: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Idi_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Idi_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Umed_Id: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Umed_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Umed_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        DST_Codigo: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        DST_CUIT: long;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
            ClsFEXResponse_Mon: Array<ServiceSoap12Types.IClsFEXResponse_Mon>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
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
            ClsFEXResponse_Mon_CON_Cotizacion: Array<ServiceSoap12Types.IClsFEXResponse_Mon_CON_Cotizacion>;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IFEXResult_LastCMP {
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Cbte_nro: long;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Cbte_fecha: string;
    }
    export interface IFEXGetLast_CMPResult {
        FEXResult_LastCMP: ServiceSoap12Types.IFEXResult_LastCMP;
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
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
            /** http://ar.gov.afip.dif.fexv1/#s:decimal(undefined) */
            Mon_ctz: decimal;
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Mon_fecha: string;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IFEXGetLast_IDResult {
        FEXResultGet: {
            /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
            Id: long;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_PtoVenta {
        /** http://ar.gov.afip.dif.fexv1/#s:int(undefined) */
        Pve_Nro: int;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Pve_Bloqueado: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
            /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
            Status: string;
        };
        FEXErr: ServiceSoap12Types.IFEXErr;
        FEXEvents: ServiceSoap12Types.IFEXEvents;
    }
    export interface IClsFEXResponse_Opc {
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Opc_Id: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Opc_Ds: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
        Opc_vig_desde: string;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
        /** http://ar.gov.afip.dif.fexv1/#s:long(undefined) */
        Id: long;
        /** http://ar.gov.afip.dif.fexv1/#s:short(undefined) */
        Orden: short;
        /** http://ar.gov.afip.dif.fexv1/#s:string(undefined) */
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
