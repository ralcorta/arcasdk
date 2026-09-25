import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import {
  ConstatarComprobanteInput,
  IComprobanteConstatarOutput,
  IComprobanteDummyOutput,
  IComprobantesModalidadConsultarOutput,
  IComprobantesTipoConsultarOutput,
  IDocumentosTipoConsultarOutput,
  IOpcionalesTipoConsultarOutput,
} from "@application/dto/cdc";
import { ConstatarComprobanteUseCase } from "@application/use-cases/wscdc/constatar-comprobante.use-case";
import { GetComprobantesModalidadUseCase } from "@application/use-cases/wscdc/get-comprobantes-modalidad.use-case";
import { GetComprobantesTipoUseCase } from "@application/use-cases/wscdc/get-comprobantes-tipo.use-case";
import { GetDocumentosTipoUseCase } from "@application/use-cases/wscdc/get-documentos-tipo.use-case";
import { GetOpcionalesTipoUseCase } from "@application/use-cases/wscdc/get-opcionales-tipo.use-case";
import { CdcDummyUseCase } from "@application/use-cases/wscdc/dummy.use-case";

export class WscdcService {
  private readonly constatarComprobanteUseCase: ConstatarComprobanteUseCase;
  private readonly getComprobantesModalidadUseCase: GetComprobantesModalidadUseCase;
  private readonly getComprobantesTipoUseCase: GetComprobantesTipoUseCase;
  private readonly getDocumentosTipoUseCase: GetDocumentosTipoUseCase;
  private readonly getOpcionalesTipoUseCase: GetOpcionalesTipoUseCase;
  private readonly dummyUseCase: CdcDummyUseCase;

  constructor(private readonly repository: ICdcRepositoryPort) {
    this.constatarComprobanteUseCase = new ConstatarComprobanteUseCase(
      this.repository,
    );
    this.getComprobantesModalidadUseCase = new GetComprobantesModalidadUseCase(
      this.repository,
    );
    this.getComprobantesTipoUseCase = new GetComprobantesTipoUseCase(
      this.repository,
    );
    this.getDocumentosTipoUseCase = new GetDocumentosTipoUseCase(
      this.repository,
    );
    this.getOpcionalesTipoUseCase = new GetOpcionalesTipoUseCase(
      this.repository,
    );
    this.dummyUseCase = new CdcDummyUseCase(this.repository);
  }

  async constatarComprobante(
    input: ConstatarComprobanteInput,
  ): Promise<IComprobanteConstatarOutput> {
    return this.constatarComprobanteUseCase.execute(input);
  }

  async getComprobantesModalidad(): Promise<IComprobantesModalidadConsultarOutput> {
    return this.getComprobantesModalidadUseCase.execute();
  }

  async getComprobantesTipo(): Promise<IComprobantesTipoConsultarOutput> {
    return this.getComprobantesTipoUseCase.execute();
  }

  async getDocumentosTipo(): Promise<IDocumentosTipoConsultarOutput> {
    return this.getDocumentosTipoUseCase.execute();
  }

  async getOpcionalesTipo(): Promise<IOpcionalesTipoConsultarOutput> {
    return this.getOpcionalesTipoUseCase.execute();
  }

  async dummy(): Promise<IComprobanteDummyOutput> {
    return this.dummyUseCase.execute();
  }
}
