export enum EndpointsEnum {
  /**
   * WS Autoservicio de Acceso a APIs
   **/
  WSAA = "https://wsaa.afip.gov.ar/ws/services/LoginCms",
  WSAA_TEST = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms",

  /**
   * WS Facturacion Electronica
   **/
  WSFEV1 = "https://servicios1.afip.gov.ar/wsfev1/service.asmx",
  WSFEV1_TEST = "https://wswhomo.afip.gov.ar/wsfev1/service.asmx",

  /**
   * WS Constancia inscripción
   **/
  WSSR_INSCRIPTION_PROOF = "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5",
  WSSR_INSCRIPTION_PROOF_TEST = "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5",

  /**
   * WS Padron 4
   **/
  WSSR_PADRON_FOUR = "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA4",
  WSSR_PADRON_FOUR_TEST = "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA4",

  /**
   * WS Padron 5
   **/
  WSSR_PADRON_FIVE = "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5",
  WSSR_PADRON_FIVE_TEST = "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5",

  /**
   * WS Padron 10
   **/
  WSSR_PADRON_TEN = "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA10",
  WSSR_PADRON_TEN_TEST = "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA10",

  /**
   * WS Padron 13
   **/
  WSSR_PADRON_THIRTEEN = "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA13",
  WSSR_PADRON_THIRTEEN_TEST = "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA13",
}

export enum SoapServiceVersion {
  /** Version 1.2 */
  ServiceSoap12 = "ServiceSoap12",
  /** Common version */
  ServiceSoap = "ServiceSoap",
}
