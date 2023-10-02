# Obtención de Certificado de Testing

### Paso 1 - Instalación de OpenSSL
Para generar el certificado, vamos a utilizar OpenSSL, que ya está incluido en sistemas Linux/Unix. Para Windows, puedes descargarlo desde https://sourceforge.net/projects/openssl y, una vez descargado, copiar la carpeta `bin` en `C:\` con el nombre `OpenSSL`. Luego, abre una consola. En Windows, asegúrate de abrirla en modo administrador y navegar hasta `C:\OpenSSL`.

### Paso 2 - Generación de la Clave de Cifrado (Key)
Dentro de la consola, el primer comando que debemos ejecutar es el siguiente para generar el archivo key.
```
openssl genrsa -out [nombre de archivo] 2048
```

Reemplaza:
 - `[nombre de archivo]` con el nombre que deseas para el archivo key. Este archivo key es crucial, ya que representa la "contraseña" con la que funcionará el certificado, así que no lo pierdas. Por ejemplo:
```
openssl genrsa -out keytest 2048
```
De esta forma, el nombre de mi archivo key sería "keytest".

### Paso 3 - Generación del Certificate Signing Request (CSR)
Una vez generada la key, estamos listos para generar el CSR. Ejecuta el siguiente comando:
```
openssl req -new -key [nombre de archivo key] -subj "/C=AR/O=[nombre de la empresa]/CN=[nombre del certificado]/serialNumber=CUIT [CUIT]" -out [nombre de archivo para el CSR]
```

Reemplaza:
 - `[nombre de archivo key]` con el nombre del archivo key generado en el paso anterior
 - `[nombre de la empresa]` con el nombre de la empresa para la que es el certificado (en pruebas, se recomienda utilizar tu propio nombre para evitar confusiones)
 - `[nombre del certificado]` con el nombre que deseas para el certificado (solo se permiten letras y números)
 - `[CUIT]` con el CUIT de la empresa a la que pertenece el certificado (en pruebas, se recomienda usar tu propio CUIT para evitar confusiones).
 - `[nombre de archivo para el CSR]` con el nombre que deseas para el archivo CSR. Por ejemplo:
```
openssl req -new -key keytest -subj "/C=AR/O=IvanM/CN=Test1/serialNumber=CUIT 11111111111" -out csr-test1
```

Ahora, el archivo CSR está listo, y podemos proceder a la página de AFIP para generar el certificado.

### Paso 4 - Generación del Certificado (Cert)
Dentro de tu escritorio de AFIP, accede a **«WSASS - Autogestión Certificados Homologación»**.

![Paso 1](/tutorial/tutorial_2_1.png)

Si no tienes esta aplicación en tu escritorio, consulta el tutorial **Cómo Habilitar el Administrador de Certificados de Pruebas**. Dentro de esta aplicación, selecciona **«Nuevo Certificado»**.

![Paso 2](/tutorial/tutorial_2_2.png)

En el campo **1. Nombre simbólico del DN**, ingresa el nombre que proporcionaste al certificado en el CSR. <br>
En **2. Solicitud del certificado en formato PKCS#10**, pega el contenido de tu CSR y luego haz clic en **Crear DN y obtener certificado**. Por ejemplo:

![Paso 2](/tutorial/tutorial_2_3.png)

El certificado se generará a continuación. Debes guardarlo en tu computadora junto con la key para usarlo posteriormente en la biblioteca.

> Ya no necesitas el CSR, puedes eliminarlo.

Ahora, lo que falta por hacer es autorizar el acceso a los servicios web que desees utilizar con este certificado.