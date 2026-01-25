import { Client } from "soap";
import { SoapAsyncFunc } from "@infrastructure/types";

export interface IFECredDummyInput {}

export interface IFECredDummyOutput {
  dummyReturn: {
    appserver: string;
    authserver: string;
    dbserver: string;
  };
  dummyResponse?: {
    dummyReturn: {
      appserver: string;
      authserver: string;
      dbserver: string;
    };
  };
}

export interface IAceptarFECredInput extends Record<string, any> {}
export interface IAceptarFECredOutput {
  operacionFECredReturn?: any;
}

export interface IRechazarFECredInput extends Record<string, any> {}
export interface IRechazarFECredOutput {
  operacionFECredReturn?: any;
}

export interface IRechazarNotaDCInput extends Record<string, any> {}
export interface IRechazarNotaDCOutput {
  rechazarNotaDCReturn?: any;
}

export interface IInformarFacturaAgtDptoCltvInput extends Record<string, any> {}
export interface IInformarFacturaAgtDptoCltvOutput {
  operacionFECredReturn?: any;
}

export interface IInformarCancelacionTotalFECredInput extends Record<string, any> {}
export interface IInformarCancelacionTotalFECredOutput {
  operacionFECredReturn?: any;
}

export interface IModificarOpcionTransferenciaInput extends Record<string, any> {}
export interface IModificarOpcionTransferenciaOutput {
  operacionFECredReturn?: any;
}

export interface IConsultarComprobantesInput extends Record<string, any> {}
export interface IConsultarComprobantesOutput {
  consultarCmpReturn?: any;
}

export interface IConsultarCtaCteInput extends Record<string, any> {}
export interface IConsultarCtaCteOutput {
  consultarCtaCteReturn?: any;
}

export interface IConsultarCtasCtesInput extends Record<string, any> {}
export interface IConsultarCtasCtesOutput {
  consultarCtasCtesReturn?: any;
}

export interface IConsultarCuentasEnAgtDptoCltvInput extends Record<string, any> {}
export interface IConsultarCuentasEnAgtDptoCltvOutput {
  consultarCuentasEnAgtDptoCltvReturn?: any;
}

export interface IConsultarFacturasAgtDptoCltvInput extends Record<string, any> {}
export interface IConsultarFacturasAgtDptoCltvOutput {
  consultarFacturasAgtDptoCltvReturn?: any;
}

export interface IConsultarHistorialEstadosComprobanteInput extends Record<string, any> {}
export interface IConsultarHistorialEstadosComprobanteOutput {
  consultarHistorialEstadosComprobanteReturn?: any;
}

export interface IConsultarHistorialEstadosCtaCteInput extends Record<string, any> {}
export interface IConsultarHistorialEstadosCtaCteOutput {
  consultarHistorialEstadosCtaCteReturn?: any;
}

export interface IConsultarMontoObligadoRecepcionInput extends Record<string, any> {}
export interface IConsultarMontoObligadoRecepcionOutput {
  consultarMontoObligadoRecepcionReturn?: any;
}

export interface IConsultarObligadoRecepcionInput extends Record<string, any> {}
export interface IConsultarObligadoRecepcionOutput {
  consultarObligadoRecepcionReturn?: any;
}

export interface IConsultarTiposAjustesOperacionInput extends Record<string, any> {}
export interface IConsultarTiposAjustesOperacionOutput {
  codigoDescripcionReturn?: any;
}

export interface IConsultarTiposFormasCancelacionInput extends Record<string, any> {}
export interface IConsultarTiposFormasCancelacionOutput {
  codigoDescripcionReturn?: any;
}

export interface IConsultarTiposMotivosRechazoInput extends Record<string, any> {}
export interface IConsultarTiposMotivosRechazoOutput {
  codigoDescripcionReturn?: any;
}

export interface IConsultarTiposRetencionesInput extends Record<string, any> {}
export interface IConsultarTiposRetencionesOutput {
  consultarTiposRetencionesReturn?: any;
}

