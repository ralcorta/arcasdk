#!/usr/bin/env ts-node

/**
 * Ejemplo simple de cómo crear una factura usando Arca SDK
 *
 * Ejecutar: npm run example:create-invoice
 */

import { Arca } from "../src";
import { IVoucher } from "../src/types";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

async function createInvoice() {
  try {
    // 1. Configurar certificados
    const cuit = parseInt(
      process.env.TEST_CUIT || process.env.CUIT || "20111111112"
    );
    const credentialsFolder =
      process.env.TEST_CREDENTIALS_FOLDER || "test-credentials";
    const keyFile =
      process.env.TEST_PRIVATE_KEY_FILE_NAME || "homologacion.key";
    const certFile = process.env.TEST_CERT_FILE_NAME || "homologacion.crt";

    const keyPath = credentialsFolder.startsWith("/")
      ? path.join(credentialsFolder, keyFile)
      : path.resolve(process.cwd(), credentialsFolder, keyFile);
    const certPath = credentialsFolder.startsWith("/")
      ? path.join(credentialsFolder, certFile)
      : path.resolve(process.cwd(), credentialsFolder, certFile);

    const key = fs.existsSync(keyPath)
      ? fs.readFileSync(keyPath, "utf8")
      : process.env.KEY || "";
    const cert = fs.existsSync(certPath)
      ? fs.readFileSync(certPath, "utf8")
      : process.env.CERT || "";

    if (!key || !cert) {
      throw new Error(
        "Certificados no encontrados. Configura TEST_CREDENTIALS_FOLDER o CERT/KEY en .env"
      );
    }

    // 2. Inicializar Arca SDK
    const arca = new Arca({
      key,
      cert,
      cuit,
      production: false,
      enableLogging: true,
    });

    console.log(
      `✅ Arca SDK inicializado (CUIT: ${cuit}, Modo: Homologación)\n`
    );

    // 3. Obtener punto de venta
    const salesPointsResult =
      await arca.electronicBillingService.getSalesPoints();
    const salesPoints =
      salesPointsResult.FEParamGetPtosVentaResult?.ResultGet?.PtoVenta || [];

    // Usar punto de venta 2 si está disponible, o el configurado en TEST_PTO_VTA, o el primero disponible
    let puntoVenta: number | null = null;

    if (process.env.TEST_PTO_VTA) {
      puntoVenta = parseInt(process.env.TEST_PTO_VTA);
    } else if (salesPoints.length > 0) {
      // Buscar punto de venta 2 primero
      const pv2 = salesPoints.find((pv: any) => pv.Nro === 2);
      puntoVenta = pv2 ? 2 : salesPoints[0].Nro;
    } else {
      // Si no hay puntos de venta disponibles, usar 2 por defecto
      puntoVenta = 2;
    }

    if (!puntoVenta) {
      throw new Error(
        "No se pudo determinar el punto de venta. " +
          "Configura TEST_PTO_VTA en .env para usar un punto de venta específico."
      );
    }

    console.log(`📌 Punto de venta: ${puntoVenta}`);

    // 4. Obtener último comprobante
    const tipoComprobante = 11; // Factura C
    const lastVoucher = await arca.electronicBillingService.getLastVoucher(
      puntoVenta,
      tipoComprobante
    );
    const siguienteNumero = (lastVoucher.CbteNro || 0) + 1;
    console.log(`📄 Siguiente número: ${siguienteNumero}\n`);

    // 5. Preparar datos de la factura
    const fecha = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");

    // Para facturas tipo C (tipo 11), no se debe incluir IVA
    const esFacturaC = tipoComprobante === 11;
    const impNeto = 100;
    const impTrib = 0;
    const impIVA = esFacturaC ? 0 : 21; // Factura C no tiene IVA
    const impTotal = impNeto + impTrib; // Sin IVA para factura C

    const facturaData: IVoucher = {
      CantReg: 1,
      PtoVta: puntoVenta,
      CbteTipo: tipoComprobante,
      Concepto: 2, // Servicios
      DocTipo: 99, // Consumidor Final
      DocNro: 0,
      CbteDesde: siguienteNumero,
      CbteHasta: siguienteNumero,
      CbteFch: fecha,
      ImpTotal: impTotal,
      ImpTotConc: 0,
      ImpNeto: impNeto,
      ImpOpEx: 0,
      ImpIVA: impIVA,
      ImpTrib: impTrib,
      MonId: "PES",
      MonCotiz: 1,
      CondicionIVAReceptorId: 1,
      FchServDesde: fecha,
      FchServHasta: fecha,
      FchVtoPago: fecha,
      // No incluir Iva para facturas tipo C
      ...(esFacturaC
        ? {}
        : { Iva: [{ Id: 5, BaseImp: impNeto, Importe: impIVA }] }),
    };

    // 6. Crear factura
    console.log("🚀 Creando factura...");
    const resultado = await arca.electronicBillingService.createVoucher(
      facturaData
    );

    // 7. Mostrar resultado
    if (resultado.cae) {
      console.log("\n✅ ¡Factura creada exitosamente!");
      console.log(`📄 CAE: ${resultado.cae}`);
      console.log(`📅 Vencimiento CAE: ${resultado.caeFchVto}`);
      console.log(`🔢 Comprobante: ${siguienteNumero}`);
    } else {
      console.error("\n❌ Error al crear la factura");

      // Mostrar errores si existen
      if (resultado.response.Errors?.Err?.length) {
        console.error("\nErrores:");
        resultado.response.Errors.Err.forEach((err: any) => {
          console.error(`   Código ${err.Code}: ${err.Msg}`);
        });
      }

      // Mostrar eventos si existen (pueden contener información útil)
      if (resultado.response.Events?.Evt?.length) {
        console.log("\nEventos:");
        resultado.response.Events.Evt.forEach((evt: any) => {
          console.log(`   Código ${evt.Code}: ${evt.Msg}`);
        });
      }

      // Mostrar respuesta completa si DEBUG está habilitado
      if (process.env.DEBUG === "true") {
        console.log("\n🔍 Respuesta completa:");
        console.log(JSON.stringify(resultado.response, null, 2));
      } else {
        console.log("\n💡 Ejecuta con DEBUG=true para ver más detalles:");
        console.log("   DEBUG=true npm run example:create-invoice");
      }

      process.exit(1);
    }
  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    if (error.stack) console.error(error.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  createInvoice();
}
