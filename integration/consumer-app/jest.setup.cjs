const path = require("path");
const { config } = require("dotenv");

const repoRoot = path.resolve(__dirname, "../..");
config({ path: path.join(repoRoot, ".env") });

if (!process.env.TEST_CREDENTIALS_FOLDER) {
  process.env.TEST_CREDENTIALS_FOLDER = path.join(repoRoot, "test-credentials");
} else if (!path.isAbsolute(process.env.TEST_CREDENTIALS_FOLDER)) {
  process.env.TEST_CREDENTIALS_FOLDER = path.join(
    repoRoot,
    process.env.TEST_CREDENTIALS_FOLDER,
  );
}

/**
 * Si WSFE devuelve 602 en FEParamGetPtosVenta (sin PV en padrón), los tests usan este número.
 * Override: export TEST_WSFE_PTO_VTA=10
 */
if (!process.env.TEST_WSFE_PTO_VTA) {
  process.env.TEST_WSFE_PTO_VTA = "2";
}

/**
 * Factura A: TEST_FE_RECEIVER_CUIT (DocTipo 80), suele ser un RI.
 * Factura B (CbteTipo 6): receptor 20111111112 (ej. AFIP). CondicionIVAReceptorId debe ser válida
 * para clase B/C (ver FEParamGetCondicionIvaReceptor: Cmp_Clase). El código 6 (monotributo) aplica a
 * clase A, no a B: default 5 (consumidor final). Override en .env si AFIP o el padrón lo exigen.
 */
if (!process.env.TEST_FE_RECEIVER_CUIT) {
  process.env.TEST_FE_RECEIVER_CUIT = "30716756411";
}
if (!process.env.TEST_FE_RECEIVER_CUIT_B) {
  process.env.TEST_FE_RECEIVER_CUIT_B = "20111111112";
}
if (!process.env.TEST_FE_COND_IVA_RECEPTOR_A) {
  process.env.TEST_FE_COND_IVA_RECEPTOR_A = "1";
}
if (!process.env.TEST_FE_COND_IVA_RECEPTOR_B) {
  process.env.TEST_FE_COND_IVA_RECEPTOR_B = "5";
}
if (!process.env.TEST_FE_COND_IVA_RECEPTOR_C) {
  process.env.TEST_FE_COND_IVA_RECEPTOR_C = "1";
}

/** Caché de TA de WSAA para integración (evita `alreadyAuthenticated` en reruns). */
if (!process.env.TEST_TICKET_CACHE_FOLDER) {
  process.env.TEST_TICKET_CACHE_FOLDER = path.join(
    __dirname,
    ".ticket-cache",
  );
}

jest.setTimeout(60000);