export interface IObtenerRemitosInput extends Record<string, any> {}
export interface IObtenerRemitosOutput {
  obtenerRemitosReturn?: any;
}

export interface IFECredServiceSoap extends Client {
  dummyAsync: SoapAsyncFunc<IFECredDummyInput, IFECredDummyOutput>;
  aceptarFECredAsync: SoapAsyncFunc<IAceptarFECredInput, IAceptarFECredOutput>;
  rechazarFECredAsync: SoapAsyncFunc<IRechazarFECredInput, IRechazarFECredOutput>;
  rechazarNotaDCAsync: SoapAsyncFunc<IRechazarNotaDCInput, IRechazarNotaDCOutput>;
  informarFacturaAgtDptoCltvAsync: SoapAsyncFunc<
    IInformarFacturaAgtDptoCltvInput,
    IInformarFacturaAgtDptoCltvOutput
  >;
  informarCancelacionTotalFECredAsync: SoapAsyncFunc<
    IInformarCancelacionTotalFECredInput,
    IInformarCancelacionTotalFECredOutput
  >;
  modificarOpcionTransferenciaAsync: SoapAsyncFunc<
    IModificarOpcionTransferenciaInput,
    IModificarOpcionTransferenciaOutput
  >;
  consultarComprobantesAsync: SoapAsyncFunc<
    IConsultarComprobantesInput,
    IConsultarComprobantesOutput
  >;
  consultarCtaCteAsync: SoapAsyncFunc<
    IConsultarCtaCteInput,
    IConsultarCtaCteOutput
  >;
  consultarCtasCtesAsync: SoapAsyncFunc<
    IConsultarCtasCtesInput,
    IConsultarCtasCtesOutput
  >;
  consultarCuentasEnAgtDptoCltvAsync: SoapAsyncFunc<
    IConsultarCuentasEnAgtDptoCltvInput,
    IConsultarCuentasEnAgtDptoCltvOutput
  >;
  consultarFacturasAgtDptoCltvAsync: SoapAsyncFunc<
    IConsultarFacturasAgtDptoCltvInput,
    IConsultarFacturasAgtDptoCltvOutput
  >;
  consultarHistorialEstadosComprobanteAsync: SoapAsyncFunc<
    IConsultarHistorialEstadosComprobanteInput,
    IConsultarHistorialEstadosComprobanteOutput
  >;
  consultarHistorialEstadosCtaCteAsync: SoapAsyncFunc<
    IConsultarHistorialEstadosCtaCteInput,
    IConsultarHistorialEstadosCtaCteOutput
  >;
  consultarMontoObligadoRecepcionAsync: SoapAsyncFunc<
    IConsultarMontoObligadoRecepcionInput,
    IConsultarMontoObligadoRecepcionOutput
  >;
  consultarObligadoRecepcionAsync: SoapAsyncFunc<
    IConsultarObligadoRecepcionInput,
    IConsultarObligadoRecepcionOutput
  >;
  consultarTiposAjustesOperacionAsync: SoapAsyncFunc<
    IConsultarTiposAjustesOperacionInput,
    IConsultarTiposAjustesOperacionOutput
  >;
  consultarTiposFormasCancelacionAsync: SoapAsyncFunc<
    IConsultarTiposFormasCancelacionInput,
    IConsultarTiposFormasCancelacionOutput
  >;
  consultarTiposMotivosRechazoAsync: SoapAsyncFunc<
    IConsultarTiposMotivosRechazoInput,
    IConsultarTiposMotivosRechazoOutput
  >;
  consultarTiposRetencionesAsync: SoapAsyncFunc<
    IConsultarTiposRetencionesInput,
    IConsultarTiposRetencionesOutput
  >;
  obtenerRemitosAsync: SoapAsyncFunc<IObtenerRemitosInput, IObtenerRemitosOutput>;
}
