import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXAuthorizeInput,
  IFEXAuthorizeOutput,
  IFEXGetCMPInput,
  IFEXGetCMPOutput,
  IFEXGetLast_CMPInput,
  IFEXGetLast_CMPOutput,
  IFEXGetLast_IDInput,
  IFEXGetLast_IDOutput,
  IFEXCheck_PermisoInput,
  IFEXCheck_PermisoOutput,
  IFEXGetPARAM_Cbte_TipoInput,
  IFEXGetPARAM_Cbte_TipoOutput,
  IFEXGetPARAM_Tipo_ExpoInput,
  IFEXGetPARAM_Tipo_ExpoOutput,
  IFEXGetPARAM_IncotermsInput,
  IFEXGetPARAM_IncotermsOutput,
  IFEXGetPARAM_IdiomasInput,
  IFEXGetPARAM_IdiomasOutput,
  IFEXGetPARAM_UMedInput,
  IFEXGetPARAM_UMedOutput,
  IFEXGetPARAM_DST_paisInput,
  IFEXGetPARAM_DST_paisOutput,
  IFEXGetPARAM_DST_CUITInput,
  IFEXGetPARAM_DST_CUITOutput,
  IFEXGetPARAM_MONInput,
  IFEXGetPARAM_MONOutput,
  IFEXGetPARAM_MON_CON_COTIZACIONInput,
  IFEXGetPARAM_MON_CON_COTIZACIONOutput,
  IFEXGetPARAM_CtzInput,
  IFEXGetPARAM_CtzOutput,
  IFEXGetPARAM_PtoVentaInput,
  IFEXGetPARAM_PtoVentaOutput,
  IFEXGetPARAM_OpcionalesInput,
  IFEXGetPARAM_OpcionalesOutput,
  IFEXGetPARAM_ActividadesInput,
  IFEXGetPARAM_ActividadesOutput,
  IFEXDummyOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";
import { AuthorizeUseCase } from "@application/use-cases/wsfex/authorize.use-case";
import { GetCmpUseCase } from "@application/use-cases/wsfex/get-cmp.use-case";
import { GetLastCmpUseCase } from "@application/use-cases/wsfex/get-last-cmp.use-case";
import { GetLastIdUseCase } from "@application/use-cases/wsfex/get-last-id.use-case";
import { CheckPermisoUseCase } from "@application/use-cases/wsfex/check-permiso.use-case";
import { GetParamCbteTipoUseCase } from "@application/use-cases/wsfex/get-param-cbte-tipo.use-case";
import { GetParamTipoExpoUseCase } from "@application/use-cases/wsfex/get-param-tipo-expo.use-case";
import { GetParamIncotermsUseCase } from "@application/use-cases/wsfex/get-param-incoterms.use-case";
import { GetParamIdiomasUseCase } from "@application/use-cases/wsfex/get-param-idiomas.use-case";
import { GetParamUMedUseCase } from "@application/use-cases/wsfex/get-param-umed.use-case";
import { GetParamDstPaisUseCase } from "@application/use-cases/wsfex/get-param-dst-pais.use-case";
import { GetParamDstCuitUseCase } from "@application/use-cases/wsfex/get-param-dst-cuit.use-case";
import { GetParamMonUseCase } from "@application/use-cases/wsfex/get-param-mon.use-case";
import { GetParamMonConCotizacionUseCase } from "@application/use-cases/wsfex/get-param-mon-con-cotizacion.use-case";
import { GetParamCtzUseCase } from "@application/use-cases/wsfex/get-param-ctz.use-case";
import { GetParamPtoVentaUseCase } from "@application/use-cases/wsfex/get-param-pto-venta.use-case";
import { GetParamOpcionalesUseCase } from "@application/use-cases/wsfex/get-param-opcionales.use-case";
import { GetParamActividadesUseCase } from "@application/use-cases/wsfex/get-param-actividades.use-case";
import { FexDummyUseCase } from "@application/use-cases/wsfex/dummy.use-case";

export class WsfexService {
  private readonly authorizeUseCase: AuthorizeUseCase;
  private readonly getCmpUseCase: GetCmpUseCase;
  private readonly getLastCmpUseCase: GetLastCmpUseCase;
  private readonly getLastIdUseCase: GetLastIdUseCase;
  private readonly checkPermisoUseCase: CheckPermisoUseCase;
  private readonly getParamCbteTipoUseCase: GetParamCbteTipoUseCase;
  private readonly getParamTipoExpoUseCase: GetParamTipoExpoUseCase;
  private readonly getParamIncotermsUseCase: GetParamIncotermsUseCase;
  private readonly getParamIdiomasUseCase: GetParamIdiomasUseCase;
  private readonly getParamUMedUseCase: GetParamUMedUseCase;
  private readonly getParamDstPaisUseCase: GetParamDstPaisUseCase;
  private readonly getParamDstCuitUseCase: GetParamDstCuitUseCase;
  private readonly getParamMonUseCase: GetParamMonUseCase;
  private readonly getParamMonConCotizacionUseCase: GetParamMonConCotizacionUseCase;
  private readonly getParamCtzUseCase: GetParamCtzUseCase;
  private readonly getParamPtoVentaUseCase: GetParamPtoVentaUseCase;
  private readonly getParamOpcionalesUseCase: GetParamOpcionalesUseCase;
  private readonly getParamActividadesUseCase: GetParamActividadesUseCase;
  private readonly dummyUseCase: FexDummyUseCase;

