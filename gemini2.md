# 🎮 GameVault API — Arquitectura del Proyecto

## Descripción General

**GameVault** es una API REST pública construida con Node.js y Express que permite consultar y gestionar información sobre videojuegos, géneros, plataformas y años de creación. Incluye un frontend dinámico e interactivo con HTML, CSS y JavaScript vanilla.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js 20+ |
| Framework API | Express.js |
| Base de Datos | SQLite (via `better-sqlite3`) |
| Seed de Datos | Datos reales de videojuegos |
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Imágenes de Portadas | RAWG Video Games Database API (gratuita) |
| Documentación | README.md estilo Rick and Morty API |

---

## Estructura del Proyecto

```
gamevault/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración y conexión SQLite
│   ├── controllers/
│   │   ├── gameController.js    # Lógica de juegos
│   │   ├── genreController.js   # Lógica de géneros
│   │   ├── platformController.js# Lógica de plataformas
│   │   └── yearController.js    # Lógica de años
│   ├── routes/
│   │   ├── index.js             # Router principal
│   │   ├── games.js             # Rutas /api/game
│   │   ├── genres.js            # Rutas /api/genre
│   │   ├── platforms.js         # Rutas /api/platform
│   │   └── years.js             # Rutas /api/year (filtro)
│   ├── models/
│   │   ├── Game.js
│   │   ├── Genre.js
│   │   └── Platform.js
│   ├── middleware/
│   │   ├── errorHandler.js      # Manejo global de errores
│   │   └── pagination.js        # Paginación reutilizable
│   ├── seed/
│   │   └── seedData.js          # 100+ juegos reales con datos completos
│   └── app.js                   # Configuración Express
├── public/
│   ├── index.html               # Frontend principal
│   ├── css/
│   │   └── styles.css           # Estilos dinámicos + estilos de portadas
│   └── js/
│       ├── main.js              # Lógica del frontend
│       └── covers.js            # Módulo de portadas (RAWG API)
├── database.sqlite              # Archivo de base de datos
├── server.js                    # Entry point
├── package.json
└── README.md                    # Documentación de la API
```

---

## Modelo de Datos

### Game
```json
{
  "id": 1,
  "name": "The Legend of Zelda: Breath of the Wild",
  "year": 2017,
  "genre": { "id": 3, "name": "Action-Adventure" },
  "platform": [
    { "id": 2, "name": "Nintendo Switch" },
    { "id": 7, "name": "Wii U" }
  ],
  "developer": "Nintendo",
  "rating": 9.7
}
```

### Genre
```json
{
  "id": 1,
  "name": "RPG",
  "games": 42
}
```

### Platform
```json
{
  "id": 1,
  "name": "PlayStation 5",
  "short": "PS5",
  "manufacturer": "Sony",
  "games": 18
}
```

---

## Endpoints de la API

### Base URL
```
http://localhost:3000/api
```

### Games — `/api/game`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/game` | Todos los juegos (paginado) |
| GET | `/api/game/:id` | Un juego por ID |
| GET | `/api/game?name=zelda` | Filtrar por nombre |
| GET | `/api/game?genre=rpg` | Filtrar por género |
| GET | `/api/game?platform=ps5` | Filtrar por plataforma |
| GET | `/api/game?year=2020` | Filtrar por año |

### Genres — `/api/genre`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/genre` | Todos los géneros |
| GET | `/api/genre/:id` | Un género por ID |
| GET | `/api/genre/:id/games` | Juegos de ese género |

### Platforms — `/api/platform`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/platform` | Todas las plataformas |
| GET | `/api/platform/:id` | Una plataforma por ID |
| GET | `/api/platform/:id/games` | Juegos de esa plataforma |

### Info General — `/api`
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api` | Estadísticas generales de la API |

---

## Paginación

Todos los endpoints de listado soportan paginación:
```
GET /api/game?page=2
```
```json
{
  "info": {
    "count": 120,
    "pages": 6,
    "next": "http://localhost:3000/api/game?page=3",
    "prev": "http://localhost:3000/api/game?page=1"
  },
  "results": [...]
}
```

---

## Frontend

El frontend consume la propia API y ofrece:

- 🔍 **Buscador en tiempo real** de videojuegos
- 🎨 **Filtros interactivos** por género, plataforma y año
- 🃏 **Cards animadas** con información de cada juego
- 📊 **Dashboard de estadísticas** (total juegos, géneros, plataformas)
- 📱 **Diseño responsive** con estética retro-gaming oscura
- ⚡ **Animaciones CSS** y micro-interacciones
- 🔄 **Paginación dinámica** sin recarga de página
- 🖼️ **Portadas de juegos** con efectos hover y modal al hacer clic

### Estética del Frontend
Tema **retro-futurista arcade** con:
- Paleta oscura con neones (cyan, magenta, amarillo)
- Tipografía pixel/gaming style
- Efectos glow y scanlines
- Animaciones de entrada tipo "insert coin"
- Grid de cards con hover effects dramáticos
- Overlay de portada con efecto parallax al hacer hover

---

## Portadas de Juegos — RAWG API

Las portadas se obtienen en tiempo real desde la **RAWG Video Games Database API** (gratuita, ilimitada con key gratuita).

### Flujo de carga de portadas

```
Usuario hace hover / click sobre una card
       ↓
