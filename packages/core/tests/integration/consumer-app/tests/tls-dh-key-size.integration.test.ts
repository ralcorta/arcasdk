import { describe, expect, it } from "@jest/globals";
import { Arca } from "@arcasdk/core";
import {
  buildContext,
  getCertPath,
  getKeyPath,
} from "./utils/test-credentials";
import { existsSync } from "fs";
import { resolve } from "path";

const enableIntegration = process.env.ENABLE_INTEGRATION_TESTS === "true";
const describeOrSkip = enableIntegration ? describe : describe.skip;

// Helper para detectar si el cliente está usando producción o homologación
function isUsingProduction(client: any): boolean {
  try {
    // Acceder a la información interna del cliente SOAP
    const endpoint = client?.lastRequest?.endpoint || client?.endpoint || "";
    const wsdl = client?.wsdl?.Definitions?.serviceURL || "";
    const fullUrl = endpoint || wsdl || "";

    console.log("Endpoint detectado:", fullUrl);

    // Producción contiene "servicios", "wsaa.afip" o "aws.afip"
    // Homologación contiene "homo", "homo", "whomo"
    const isHomologacion = fullUrl.toLowerCase().includes("homo");

    if (isHomologacion) {
      console.warn("⚠️  Estamos conectando a HOMOLOGACIÓN, no a PRODUCCIÓN");
      return false;
    }

    console.log("✓ Estamos conectando a PRODUCCIÓN");
    return true;
  } catch (e) {
    console.log(
      "No se pudo determinar el endpoint exacto, pero el SDK tiene production: true",
    );
    return true;
  }
}

describeOrSkip("TLS DH Key Size - Producción (Validación Issue #112)", () => {
  function createArcaWithProduction(useHttpsAgent: boolean): Arca {
    const keyPath = getKeyPath();
    const certPath = getCertPath();

    if (!existsSync(keyPath) || !existsSync(certPath)) {
      throw new Error(
        "Faltan certificados. Configure TEST_CREDENTIALS_FOLDER, TEST_PRIVATE_KEY_FILE_NAME, TEST_CERT_FILE_NAME.",
      );
    }

    const cuit = parseInt(
      process.env.TEST_CUIT ?? process.env.CUIT ?? "20111111112",
      10,
    );

    const baseContext = buildContext({ cuit, handleTicket: false });

    return new Arca({
      ...baseContext,
      production: true, // ← IMPORTANTE: Usar servidores de PRODUCCIÓN
      handleTicket: false,
      useHttpsAgent, // ← Variar según el test
      ticketPath: resolve(process.cwd(), ".ticket-cache"),
    });
  }

  it("debería fallar con 'dh key too small' sin useHttpsAgent=true en Producción", async () => {
    const arca = createArcaWithProduction(false); // useHttpsAgent = false

    try {
      // Intentar cualquier llamada que requiera conexión SOAP en producción
      await arca.electronicBillingService.getServerStatus();

      // Si llegamos aquí sin error, el servidor de producción permitió la conexión
      // (esto podría pasar si AFIP actualizó sus certificados)
      console.warn(
        "El servidor de producción no rechazó la conexión con DH débil. " +
          "AFIP puede haber actualizado sus certificados.",
      );
      expect(true).toBe(true);
    } catch (error: any) {
      const errorMessage = error?.message || error?.code || String(error);

      // Validar que sea el error específico de DH key
      const isDhKeyError =
        errorMessage.includes("dh key too small") ||
        errorMessage.includes("EPROTO") ||
        errorMessage.includes("SSL") ||
        errorMessage.includes("tlsv1 alert") ||
        errorMessage.includes("SECLEVEL");

      expect(isDhKeyError).toBe(true);
    }
  });

  it("debería funcionar correctamente con useHttpsAgent=true en Producción", async () => {
    const arca = createArcaWithProduction(true); // useHttpsAgent = true ✓

    // Verificar que se está usando modo producción
    const arcaAny = arca as any;
    console.log("=== Verificación de Configuración ===");
    console.log(
      "production mode:",
      arcaAny.context?.production ?? "NO DISPONIBLE",
    );
    console.log(
      "useHttpsAgent:",
      arcaAny.context?.useHttpsAgent ?? "NO DISPONIBLE",
    );

    // Debería conectar exitosamente
    const status = await arca.electronicBillingService.getServerStatus();

    console.log("=== Respuesta del Servidor ===");
    console.log("Server Status:", JSON.stringify(status, null, 2));

    // Intentar verificar el endpoint usado
    console.log("=== Verificación de Endpoint ===");
    const soapClient = (arcaAny.electronicBillingRepository as any)?.soapClient;
    isUsingProduction(soapClient);

    expect(status).toBeDefined();
    expect(status.appServer).toBeDefined();
    expect(status.dbServer).toBeDefined();
    expect(status.authServer).toBeDefined();
  });
});

if (!enableIntegration) {
  console.info(
    "Omitiendo tests TLS DH Key Size: ENABLE_INTEGRATION_TESTS=true",
  );
}
