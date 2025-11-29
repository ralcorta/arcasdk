import {
  testCbteNro,
  testCbteTipo,
  testCuit,
  testPtoVta,
} from "./voucher.mock";

export const FECompUltimoAutorizadoAsyncReturnMocks = [
  {
    FECompUltimoAutorizadoResult: {
      PtoVta: testPtoVta,
      CbteTipo: testCbteTipo,
      CbteNro: testCbteNro,
    },
  },
];
export const FEParamGetPtosVentaAsyncReturnMocks = [
  {
    FEParamGetPtosVentaResult: {
      Errors: {
        Err: [
          {
            Code: 602,
            Msg: "Sin Resultados: - Metodo FEParamGetPtosVenta",
          },
        ],
      },
    },
  },
];
export const FEDummyAsyncReturnMocks = [
  {
    FEDummyResult: {
      AppServer: "OK",
      DbServer: "OK",
      AuthServer: "OK",
    },
  },
];
export const FECAESolicitarAsyncReturnMocks = [
  {
    FECAESolicitarResult: {
      FeCabResp: {
        Cuit: testCuit,
        PtoVta: testPtoVta,
        CbteTipo: testCbteTipo,
        FchProceso: "20230513105227",
        CantReg: 1,
        Resultado: "A",
        Reproceso: "N",
      },
      FeDetResp: {
        FECAEDetResponse: [
          {
            Concepto: 2,
            DocTipo: 99,
            DocNro: 0,
            CbteDesde: testCbteNro + 1,
            CbteHasta: testCbteNro + 1,
            CbteFch: "20230503",
            Resultado: "A",
            CAE: "73588223013282",
            CAEFchVto: "20230513",
          },
        ],
      },
    },
  },
];
export const FECompConsultarAsyncReturnMocks = [
  {
    FECompConsultarResult: {
      ResultGet: {
        Concepto: 2,
        DocTipo: 99,
        DocNro: 0,
        CbteDesde: 1,
        CbteHasta: 1,
        CbteFch: "20200312",
        ImpTotal: 1000,
        ImpTotConc: 0,
        ImpNeto: 1000,
        ImpOpEx: 0,
        ImpTrib: 0,
        ImpIVA: 0,
        FchServDesde: "20200312",
        FchServHasta: "20200312",
        FchVtoPago: "20200312",
        MonId: "PES",
        MonCotiz: 1,
        Resultado: "A",
        CodAutorizacion: "71318571390730",
        EmisionTipo: "CAE",
        FchVto: "20221006",
        FchProceso: "20200312201451",
        PtoVta: 2,
        CbteTipo: 11,
      },
    },
  },
];
export const FEParamGetTiposCbteAsyncReturnMocks = [
  {
    FEParamGetTiposCbteResult: {
      ResultGet: {
        CbteTipo: [
          {
            Id: 1,
            Desc: "Factura A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 2,
            Desc: "Nota de Débito A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 3,
            Desc: "Nota de Crédito A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 6,
            Desc: "Factura B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 7,
            Desc: "Nota de Débito B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 8,
            Desc: "Nota de Crédito B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 4,
            Desc: "Recibos A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 5,
            Desc: "Notas de Venta al contado A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 9,
            Desc: "Recibos B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 10,
            Desc: "Notas de Venta al contado B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 63,
            Desc: "Liquidacion A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 64,
            Desc: "Liquidacion B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 34,
            Desc: "Cbtes. A del Anexo I, Apartado A,inc.f),R.G.Nro. 1415",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 35,
            Desc: "Cbtes. B del Anexo I,Apartado A,inc. f),R.G. Nro. 1415",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 39,
            Desc: "Otros comprobantes A que cumplan con R.G.Nro. 1415",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 40,
            Desc: "Otros comprobantes B que cumplan con R.G.Nro. 1415",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 60,
            Desc: "Cta de Vta y Liquido prod. A",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 61,
            Desc: "Cta de Vta y Liquido prod. B",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 11,
            Desc: "Factura C",
            FchDesde: "20110330",
            FchHasta: "NULL",
          },
          {
            Id: 12,
            Desc: "Nota de Débito C",
            FchDesde: "20110330",
            FchHasta: "NULL",
          },
          {
            Id: 13,
            Desc: "Nota de Crédito C",
            FchDesde: "20110330",
            FchHasta: "NULL",
          },
          {
            Id: 15,
            Desc: "Recibo C",
            FchDesde: "20110330",
            FchHasta: "NULL",
          },
          {
            Id: 49,
            Desc: "Comprobante de Compra de Bienes Usados a Consumidor Final",
            FchDesde: "20130401",
            FchHasta: "NULL",
          },
          {
            Id: 51,
            Desc: "Factura M",
            FchDesde: "20150522",
            FchHasta: "NULL",
          },
          {
            Id: 52,
            Desc: "Nota de Débito M",
            FchDesde: "20150522",
            FchHasta: "NULL",
          },
          {
            Id: 53,
            Desc: "Nota de Crédito M",
            FchDesde: "20150522",
            FchHasta: "NULL",
          },
          {
            Id: 54,
            Desc: "Recibo M",
            FchDesde: "20150522",
            FchHasta: "NULL",
          },
          {
            Id: 201,
            Desc: "Factura de Crédito electrónica MiPyMEs (FCE) A",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 202,
            Desc: "Nota de Débito electrónica MiPyMEs (FCE) A",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 203,
            Desc: "Nota de Crédito electrónica MiPyMEs (FCE) A",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 206,
            Desc: "Factura de Crédito electrónica MiPyMEs (FCE) B",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 207,
            Desc: "Nota de Débito electrónica MiPyMEs (FCE) B",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 208,
            Desc: "Nota de Crédito electrónica MiPyMEs (FCE) B",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 211,
            Desc: "Factura de Crédito electrónica MiPyMEs (FCE) C",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 212,
            Desc: "Nota de Débito electrónica MiPyMEs (FCE) C",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: 213,
            Desc: "Nota de Crédito electrónica MiPyMEs (FCE) C",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
        ],
      },
    },
  },
];
export const FEParamGetTiposConceptoAsyncReturnMocks = [
  {
    FEParamGetTiposConceptoResult: {
      ResultGet: {
        ConceptoTipo: [
          {
            Id: 1,
            Desc: "Producto",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 2,
            Desc: "Servicios",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 3,
            Desc: "Productos y Servicios",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
        ],
      },
    },
  },
];

export const FEParamGetTiposDocAsyncReturnMocks = [
  {
    FEParamGetTiposDocResult: {
      ResultGet: {
        DocTipo: [
          { Id: 80, Desc: "CUIT", FchDesde: "20080725", FchHasta: "NULL" },
          { Id: 86, Desc: "CUIL", FchDesde: "20080725", FchHasta: "NULL" },
          { Id: 87, Desc: "CDI", FchDesde: "20080725", FchHasta: "NULL" },
          { Id: 89, Desc: "LE", FchDesde: "20080725", FchHasta: "NULL" },
          { Id: 90, Desc: "LC", FchDesde: "20080725", FchHasta: "NULL" },
          {
            Id: 91,
            Desc: "CI Extranjera",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 92,
            Desc: "en trámite",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 93,
            Desc: "Acta Nacimiento",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 95,
            Desc: "CI Bs. As. RNP",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          { Id: 96, Desc: "DNI", FchDesde: "20080725", FchHasta: "NULL" },
          {
            Id: 94,
            Desc: "Pasaporte",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 0,
            Desc: "CI Policía Federal",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 1,
            Desc: "CI Buenos Aires",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 2,
            Desc: "CI Catamarca",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 3,
            Desc: "CI Córdoba",
            FchDesde: "20080725",
            FchHasta: "NULL",
          },
          {
            Id: 4,
            Desc: "CI Corrientes",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 5,
            Desc: "CI Entre Ríos",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 6,
            Desc: "CI Jujuy",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 7,
            Desc: "CI Mendoza",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 8,
            Desc: "CI La Rioja",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 9,
            Desc: "CI Salta",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 10,
            Desc: "CI San Juan",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 11,
            Desc: "CI San Luis",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 12,
            Desc: "CI Santa Fe",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 13,
            Desc: "CI Santiago del Estero",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 14,
            Desc: "CI Tucumán",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 16,
            Desc: "CI Chaco",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 17,
            Desc: "CI Chubut",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 18,
            Desc: "CI Formosa",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 19,
            Desc: "CI Misiones",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 20,
            Desc: "CI Neuquén",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 21,
            Desc: "CI La Pampa",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 22,
            Desc: "CI Río Negro",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 23,
            Desc: "CI Santa Cruz",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 24,
            Desc: "CI Tierra del Fuego",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
          {
            Id: 99,
            Desc: "Doc. (Otro)",
            FchDesde: "20080728",
            FchHasta: "NULL",
          },
        ],
      },
    },
  },
];

export const FEParamGetTiposIvaAsyncReturnMocks = [
  {
    FEParamGetTiposIvaResult: {
      ResultGet: {
        IvaTipo: [
          { Id: "3", Desc: "0%", FchDesde: "20090220", FchHasta: "NULL" },
          {
            Id: "4",
            Desc: "10.5%",
            FchDesde: "20090220",
            FchHasta: "NULL",
          },
          { Id: "5", Desc: "21%", FchDesde: "20090220", FchHasta: "NULL" },
          { Id: "6", Desc: "27%", FchDesde: "20090220", FchHasta: "NULL" },
          { Id: "8", Desc: "5%", FchDesde: "20141020", FchHasta: "NULL" },
          { Id: "9", Desc: "2.5%", FchDesde: "20141020", FchHasta: "NULL" },
        ],
      },
    },
  },
];

export const FEParamGetTiposMonedasAsyncReturnMocks = [
  {
    FEParamGetTiposMonedasResult: {
      ResultGet: {
        Moneda: [
          {
            Id: "PES",
            Desc: "Pesos Argentinos",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "DOL",
            Desc: "Dólar Estadounidense",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "002",
            Desc: "Dólar Libre EEUU",
            FchDesde: "20090416",
            FchHasta: "NULL",
          },
          {
            Id: "007",
            Desc: "Florines Holandeses",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "010",
            Desc: "Pesos Mejicanos",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "011",
            Desc: "Pesos Uruguayos",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "014",
            Desc: "Coronas Danesas",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "015",
            Desc: "Coronas Noruegas",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "016",
            Desc: "Coronas Suecas",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "018",
            Desc: "Dólar Canadiense",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "019",
            Desc: "Yens",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "021",
            Desc: "Libra Esterlina",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "023",
            Desc: "Bolívar Venezolano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "024",
            Desc: "Corona Checa",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "025",
            Desc: "Dinar Yugoslavo",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "026",
            Desc: "Dólar Australiano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "027",
            Desc: "Dracma Griego",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "028",
            Desc: "Florín (Antillas Holandesas)",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "029",
            Desc: "Güaraní",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "031",
            Desc: "Peso Boliviano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "032",
            Desc: "Peso Colombiano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "033",
            Desc: "Peso Chileno",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "034",
            Desc: "Rand Sudafricano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "036",
            Desc: "Sucre Ecuatoriano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "051",
            Desc: "Dólar de Hong Kong",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "052",
            Desc: "Dólar de Singapur",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "053",
            Desc: "Dólar de Jamaica",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "054",
            Desc: "Dólar de Taiwan",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "055",
            Desc: "Quetzal Guatemalteco",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "056",
            Desc: "Forint (Hungría)",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "057",
            Desc: "Baht (Tailandia)",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "059",
            Desc: "Dinar Kuwaiti",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "012",
            Desc: "Real",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "030",
            Desc: "Shekel (Israel)",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "035",
            Desc: "Nuevo Sol Peruano",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "060",
            Desc: "Euro",
            FchDesde: "20090403",
            FchHasta: "NULL",
          },
          {
            Id: "040",
            Desc: "Lei Rumano",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "042",
            Desc: "Peso Dominicano",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "043",
            Desc: "Balboas Panameñas",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "044",
            Desc: "Córdoba Nicaragüense",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "045",
            Desc: "Dirham Marroquí",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "046",
            Desc: "Libra Egipcia",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "047",
            Desc: "Riyal Saudita",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "061",
            Desc: "Zloty Polaco",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "062",
            Desc: "Rupia Hindú",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "063",
            Desc: "Lempira Hondureña",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "064",
            Desc: "Yuan (Rep. Pop. China)",
            FchDesde: "20090415",
            FchHasta: "NULL",
          },
          {
            Id: "009",
            Desc: "Franco Suizo",
            FchDesde: "20091110",
            FchHasta: "NULL",
          },
          {
            Id: "041",
            Desc: "Derechos Especiales de Giro",
            FchDesde: "20100125",
            FchHasta: "NULL",
          },
          {
            Id: "049",
            Desc: "Gramos de Oro Fino",
            FchDesde: "20100125",
            FchHasta: "NULL",
          },
        ],
      },
    },
  },
];

export const FEParamGetTiposOpcionalAsyncReturnMocks = [
  {
    FEParamGetTiposOpcionalResult: {
      ResultGet: {
        OpcionalTipo: [
          {
            Id: "2",
            Desc: "RG Empresas Promovidas - Indentificador de proyecto vinculado a Régimen de Promoción Industrial",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: "91",
            Desc: "RG Bienes Usados 3411 - Nombre y Apellido o Denominación del vendedor del bien usado.",
            FchDesde: "20130401",
            FchHasta: "NULL",
          },
          {
            Id: "92",
            Desc: "RG Bienes Usados 3411 - Nacionalidad del vendedor del bien usado.",
            FchDesde: "20130401",
            FchHasta: "NULL",
          },
          {
            Id: "93",
            Desc: "RG Bienes Usados 3411 - Domicilio del vendedor del bien usado.",
            FchDesde: "20130401",
            FchHasta: "NULL",
          },
          {
            Id: "5",
            Desc: "Excepcion computo IVA Credito Fiscal",
            FchDesde: "20141016",
            FchHasta: "NULL",
          },
          {
            Id: "61",
            Desc: "RG 3668 Impuesto al Valor Agregado - Art.12 IVA Firmante Doc Tipo",
            FchDesde: "20141016",
            FchHasta: "NULL",
          },
          {
            Id: "62",
            Desc: "RG 3668 Impuesto al Valor Agregado - Art.12 IVA Firmante Doc Nro",
            FchDesde: "20141016",
            FchHasta: "NULL",
          },
          {
            Id: "7",
            Desc: "RG 3668 Impuesto al Valor Agregado - Art.12 IVA Carácter del Firmante",
            FchDesde: "20141016",
            FchHasta: "NULL",
          },
          {
            Id: "10",
            Desc: "RG 3.368 Establecimientos de educación pública de gestión privada - Actividad Comprendida",
            FchDesde: "20150605",
            FchHasta: "NULL",
          },
          {
            Id: "1011",
            Desc: "RG 3.368 Establecimientos de educación pública de gestión privada - Tipo de Documento",
            FchDesde: "20150605",
            FchHasta: "NULL",
          },
          {
            Id: "1012",
            Desc: "RG 3.368 Establecimientos de educación pública de gestión privada - Número de Documento",
            FchDesde: "20150605",
            FchHasta: "NULL",
          },
          {
            Id: "11",
            Desc: "RG 2.820 Operaciones económicas vinculadas con bienes inmuebles - Actividad Comprendida",
            FchDesde: "20150605",
            FchHasta: "NULL",
          },
          {
            Id: "12",
            Desc: "RG 3.687 Locación temporaria de inmuebles con fines turísticos - Actividad Comprendida",
            FchDesde: "20150605",
            FchHasta: "NULL",
          },
          {
            Id: "13",
            Desc: "RG 2.863 Representantes de Modelos",
            FchDesde: "20160101",
            FchHasta: "NULL",
          },
          {
            Id: "14",
            Desc: "RG 2.863 Agencias de publicidad",
            FchDesde: "20160101",
            FchHasta: "NULL",
          },
          {
            Id: "15",
            Desc: "RG 2.863 Personas físicas que desarrollen actividad de modelaje",
            FchDesde: "20160101",
            FchHasta: "NULL",
          },
          {
            Id: "17",
            Desc: "RG 4004-E Locación de inmuebles destino 'casa-habitación'. Dato 2 (dos) = facturación directa / Dato 1 (uno) = facturación a través de intermediario",
            FchDesde: "20170309",
            FchHasta: "NULL",
          },
          {
            Id: "1801",
            Desc: "RG 4004-E Locación de inmuebles destino 'casa-habitación'. Clave Única de Identificación Tributaria (CUIT).",
            FchDesde: "20170309",
            FchHasta: "NULL",
          },
          {
            Id: "1802",
            Desc: "RG 4004-E Locación de inmuebles destino 'casa-habitación'. Apellido y nombres, denominación y/o razón social.",
            FchDesde: "20170309",
            FchHasta: "NULL",
          },
          {
            Id: "2101",
            Desc: "Factura de Crédito Electrónica MiPyMEs (FCE) - CBU del Emisor",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: "2102",
            Desc: "Factura de Crédito Electrónica MiPyMEs (FCE) - Alias del Emisor",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: "22",
            Desc: "Factura de Crédito Electrónica MiPyMEs (FCE) - Anulación",
            FchDesde: "20181226",
            FchHasta: "NULL",
          },
          {
            Id: "23",
            Desc: "Factura de Crédito Electrónica MiPyMEs (FCE) - Referencia Comercial",
            FchDesde: "20190308",
            FchHasta: "NULL",
          },
          {
            Id: "27",
            Desc: "Factura de Credito Electronica MiPyMEs (FCE) - Transferencia",
            FchDesde: "20201126",
            FchHasta: "NULL",
          },
        ],
      },
    },
  },
];

export const FEParamGetTiposTributosAsyncReturnMocks = [
  {
    FEParamGetTiposTributosResult: {
      ResultGet: {
        TributoTipo: [
          {
            Id: 1,
            Desc: "Impuestos nacionales",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 2,
            Desc: "Impuestos provinciales",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 3,
            Desc: "Impuestos municipales",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          {
            Id: 4,
            Desc: "Impuestos Internos",
            FchDesde: "20100917",
            FchHasta: "NULL",
          },
          { Id: 99, Desc: "Otro", FchDesde: "20100917", FchHasta: "NULL" },
          { Id: 5, Desc: "IIBB", FchDesde: "20170719", FchHasta: "NULL" },
          {
            Id: 6,
            Desc: "Percepción de IVA",
            FchDesde: "20170719",
            FchHasta: "NULL",
          },
          {
            Id: 7,
            Desc: "Percepción de IIBB",
            FchDesde: "20170719",
            FchHasta: "NULL",
          },
          {
            Id: 8,
            Desc: "Percepciones por Impuestos Municipales",
            FchDesde: "20170719",
            FchHasta: "NULL",
          },
          {
            Id: 9,
            Desc: "Otras Percepciones",
            FchDesde: "20170719",
            FchHasta: "NULL",
          },
          {
            Id: 13,
            Desc: "Percepción de IVA a no Categorizado",
            FchDesde: "20170719",
            FchHasta: "NULL",
          },
        ],
      },
    },
  },
];

export const dummyAsyncReturnMocks = [
  {
    return: { appserver: "OK", authserver: "OK", dbserver: "OK" },
  },
];

export const getPersona_v2AsyncReturnMocks = [
  {
    personaReturn: {
      errorConstancia: {
        apellido: "Doe",
        error: ["Domicilio Incompleto"],
        idPersona: 20111111111,
        nombre: "John",
      },
      metadata: { fechaHora: "2023-9-03T19:32:13.721Z", servidor: "setiwsh2" },
    },
  },
];

export const getPersonaList_v2AsyncReturnMocks = [
  {
    personaListReturn: {
      metadata: { fechaHora: "2023-9-03T19:32:13.721Z", servidor: "setiwsh2" },
      persona: [
        {
          errorConstancia: {
            apellido: "Doe",
            error: ["Domicilio Incompleto"],
            idPersona: 20111111111,
            nombre: "John",
          },
        },
        {
          errorConstancia: {
            apellido: "Doe",
            error: ["Domicilio Incompleto"],
            idPersona: 20111111111,
            nombre: "John",
          },
        },
      ],
    },
  },
];

export const scopeFourDummyAsyncReturnMocks = [
  { return: { appserver: "OK", authserver: "OK", dbserver: "OK" } },
];

export const scopeFourGetPersonaAsyncReturnMocks = [
  {
    personaReturn: {
      metadata: { fechaHora: "2023-10-02T22:45:02.984Z", servidor: "setiwsh2" },
      persona: {
        actividad: [
          {
            descripcionActividad:
              "SERVICIOS DE ASESORAMIENTO, DIRECCIÓN Y GESTIÓN EMPRESARIAL REALIZADOS POR INTEGRANTES DE LOS ÓRGANOS DE ADMINISTRACIÓN Y/O FISCALIZACIÓN EN SOCIEDADES ANÓNIMAS",
            idActividad: 702091,
            nomenclador: 883,
            orden: 1,
            periodo: 201501,
          },
        ],
        apellido: "John",
        estadoClave: "ACTIVO",
        fechaInscripcion: "2009-11-07T15:00:00.000Z",
        fechaNacimiento: "1991-10-15T15:00:00.000Z",
        idPersona: 20111111111,
        impuesto: [
          {
            descripcionImpuesto: "IVA",
            diaPeriodo: 1,
            estado: "ACTIVO",
            ffInscripcion: "2010-10-29T15:40:13.000Z",
            idImpuesto: 30,
            periodo: 199101,
          },
          {
            descripcionImpuesto: "SIRE -  IVA",
            diaPeriodo: 1,
            estado: "ACTIVO",
            ffInscripcion: "2017-01-01T15:00:00.000Z",
            idImpuesto: 216,
            periodo: 201701,
          },
          {
            descripcionImpuesto: "IMP.A LAS GAN.- BENEF.DEL EXT.",
            diaPeriodo: 1,
            estado: "ACTIVO",
            ffInscripcion: "2017-01-01T15:00:00.000Z",
            idImpuesto: 218,
            periodo: 201701,
          },
          {
            descripcionImpuesto: "PRESENT. DJ SIRE IMPOSITIVO",
            diaPeriodo: 1,
            estado: "ACTIVO",
            ffInscripcion: "2017-01-01T15:00:00.000Z",
            idImpuesto: 785,
            periodo: 201701,
          },
          {
            descripcionImpuesto: "GANANCIAS PERSONAS FISICAS",
            diaPeriodo: 1,
            estado: "ACTIVO",
            ffInscripcion: "2007-03-06T15:00:00.000Z",
            idImpuesto: 11,
            periodo: 200401,
          },
        ],
        mesCierre: 12,
        nombre: "John Doe",
        numeroDocumento: "11111111",
        relacion: [
          {
            ffRelacion: "2010-08-23T15:05:43.000Z",
            idPersona: 20111111111,
            idPersonaAsociada: 20111111111,
            tipoRelacion: "PERSONA JURIDICA/ PERSONA FISICA REPRESENTADA",
          },
        ],
        sexo: "MASCULINO",
        tipoClave: "CUIT",
        tipoDocumento: "DNI",
        tipoPersona: "FISICA",
      },
    },
  },
];

export const scopeTenDummyAsyncReturnMocks = [
  { return: { appserver: "OK", authserver: "OK", dbserver: "OK" } },
];

export const scopeTenGetPersonaAsyncReturnMocks = [
  {
    personaReturn: {
      metadata: { fechaHora: "2023-10-03T11:26:32.010Z", servidor: "setiwsh2" },
      persona: {
        apellido: "Doe",
        descripcionActividadPrincipal:
          "SERVICIOS DE ASESORAMIENTO, DIRECCIÓN Y GESTIÓN EMPRESARIAL REALIZADOS POR INTEGRANTES DE LOS ÓRGANOS DE ADMINISTRACIÓN Y/O FISCALIZACIÓN EN SOCIEDADES ANÓNIMAS",
        estadoClave: "ACTIVO",
        idActividadPrincipal: 702091,
        idPersona: 20111111111,
        nombre: "John Doe",
        numeroDocumento: "11111111",
        tipoClave: "CUIT",
        tipoDocumento: "DNI",
        tipoPersona: "FISICA",
      },
    },
  },
];

export const scopeThirteenDummyAsyncReturnMocks = [
  { return: { appserver: "OK", authserver: "OK", dbserver: "OK" } },
];

export const scopeThirteenGetPersonaAsyncReturnMocks = [
  {
    personaReturn: {
      metadata: { fechaHora: "2023-10-03T11:39:33.448Z", servidor: "setiwsh2" },
      persona: {
        apellido: "Doe",
        descripcionActividadPrincipal:
          "SERVICIOS DE ASESORAMIENTO, DIRECCIÓN Y GESTIÓN EMPRESARIAL REALIZADOS POR INTEGRANTES DE LOS ÓRGANOS DE ADMINISTRACIÓN Y/O FISCALIZACIÓN EN SOCIEDADES ANÓNIMAS",
        estadoClave: "ACTIVO",
        fechaNacimiento: "1991-10-15T15:00:00.000Z",
        idActividadPrincipal: 702091,
        idPersona: 20111111111,
        mesCierre: 12,
        nombre: "John Doe",
        numeroDocumento: "11111111",
        periodoActividadPrincipal: 201501,
        tipoClave: "CUIT",
        tipoDocumento: "DNI",
        tipoPersona: "FISICA",
      },
    },
  },
];
