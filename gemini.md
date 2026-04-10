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
│   │   └── styles.css           # Estilos dinámicos
│   └── js/
│       └── main.js              # Lógica del frontend
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

### Estética del Frontend
Tema **retro-futurista arcade** con:
- Paleta oscura con neones (cyan, magenta, amarillo)
- Tipografía pixel/gaming style
- Efectos glow y scanlines
- Animaciones de entrada tipo "insert coin"
- Grid de cards con hover effects dramáticos

---

## Variables de Entorno

```env
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
```

---

## ✅ Tareas Realizadas

### Tarea 1 — Inicialización del proyecto
- Crear `package.json` con dependencias (Completado)
- Instalar Express, better-sqlite3, cors, dotenv (Completado)
- Crear estructura de carpetas base (Completado)
- Configurar `server.js` y `app.js` (Completado)

### Tarea 2 — Base de datos y modelos
- Configurar SQLite con `better-sqlite3` (Completado)
- Crear esquema de tablas: `games`, `genres`, `platforms`, `game_platforms` (Completado)
- Crear modelos con queries reutilizables (Completado)

### Tarea 3 — Seed de datos reales
- Poblar la DB con 100+ videojuegos reales (Completado)
- Incluir géneros y plataformas reales (Completado)
- Relacionar juegos con múltiples plataformas (Completado)

### Tarea 4 — API: Géneros y Plataformas
- Implementar controladores y rutas para `/api/genre` (Completado)
- Implementar controladores y rutas para `/api/platform` (Completado)
- Incluir filtros y paginación (Básico) (Completado)

### Tarea 5 — API: Juegos
- Implementar controladores y rutas para `/api/game` (Completado)
- Filtros por nombre, género, plataforma, año (Completado)
- Paginación estilo Rick and Morty API (Completado)

### Tarea 6 — Middleware y manejo de errores
- Middleware de paginación reutilizable (Completado)
- Handler global de errores (404, 500) (Completado)
- Endpoint `/api` con info general (Completado en app.js)

### Tarea 7 — Frontend: Estructura y estilos
- Crear `index.html` base (Completado)
- Diseñar `styles.css` con estética retro-gaming (Completado)
- Animaciones CSS y efectos visuales (Completado)

### Tarea 8 — Frontend: Lógica e interactividad
- `main.js` para consumir la API (Completado)
- Búsqueda en tiempo real (Completado)
- Filtros dinámicos por género, plataforma y año (Completado)
- Paginación sin recarga (Completado)

### Tarea 9 — Documentación README.md
- Documentar todos los endpoints al estilo de la API de Rick and Morty (Completado)
- Incluir ejemplos de respuesta JSON (Completado)
- Sección de filtros, paginación e info general (Completado)

---

## ✅ PROYECTO FINALIZADO 100%
¡GameVault API está lista para el despliegue!

