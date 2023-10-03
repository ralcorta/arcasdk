# Comportamientos

## Autenticación

Para interactuar con los servicios web de AFIP, es esencial autenticarse a través de su servicio de [WSAA](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf), que proporciona los tokens necesarios con una validez de hasta 12 horas. Sin embargo, este servicio de autenticación tiene ciertas restricciones en cuanto a cuándo se puede llamar: solo cada 2 minutos en entornos de producción y hasta cada 10 minutos en entornos de homologación.
En resumen, necesitamos almacenar las credenciales requeridas para acceder a los servicios web de AFIP en algún lugar seguro, con el propósito de poder utilizarlas nuevamente en el futuro.

Muchos otros paquetes resuelven este problema almacenando internamente estos tokens en archivos locales del servidor utilizando el file sistem de Node (mediante `require('fs')`). Esto plantea un desafío cuando se ejecutan en entornos serverless, como las Lambdas de AWS.

Nuestro paquete, en cambio, ofrece una solución versátil para gestionar estos tickets de acceso (TA que devuelve AFIP). Podés optar por manejar estos datos de manera personalizada, lo que te permite tomar esos datos y guardarlos en el lugar que más te convenga, como una base de datos, un sistema de almacenamiento S3 o cualquier otro proveedor de almacenamiento que prefieras.

Sin embargo, si prefieres que los tokens se gestionen automáticamente y se almacenen en el servidor, simplemente puedes no especificar ninguna configuración en el contexto de la clase Afip al instanciarla. El paquete se encargará de guardar los tokens en formato JSON dentro de la carpeta predeterminada (por defecto, en root/src/auth/tickets), aunque también tienes la flexibilidad de personalizar la ubicación de almacenamiento desde el constructor según tus necesidades.

### En resumen

 - **Autenticación Crucial:** La autenticación a través del servicio WSAA de AFIP es esencial para acceder a sus servicios web.
 - **Validez de Tokens:** Los tokens generados tienen una validez de hasta 12 horas.
 - **Restricciones de Tiempo:** El servicio de autenticación tiene restricciones de tiempo:
   - 2 minutos en producción
   - 10 minutos en entornos de homologación (testing).
 - **Necesidad de Almacenamiento:** Para futuros accesos, es necesario guardar las credenciales de manera segura.
 - **Desafío en Entornos Serverless:** Algunos paquetes almacenan tokens internamente en archivos locales, lo que puede ser problemático en entornos serverless como AWS Lambda.
 - **Solución Versátil:** Nuestro paquete ofrece una solución versátil para gestionar los tokens de acceso (TA) de AFIP.
 - **Opción Personalizada:** Puedes optar por gestionar estos datos de manera personalizada y elegir dónde almacenarlos.
 - **Almacenamiento Automático:** Si prefieres, el paquete puede encargarse del almacenamiento automático en el servidor.
 - **Flexibilidad de Ubicación:** Tienes la flexibilidad de personalizar la ubicación de almacenamiento según tus necesidades desde el constructor.