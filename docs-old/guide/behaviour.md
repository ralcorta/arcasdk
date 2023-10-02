# Comportamiento

Para poder comunicarse con los Web Services de AFIP se debe autenticar con su servicio de [WSAA](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf) el cual retorna los tokens necesarios con una validez de hasta 12 horas.
Este servicio de autenticacion solo puede ser llamado cada 2 minutos en los servidores de produccion y hasta 10 minutos en los servidores de homologiacion.

Para esto otros paquetes internamente generan archivos donde guardan estos tokens de manera local en el servidor usando el file sistem de Node (require('fs')). Esto es un problema cuando se ejecuta sobre funciones serverless como las Lambdas de AWS.

Este paquete permite manejar los tickets de acceso (TA que devuelve con los tokens AFIP) de manera personals si se desea, permitiendo tomar datos y guardarlos donde les sea mas conveniente, como en una BD, un S3, o algun storage provider.

Aun asi, si no se quiere manejar personalmente y que se guarden en el servidor, pueden no especificar nada en el contexto de la clase Afip al momento de instanciarlo y este guardara JSONs con los tokens dentro de la carpeta del paquete (Por default root/src/auth/tickets, aunque se puede cambiar desde el constructor).
