# Errores Frecuentes

## ⚠️ Advertencia: Uso de la constante no definida SOAP_1_2 - asumida "SOAP_1_2"
Este problema ocurre cuando la extensión SOAP de PHP está desactivada. Para solucionarlo, debes habilitar la extensión SOAP en el archivo php.ini (Asegúrate de reiniciar Apache para aplicar los cambios).

## ❌ Error: (11002) El punto de venta no se encuentra habilitado para usar este WS. Consulta el método FEParamGetPtosVenta
Debes habilitar el punto de venta para que sea accesible desde los servicios web. Esto se hace desde la página de AFIP.

## 💥 Error Fatal: Uncaught Exception: SOAP Fault: ns1:coe.alreadyAuthenticated El CEE ya posee un TA válido para el acceso al WSN solicitado
Este error ocurre cuando ya se ha creado un Token de Acceso (TA) para el certificado que estás utilizando. Esto puede suceder si borras el archivo del Token y debes esperar un tiempo para obtener uno nuevo o si estás utilizando el mismo certificado en otro servidor o computadora. En este último caso, debes crear un certificado nuevo para el servidor que estás utilizando, ya que no se debe usar el mismo certificado en servidores diferentes.

## (10016) El número o la fecha del comprobante no se corresponden con el próximo a autorizar
Asegúrate de que en los campos CbteDesde y CbteHasta estés ingresando el número del siguiente comprobante a autorizar. La documentación de la librería te muestra cómo obtener el número del último comprobante. Además, la versión PRO incluye ejemplos para diferentes tipos de facturas. Este error también puede ocurrir si intentas enviar un comprobante con una fecha anterior a la del último comprobante enviado. Para solucionarlo, debes enviarlo con una fecha igual o posterior.

## 📜 Certificado no emitido por AC de confianza
Este error se produce cuando intentas utilizar certificados de prueba en modo producción o viceversa. Se soluciona cambiando los certificados por los correspondientes o cambiando el modo de la librería (modo de prueba o producción).

## ⚠️ Advertencia: openssl_pkcs7_sign(): error al obtener el certificado
Este error suele aparecer cuando se confunde el certificado con el CSR. Asegúrate de que la primera línea del certificado diga "--BEGIN CERTIFICATE--". Si encuentras algo diferente, ese no es el certificado correcto. Si este método no soluciona el problema, puedes generar un certificado nuevamente siguiendo los tutoriales en la página de AFIP.

## (600) Validación de Token: Error al verificar el hash: Validación de Hash: No se validó la firma digital
Este error suele aparecer al cambiar entre los modos de producción y prueba. Para solucionarlo, debes borrar el archivo .xml que se genera en la carpeta Afip_res correspondiente al servicio web al que intentas acceder.

## (600) Validación de Token: CUIT no aparece en la lista de relaciones
Este error ocurre cuando intentas usar la librería con un CUIT diferente al que se utilizó al generar el certificado. Para solucionarlo, debes utilizar el mismo CUIT.

## 🚫 Error 500
Este error aparece cuando hay un error en el código pero no se muestra cuál es el error real. Deberías agregar `error_reporting(E_ALL); ini_set("display_errors", "1");` en tu código para identificar el error exacto.

## (501) Error Interno de la Base de Datos
Este es un error interno de AFIP. La única solución es esperar a que lo solucionen.

## SOAP Fault: ns1:coe.notAuthorized Computador no autorizado a acceder al servicio
El problema radica en la falta de autorización para acceder al servicio web con el certificado que estás utilizando. Consulta el tutorial "Autorizar un Servicio Web de Prueba" para obtener instrucciones sobre cómo autorizar en modo de prueba y el tutorial "Autorizar un Servicio Web de Producción" para autorizar en modo de producción.

## Unable to verify the first certificate
Este problema surge cuando tus certificados no tienen permisos para acceder al servicio solicitado, como por ejemplo, al consultar el padrón 5. Para solucionarlo, es necesario otorgar permisos de acceso, de manera similar a cómo lo hicimos al habilitar el servicio de facturación desde el sitio de AFIP.