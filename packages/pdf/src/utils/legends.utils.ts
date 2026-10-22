import type {
  InvoiceData,
  InvoiceLegends,
  InvoiceTemplateProps,
} from "@src/types/invoice-data.types";
import {
  CLASE_A_SUJETA_A_RETENCION_TYPES,
  CONDICIONES_IVA_MONOTRIBUTO,
  CONDICION_IVA_CONSUMIDOR_FINAL,
  LEYENDA_LEY_27618,
  LEYENDA_OPERACION_SUJETA_A_RETENCION,
  LEYENDA_PAGO_EN_CBU_INFORMADA,
  TITULO_TRANSPARENCIA_FISCAL,
  TRIBUTOS_NACIONALES_INDIRECTOS,
} from "@src/constants/legends.constants";

/**
 * Resuelve las leyendas que exige la normativa según el tipo de comprobante,
 * la condición frente al IVA del receptor y los campos opcionales de `InvoiceData`.
 */
export function resolveLegends(data: InvoiceData): InvoiceLegends {
  const sujetaARetencion = CLASE_A_SUJETA_A_RETENCION_TYPES.includes(
    data.cbteTipo,
  );
  const letra = sujetaARetencion ? "A" : data.cbteLetra;
  const condicionIvaId = data.receptor.condicionIvaId;

  let cabecera: string | undefined;
  if (sujetaARetencion) {
    cabecera = LEYENDA_OPERACION_SUJETA_A_RETENCION;
  } else if (letra === "A" && data.pagoEnCbuInformada) {
    cabecera = LEYENDA_PAGO_EN_CBU_INFORMADA;
  }

  let transparenciaFiscal: InvoiceLegends["transparenciaFiscal"];
  const ivaContenido =
    data.transparenciaFiscal?.ivaContenido ?? data.importeIva;
  const otrosImpuestosNacionalesIndirectos =
    data.transparenciaFiscal?.otrosImpuestosNacionalesIndirectos ??
    sumNationalIndirectTaxes(data);
  // Con el campo explícito se imprime siempre; en automático, sólo a
  // consumidores finales y si hay algún importe que informar
  if (
    data.transparenciaFiscal ||
    (condicionIvaId === CONDICION_IVA_CONSUMIDOR_FINAL &&
      (ivaContenido > 0 || otrosImpuestosNacionalesIndirectos > 0))
  ) {
    transparenciaFiscal = {
      titulo: TITULO_TRANSPARENCIA_FISCAL,
      ivaContenido,
      otrosImpuestosNacionalesIndirectos,
    };
  }

  const pie: string[] = [];
  if (
    letra === "A" &&
    condicionIvaId != null &&
    CONDICIONES_IVA_MONOTRIBUTO.includes(condicionIvaId)
  ) {
    pie.push(LEYENDA_LEY_27618);
  }
  if (data.leyendas) {
    pie.push(...data.leyendas.filter(Boolean));
  }

  return { letra, cabecera, transparenciaFiscal, pie };
}

/**
 * Completa las props del template con las leyendas resueltas y la letra con
 * la que se dibuja el comprobante.
 */
export function withLegends(props: InvoiceTemplateProps): InvoiceTemplateProps {
  const legends = props.legends ?? resolveLegends(props.data);
  const data =
    props.data.cbteLetra === legends.letra
      ? props.data
      : { ...props.data, cbteLetra: legends.letra };
  return { ...props, data, legends };
}

function sumNationalIndirectTaxes(data: InvoiceData): number {
  return (data.tributos ?? [])
    .filter((t) => TRIBUTOS_NACIONALES_INDIRECTOS.includes(t.id))
    .reduce((sum, t) => sum + t.importe, 0);
}
