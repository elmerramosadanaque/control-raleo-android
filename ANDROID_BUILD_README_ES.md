# Control Raleo — preparación para generar APK Android

Este proyecto usa React + Vite y contiene llamadas a APIs de Cordova (`window.cordova`, `device`, `navigator.notification`, permisos y escáner de códigos de barras). Se agregó una configuración inicial de Cordova y un flujo de GitHub Actions para compilar el APK en un servidor en la nube, sin instalar Android Studio en la computadora.

## Importante

El APK aún no está generado ni probado. La compilación automática debe ejecutarse en GitHub Actions. El flujo puede requerir ajustes si alguno de los plugins heredados no es compatible con la versión actual de Android/Cordova.

## Cómo obtener el APK sin instalar Android Studio

1. Crea un repositorio privado en GitHub.
2. Sube los archivos de este proyecto descomprimido al repositorio, incluyendo la carpeta `.github/workflows`.
3. Abre la pestaña **Actions** del repositorio y ejecuta **Construir APK Android** con **Run workflow**, o espera a que termine el flujo al subir a `main`/`master`.
4. Cuando termine correctamente, abre la ejecución y descarga **control-raleo-apk** en **Artifacts**.
5. Descomprime el artefacto y copia `app-debug.apk` al teléfono Android para instalarlo. Es una compilación de prueba; Android puede pedir que autorices la instalación desde esa fuente.

## Funciones por validar en un teléfono real

- Inicio de sesión y conexión con `https://sistema-control-raleo.agriproserla.com/api_raleo`.
- Registro y sincronización de datos, incluidos los datos sin conexión.
- Escaneo de códigos de barras y permisos.
- Botón Atrás, GPS y comportamiento en distintos modelos de Android.

No se deben introducir contraseñas ni secretos en el repositorio. El archivo `.env` del proyecto contiene únicamente la configuración de URLs/nombres según el archivo recibido; revisa sus valores antes de publicar el repositorio.