  constructor(private readonly repository: IFexRepositoryPort) {
    this.authorizeUseCase = new AuthorizeUseCase(this.repository);
    this.getCmpUseCase = new GetCmpUseCase(this.repository);
    this.getLastCmpUseCase = new GetLastCmpUseCase(this.repository);
    this.getLastIdUseCase = new GetLastIdUseCase(this.repository);
    this.checkPermisoUseCase = new CheckPermisoUseCase(this.repository);
    this.getParamCbteTipoUseCase = new GetParamCbteTipoUseCase(this.repository);
    this.getParamTipoExpoUseCase = new GetParamTipoExpoUseCase(this.repository);
    this.getParamIncotermsUseCase = new GetParamIncotermsUseCase(
      this.repository,
    );
    this.getParamIdiomasUseCase = new GetParamIdiomasUseCase(this.repository);
    this.getParamUMedUseCase = new GetParamUMedUseCase(this.repository);
    this.getParamDstPaisUseCase = new GetParamDstPaisUseCase(this.repository);
    this.getParamDstCuitUseCase = new GetParamDstCuitUseCase(this.repository);
    this.getParamMonUseCase = new GetParamMonUseCase(this.repository);
    this.getParamMonConCotizacionUseCase = new GetParamMonConCotizacionUseCase(
      this.repository,
    );
    this.getParamCtzUseCase = new GetParamCtzUseCase(this.repository);
    this.getParamPtoVentaUseCase = new GetParamPtoVentaUseCase(this.repository);
    this.getParamOpcionalesUseCase = new GetParamOpcionalesUseCase(
      this.repository,
    );
    this.getParamActividadesUseCase = new GetParamActividadesUseCase(
      this.repository,
    );
    this.dummyUseCase = new FexDummyUseCase(this.repository);
  }

  async authorize(input: IFEXAuthorizeInput): Promise<IFEXAuthorizeOutput> {
    return this.authorizeUseCase.execute(input);
  }

  async getCmp(input: IFEXGetCMPInput): Promise<IFEXGetCMPOutput> {
    return this.getCmpUseCase.execute(input);
  }

  async getLastCmp(
    input: IFEXGetLast_CMPInput,
  ): Promise<IFEXGetLast_CMPOutput> {
    return this.getLastCmpUseCase.execute(input);
  }

  async getLastId(input: IFEXGetLast_IDInput): Promise<IFEXGetLast_IDOutput> {
    return this.getLastIdUseCase.execute(input);
  }

  async checkPermiso(
    input: IFEXCheck_PermisoInput,
  ): Promise<IFEXCheck_PermisoOutput> {
    return this.checkPermisoUseCase.execute(input);
  }

  async getParamCbteTipo(
    input: IFEXGetPARAM_Cbte_TipoInput,
  ): Promise<IFEXGetPARAM_Cbte_TipoOutput> {
    return this.getParamCbteTipoUseCase.execute(input);
  }

  async getParamTipoExpo(
    input: IFEXGetPARAM_Tipo_ExpoInput,
  ): Promise<IFEXGetPARAM_Tipo_ExpoOutput> {
    return this.getParamTipoExpoUseCase.execute(input);
  }

  async getParamIncoterms(
    input: IFEXGetPARAM_IncotermsInput,
  ): Promise<IFEXGetPARAM_IncotermsOutput> {
    return this.getParamIncotermsUseCase.execute(input);
  }

  async getParamIdiomas(
    input: IFEXGetPARAM_IdiomasInput,
  ): Promise<IFEXGetPARAM_IdiomasOutput> {
    return this.getParamIdiomasUseCase.execute(input);
  }

  async getParamUMed(
    input: IFEXGetPARAM_UMedInput,
  ): Promise<IFEXGetPARAM_UMedOutput> {
    return this.getParamUMedUseCase.execute(input);
  }

  async getParamDstPais(
    input: IFEXGetPARAM_DST_paisInput,
  ): Promise<IFEXGetPARAM_DST_paisOutput> {
    return this.getParamDstPaisUseCase.execute(input);
  }

  async getParamDstCuit(
    input: IFEXGetPARAM_DST_CUITInput,
  ): Promise<IFEXGetPARAM_DST_CUITOutput> {
    return this.getParamDstCuitUseCase.execute(input);
  }

  async getParamMon(
    input: IFEXGetPARAM_MONInput,
  ): Promise<IFEXGetPARAM_MONOutput> {
    return this.getParamMonUseCase.execute(input);
  }

  async getParamMonConCotizacion(
    input: IFEXGetPARAM_MON_CON_COTIZACIONInput,
  ): Promise<IFEXGetPARAM_MON_CON_COTIZACIONOutput> {
    return this.getParamMonConCotizacionUseCase.execute(input);
  }

  async getParamCtz(
    input: IFEXGetPARAM_CtzInput,
  ): Promise<IFEXGetPARAM_CtzOutput> {
    return this.getParamCtzUseCase.execute(input);
  }

  async getParamPtoVenta(
    input: IFEXGetPARAM_PtoVentaInput,
  ): Promise<IFEXGetPARAM_PtoVentaOutput> {
    return this.getParamPtoVentaUseCase.execute(input);
  }

  async getParamOpcionales(
    input: IFEXGetPARAM_OpcionalesInput,
  ): Promise<IFEXGetPARAM_OpcionalesOutput> {
    return this.getParamOpcionalesUseCase.execute(input);
  }

  async getParamActividades(
    input: IFEXGetPARAM_ActividadesInput,
  ): Promise<IFEXGetPARAM_ActividadesOutput> {
    return this.getParamActividadesUseCase.execute(input);
  }

  async dummy(): Promise<IFEXDummyOutput> {
    return this.dummyUseCase.execute();
  }
}
