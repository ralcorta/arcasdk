# Autorización para Acceder a un Servicio Web de Pruebas

Para permitir que los certificados accedan a un servicio web, es necesario crear una autorización. Sigue estos pasos:

Dentro de **WSASS - Autogestión Certificados Homologación**, la misma aplicación que utilizamos previamente para obtener el certificado de pruebas, selecciona **Crear autorización a servicio**.

![Paso 1](/tutorial/tutorial_3_1.png)

A continuación:

1. En **1. Nombre simbólico del DN a autorizar**, elige el certificado que deseas autorizar.

3. En **3. CUIT representado**, ingresa el CUIT con el que deseas utilizar el servicio web. En el entorno de pruebas, se recomienda utilizar tu propio CUIT para evitar confusiones.

5. En **5. Servicio al que deseas acceder**, selecciona el servicio web que deseas utilizar.

Una vez completados estos campos, haz clic en **Crear autorización de acceso**.

Por ejemplo, para autorizar el acceso al servicio web de facturación electrónica, la configuración se vería de la siguiente manera:

![Paso 2](/tutorial/tutorial_3_2.png)

Luego, ve a la sección **Autorizaciones** para verificar que la autorización se ha creado correctamente.

![Paso 3](/tutorial/tutorial_3_3.png)

¡Eso es todo! Ahora estás listo para utilizar el certificado con acceso autorizado al servicio web correspondiente.