covers.js busca en caché local (Map en memoria)
       ↓ (si no está en caché)
Fetch a RAWG: https://api.rawg.io/api/games?search={nombre}&key={API_KEY}
       ↓
Se extrae el campo `background_image` del primer resultado
       ↓
Se guarda en caché y se muestra en la UI
```

### Comportamiento en el Frontend

| Interacción | Comportamiento |
|---|---|
| `hover` sobre una card | Portada como fondo con fade-in + overlay oscuro con efecto neon |
| `click` sobre una card | Modal fullscreen con portada grande + info completa del juego |
| Portada no encontrada | Placeholder con estética retro (pixel art genérico en SVG) |
| Carga de imagen | Skeleton loader animado (shimmer) mientras se obtiene la portada |

### Variables de entorno adicionales
```env
RAWG_API_KEY=tu_api_key_aqui   # Obtener gratis en rawg.io/apidocs
```

> ⚠️ La API key de RAWG es **gratuita**. Registrarse en https://rawg.io/apidocs para obtenerla.

### Nuevo archivo: `public/js/covers.js`
```js
// Módulo encargado de:
// - Gestionar el caché de portadas en memoria (Map)
// - Fetch a RAWG API con el nombre del juego
// - getCover(gameName)    → retorna URL de portada
// - preloadCovers(games[]) → pre-carga en lote al renderizar página
// - Manejo de errores con imagen placeholder SVG inline
```

### Cambios en `public/css/styles.css`
```css
/* Nuevos estilos para: */
/* - .card-cover: fondo con portada + transición suave al hover     */
/* - .card:hover .card-cover: opacity 1, scale(1.05), glow neon     */
/* - .cover-modal: overlay fullscreen con portada en grande         */
/* - .cover-modal.active: visible con animación scale + fade        */
/* - .skeleton-loader: animación shimmer mientras carga la portada  */
```

---

## Variables de Entorno

```env
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
RAWG_API_KEY=tu_api_key_aqui
```

---

## ✅ Tareas Realizadas

### Tarea 1 — Inicialización del proyecto ✅
- Crear `package.json` con dependencias
- Instalar Express, better-sqlite3, cors, dotenv
- Crear estructura de carpetas base
- Configurar `server.js` y `app.js`

### Tarea 2 — Base de datos y modelos ✅
- Configurar SQLite con `better-sqlite3`
- Crear esquema de tablas: `games`, `genres`, `platforms`, `game_platforms`
- Crear modelos con queries reutilizables

### Tarea 3 — Seed de datos reales ✅
- Poblar la DB con 100+ videojuegos reales
- Incluir géneros y plataformas reales
- Relacionar juegos con múltiples plataformas

### Tarea 4 — API: Géneros y Plataformas ✅
- Implementar controladores y rutas para `/api/genre`
- Implementar controladores y rutas para `/api/platform`
- Incluir filtros y paginación (básico)

### Tarea 5 — API: Juegos ✅
- Implementar controladores y rutas para `/api/game`
- Filtros por nombre, género, plataforma, año
- Paginación estilo Rick and Morty API

### Tarea 6 — Middleware y manejo de errores ✅
- Middleware de paginación reutilizable
- Handler global de errores (404, 500)
- Endpoint `/api` con info general

### Tarea 7 — Frontend: Estructura y estilos ✅
- Crear `index.html` base
- Diseñar `styles.css` con estética retro-gaming
- Animaciones CSS y efectos visuales

### Tarea 8 — Frontend: Lógica e interactividad ✅
- `main.js` para consumir la API
- Búsqueda en tiempo real
- Filtros dinámicos por género, plataforma y año
- Paginación sin recarga

### Tarea 9 — Documentación README.md ✅
- Documentar todos los endpoints al estilo de la API de Rick and Morty
- Incluir ejemplos de respuesta JSON
- Sección de filtros, paginación e info general

---

## 📋 Tareas a Realizar

### Tarea 10 — Frontend: Portadas de juegos con RAWG API ✅
- Registrar API key gratuita en rawg.io y agregarla al `.env` (Completado)
- Crear `public/js/covers.js` con: (Completado)
  - Sistema de caché en memoria (`Map`) para evitar requests repetidos
  - Función `getCover(gameName)` que consulta RAWG y retorna URL de portada
  - Función `preloadCovers(games[])` para pre-cargar portadas en lote
  - Imagen placeholder SVG para juegos sin portada disponible
  - Skeleton loader shimmer mientras se obtiene la imagen
- Modificar `public/css/styles.css`: (Completado)
  - Estilos `.card-cover` con transición suave y efecto glow neon en hover
  - Efecto parallax sutil al mover el cursor sobre la card
  - Modal fullscreen `.cover-modal` con portada grande + info del juego
  - Animación de entrada del modal (scale + fade)
  - Skeleton loader animado con efecto shimmer
- Modificar `public/js/main.js`: (Completado)
  - Integrar `covers.js` en el render de cada card
  - Evento `mouseenter` para cargar y mostrar portada al hacer hover
  - Evento `click` para abrir modal con portada + detalle completo del juego
  - Cerrar modal con tecla `Escape`, click fuera del contenido o botón X
- Actualizar `README.md`: (Completado)
  - Documentar integración con RAWG API para portadas
  - Instrucciones para obtener la API key gratuita en rawg.io/apidocs
