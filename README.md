# 🎮 GameVault API

GameVault es una API RESTful inspirada en la arquitectura de la API de Rick and Morty, diseñada para entusiastas de los videojuegos que buscan datos estructurados sobre títulos clásicos y modernos.

<div align = center>
![Status](https://img.shields.io/badge/Status-Beta-cyan)
![Node](https://img.shields.io/badge/Node-20.0+-green)
![DB](https://img.shields.io/badge/Database-SQLite-blue)
</div>

## 🚀 Base URL
```
http://localhost:3000/api
```

---

## 🛠️ Endpoints

### 1. Información General
Obtén estadísticas básicas de la API.
- **Ruta:** `/api-info` (o `/api` para el router principal)
- **Método:** `GET`

### 2. Videojuegos (`/game`)
Lista todos los videojuegos con soporte para filtros y paginación.

| Filtro | Descripción | Ejemplo |
|---|---|---|
| `name` | Filtra por nombre (parcial) | `?name=zelda` |
| `genre` | Filtra por nombre de género | `?genre=rpg` |
| `platform` | Filtra por nombre o sigla de plataforma | `?platform=ps5` |
| `year` | Filtra por año exacto | `?year=2022` |
| `page` | Número de página | `?page=2` |

**Ejemplo de respuesta:**
```json
{
  "info": {
    "count": 111,
    "pages": 6,
    "next": "http://localhost:3000/api/game?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "The Legend of Zelda: Breath of the Wild",
      "year": 2017,
      "developer": "Nintendo",
      "rating": 9.7,
      "genre_id": 2,
      "genre_name": "Adventure",
      "platforms": ["Switch", "WiiU"]
    }
  ]
}
```

### 3. Géneros (`/genre`)
Lista todos los géneros disponibles y su conteo de juegos.
- **GET** `/api/genre`: Todos los géneros.
- **GET** `/api/genre/:id`: Un género específico.
- **GET** `/api/genre/:id/games`: Todos los juegos pertenecientes a ese género.

### 4. Plataformas (`/platform`)
Lista las plataformas (consolas/PC) disponibles.
- **GET** `/api/platform`: Todas las plataformas.
- **GET** `/api/platform/:id`: Una plataforma específica.
- **GET** `/api/platform/:id/games`: Juegos disponibles en esa plataforma.

---

## 📟 Paginación
La API utiliza un sistema de paginación de 20 elementos por página. El objeto `info` en la respuesta contiene los enlaces para navegar entre los resultados.

---

## 🎨 Frontend (Retro-Arcade)
El proyecto incluye un cliente web interactivo con:
- Estética **Cybperpunk / Retro-Gaming**.
- Efectos de **Scanlines y Glitch**.
- **Búsqueda en tiempo real** con Debounce.
- **Dashboard de estadísticas** dinámico.
- 🖼️ **Portadas Dinámicas de Juegos** usando la RAWG API.

### Configuración de Portadas (RAWG API)
El frontend obtiene automáticamente las portadas de los juegos en tiempo real haciendo "hover" sobre las tarjetas (y al hacer clic en ellas se abre un modal).
Para que esto funcione, necesitas una **API Key gratuita** de RAWG:
1. Regístrate en [rawg.io/apidocs](https://rawg.io/apidocs).
2. Obtén tu clave (API Key).
3. Renombra (o edita) el archivo `.env` en la raíz del proyecto y agrega:
   ```env
   RAWG_API_KEY=tu_api_key_aqui
   ```

---

## 🛠️ Instalación y Uso

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
## Expresiones de Gratitud 🎁
 * Desarrollado con ❤️ para la comunidad gaming.
 * Si te ha gustado o servido este proyecto de API, ¡no olvides darle una estrella ⭐ en GitHub!
 * Comparte el repositorio con otros desarrolladores interesados en las APIs RESTful y el desarrollo Vanilla.

### 👤 Autor
**Jose Angel Márquez Ramírez**
* Estudiante en UPAEP 🦅
* GitHub: [@Jangelmqza](https://github.com/Jangelmqza)
* Instagram: [@jangel_mqz](https://www.instagram.com/jangel_mqz?igsh=MWVocnBld2VqMzJnNA%3D%3D&utm_source=qr)
