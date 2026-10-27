import {
  ConstatarComprobanteInput,
  IComprobanteConstatarOutput,
  IComprobanteDummyOutput,
  IComprobantesModalidadConsultarOutput,
  IComprobantesTipoConsultarOutput,
  IDocumentosTipoConsultarOutput,
  IOpcionalesTipoConsultarOutput,
} from "@application/dto/cdc";

export interface ICdcRepositoryPort {
  constatarComprobante(
    input: ConstatarComprobanteInput,
  ): Promise<IComprobanteConstatarOutput>;

  getComprobantesModalidad(): Promise<IComprobantesModalidadConsultarOutput>;

  getComprobantesTipo(): Promise<IComprobantesTipoConsultarOutput>;

  getDocumentosTipo(): Promise<IDocumentosTipoConsultarOutput>;

  getOpcionalesTipo(): Promise<IOpcionalesTipoConsultarOutput>;

  dummy(): Promise<IComprobanteDummyOutput>;
}
