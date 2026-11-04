
export const ArcaServiceNames = {
  FE_DUMMY: "FEDummy",
  WSFE: "wsfe",
  WSSR_INSCRIPTION_PROOF: "ws_sr_constancia_inscripcion",
  WSSR_PADRON_FOUR: "ws_sr_padron_a4",
  WSSR_PADRON_FIVE: "ws_sr_padron_a5",
  WSSR_PADRON_TEN: "ws_sr_padron_a10",
  WSSR_PADRON_THIRTEEN: "ws_sr_padron_a13",
  WSSR_PADRON_HUNDRED: "ws_sr_padron_a100",
  WSFEX: "wsfex",
  WSFECRED: "wsfecred",
  WSCT: "wsct",
} as const;

export type ArcaServiceName =
  (typeof ArcaServiceNames)[keyof typeof ArcaServiceNames];
