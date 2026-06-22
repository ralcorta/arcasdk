
export const Endpoints = {
  
  WSAA: "https://wsaa.afip.gov.ar/ws/services/LoginCms",
  WSAA_TEST: "https://wsaahomo.afip.gov.ar/ws/services/LoginCms",

  
  WSFEV1: "https://servicios1.afip.gov.ar/wsfev1/service.asmx",
  WSFEV1_TEST: "https://wswhomo.afip.gov.ar/wsfev1/service.asmx",

  
  WSSR_INSCRIPTION_PROOF:
    "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5",
  WSSR_INSCRIPTION_PROOF_TEST:
    "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5",

  
  WSSR_PADRON_FOUR:
    "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA4",
  WSSR_PADRON_FOUR_TEST:
    "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA4",

  
  WSSR_PADRON_FIVE:
    "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5",
  WSSR_PADRON_FIVE_TEST:
    "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5",

  
  WSSR_PADRON_TEN:
    "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA10",
  WSSR_PADRON_TEN_TEST:
    "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA10",

  
  WSSR_PADRON_THIRTEEN:
    "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA13",
  WSSR_PADRON_THIRTEEN_TEST:
    "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA13",

  
  WSFEX: "https://servicios1.afip.gov.ar/wsfexv1/service.asmx",
  WSFEX_TEST: "https://wswhomo.afip.gov.ar/wsfexv1/service.asmx",

  
  WSFECRED: "https://serviciosjava.afip.gob.ar/wsfecred/FECredService",
  WSFECRED_TEST: "https://fwshomo.afip.gov.ar/wsfecred/FECredService",
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
