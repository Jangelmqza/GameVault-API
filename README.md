
# 🎮 GameVault API

GameVault es una API RESTful inspirada en la arquitectura de la API de Rick and Morty, diseñada para entusiastas de los videojuegos que buscan datos estructurados sobre títulos clásicos y modernos. Además, el proyecto incluye un cliente web interactivo para el Frontend con estética **Cyberpunk / Retro-Gaming**, efectos visuales como scanlines y búsqueda en tiempo real.

🌐 **Demo en vivo:** [https://gamevault-api-2l4o.onrender.com](https://gamevault-api-2l4o.onrender.com)

## Comenzando 🚀

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋

Para hacer funcionar el entorno local necesitarás tener instalado **Node.js** (que incluye el gestor de paquetes npm). Además, para que el frontend pueda cargar las portadas dinámicas de los juegos, necesitarás una **API Key gratuita** de RAWG.

```bash
# Verifica que tienes Node.js y npm instalados ejecutando:
node -v
npm -v

```
 1. Regístrate en rawg.io/apidocs.
 2. Obtén tu clave (API Key).
### Instalación 🔧
Sigue esta serie de pasos para tener un entorno de desarrollo ejecutándose:
*Clona el repositorio e ingresa a la carpeta del proyecto:*
```bash
git clone [https://github.com/Jangelmqza/GameVault-API.git](https://github.com/Jangelmqza/GameVault-API.git)
cd GameVault-API

```
*Instala las dependencias necesarias de Node:*
```bash
npm install

```
*Configura la llave de RAWG para las imágenes:*
Renombra (o edita) el archivo .env en la raíz del proyecto y agrega:
```env
RAWG_API_KEY=tu_api_key_aqui

```
*Puebla la base de datos local de SQLite con la información de los videojuegos (Seed):*
```bash
node src/seed/seedData.js

```
*Finalmente, inicia el servidor en modo desarrollo:*
```bash
npm start

```
Una vez que diga que el servidor está corriendo, abre http://localhost:3000 en tu navegador para ver la interfaz o http://localhost:3000/api para acceder a los endpoints localmente.
## Ejecutando las pruebas ⚙️
Puedes verificar el correcto funcionamiento del backend haciendo peticiones a la API desde tu navegador, o usando herramientas como Postman, cURL o Insomnia.
### Analice las pruebas a los Endpoints 🔩
Estas pruebas manuales te permiten verificar que el enrutamiento y los filtros de la base de datos funcionan según lo esperado, apuntando directamente al servidor de producción:
```bash
# Obtener información y estadísticas de la API
curl [https://gamevault-api-2l4o.onrender.com/api-info](https://gamevault-api-2l4o.onrender.com/api-info)

# Obtener todos los videojuegos (soporta filtros como ?name=zelda)
curl "[https://gamevault-api-2l4o.onrender.com/api/game?name=zelda](https://gamevault-api-2l4o.onrender.com/api/game?name=zelda)"

# Obtener todos los juegos de una plataforma en específico (ej. PS5)
curl "[https://gamevault-api-2l4o.onrender.com/api/platform/ps5/games](https://gamevault-api-2l4o.onrender.com/api/platform/ps5/games)"

```
## Despliegue 📦
El proyecto se encuentra desplegado y alojado en la nube utilizando **Render**. Puedes acceder a la interfaz web cliente y realizar peticiones a la API directamente en producción sin necesidad de levantar el entorno local.
 * **URL del sitio web:** https://gamevault-api-2l4o.onrender.com
 * **URL base de la API:** https://gamevault-api-2l4o.onrender.com/api
## Construido con 🛠️
Las tecnologías principales utilizadas para crear este proyecto fueron:
 * **Node.js & Express.js** - Entorno de ejecución y framework web usado para el backend.
 * **SQLite** - Manejador de la base de datos mediante la librería better-sqlite3.
 * **Vanilla JS & CSS3** - Utilizados para construir todo el cliente web interactivo con variables personalizadas y animaciones sin depender de frameworks pesados.
 * **RAWG API** - Servicio de terceros utilizado de manera asíncrona para obtener el arte de portada de cada título.
## Autores ✒️
 * **Jose Angel Márquez Ramírez (Jangelmqza)** - *Desarrollo Completo* - Jangelmqza
También puedes mirar la lista de todos los contribuyentes que han participado en este proyecto.
## Licencia 📄
Para más detalles sobre los derechos de uso o distribución, revisa directamente el repositorio del código fuente.
## Expresiones de Gratitud 🎁
 * Desarrollado con ❤️ para la comunidad gaming.
 * Si te ha gustado o servido este proyecto de API, ¡no olvides darle una estrella ⭐ en GitHub!
 * Comparte el repositorio con otros desarrolladores interesados en las APIs RESTful y el desarrollo Vanilla.
⌨️ con ❤️ por Jose Angel Márquez Ramírez utilizando la plantilla de Villanuevand 😊
```

```
