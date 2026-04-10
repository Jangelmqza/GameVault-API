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
| Sonidos 8-bit | Web Audio API (nativo del navegador) |
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
│   │   └── styles.css           # Estilos dinámicos + portadas + cheat console
│   └── js/
│       ├── main.js              # Lógica del frontend
│       ├── covers.js            # Módulo de portadas (RAWG API)
│       └── cheats.js            # Easter eggs, Konami Code y Cheat Console
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
- 🕹️ **Easter Eggs y Cheat Console** con combinaciones de teclas secretas

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

---

## Easter Eggs & Cheat Console

Todo el sistema de cheats vive en `public/js/cheats.js` y se apoya en la **Web Audio API** nativa del navegador para los sonidos 8-bit (sin dependencias externas).

### Cheat Console — Panel de Comandos

Un panel flotante estilo **terminal retro** (inspirado en las consolas de debug de los videojuegos clásicos) que el usuario puede abrir/cerrar en cualquier momento. Muestra en tiempo real qué teclas está presionando y qué combinaciones están disponibles.

```
┌─────────────────────────────────────────┐
│  > GAMEVAULT CHEAT CONSOLE v1.0         │
│  ─────────────────────────────────────  │
│  INPUT: ↑ ↑ ↓ ↓ ← → ← → _ _           │ ← teclas en tiempo real
│                                         │
│  COMANDOS DISPONIBLES:                  │
│  ↑↑↓↓←→←→BA   — MODO OVERDRIVE         │
│  IDKFA         — Modo oscuro extremo    │
│  NOCLIP        — Modo transparente      │
│  GODMODE       — Lluvia de confetti     │
│  IDDQD         — Voltear la pantalla    │
│  HOWDOI        — Mostrar créditos       │
│                                         │
│  [ESC o ~ para cerrar]                  │
└─────────────────────────────────────────┘
```

**Cómo abrir la Cheat Console:**
- Presionar la tecla `` ` `` (tilde/backtick) o `~`
- El panel aparece con animación de "glitch" desde abajo

### Tabla Completa de Easter Eggs

| Combinación / Comando | Tipo | Efecto |
|---|---|---|
| `↑ ↑ ↓ ↓ ← → ← → B A` | Secuencia de teclas | **MODO OVERDRIVE**: colores neón al máximo, scanlines intensas, música 8-bit, shake de pantalla, banner "OVERDRIVE ACTIVATED" |
| `IDKFA` | Texto en consola | **Modo Oscuro Extremo**: fondo negro puro, textos en rojo sangre, paleta doom |
| `NOCLIP` | Texto en consola | **Modo Fantasma**: todas las cards se vuelven semi-transparentes con efecto ghosting |
| `GODMODE` | Texto en consola | **God Mode**: lluvia de emojis/confetti de videojuegos (🎮🕹️👾⭐) por toda la pantalla |
| `IDDQD` | Texto en consola | **Flip**: la pantalla se voltea 180° con animación CSS, permanece así hasta repetirlo |
| `HOWDOI` | Texto en consola | **Créditos**: panel de créditos estilo "Game Over" con el nombre del dev y el stack |
| `MATRIX` | Texto en consola | **Matrix Rain**: lluvia de caracteres verdes en el fondo por 10 segundos |
| Click × 10 en el logo | Mouse | **Secret**: el logo explota en partículas pixeladas y se recompone |

### Sonidos 8-bit con Web Audio API

Los sonidos se generan **100% en el navegador** usando osciladores de la Web Audio API, sin archivos de audio externos:

```js
// Ejemplos de sonidos generados por síntesis:
// - "power up": frecuencia ascendente rápida (do → sol → do alto)
// - "error / buzzer": onda cuadrada baja, 200ms
// - "coin": dos pulsos cortos agudos
// - "overdrive jingle": melodía de 4 notas en onda cuadrada
// - "flip": sweep descendente
```

### Arquitectura de `cheats.js`

```js
// cheats.js — responsabilidades:
//
// CheatEngine         → escucha keydown, mantiene buffer de teclas,
//                       detecta secuencias y dispara efectos
//
// CheatConsole        → panel UI de la terminal, muestra input en
//                       tiempo real y lista de comandos
//
// EffectsManager      → aplica/remueve clases CSS de efectos,
//                       genera sonidos con Web Audio API,
//                       maneja timers para efectos temporales
//
// Exporta: init()     → llamado desde main.js al cargar la página
```

### Cambios en `styles.css` para los cheats

```css
/* Nuevas clases para efectos: */
/* body.overdrive       — filtros CSS locos, animación shake      */
/* body.dark-doom       — paleta roja/negra estilo DOOM            */
/* body.noclip          — todas las cards con opacity: 0.3         */
/* body.flipped         — transform: rotate(180deg) en #app        */
/* .cheat-console       — panel terminal flotante esquina inferior */
/* .cheat-console.open  — visible con animación slide-up + glitch  */
/* .matrix-canvas       — canvas fullscreen para lluvia matrix      */
/* .confetti-piece      — partículas animadas con keyframes         */
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
- Crear `public/js/covers.js` con sistema de caché y funciones de obtención/precarga (Completado)
- Modificar `public/css/styles.css` con estilos de portada, modal y skeleton loader (Completado)
- Modificar `public/js/main.js` para integrar las portadas y el modal (Completado)
- Actualizar `README.md` con la documentación de la RAWG API (Completado)

---

### Tarea 11 — Frontend: Easter Eggs & Cheat Console ✅
- Crear `public/js/cheats.js` con los módulos `CheatEngine`, `CheatConsole` y `EffectsManager` (Completado)
- Implementar los 8 Easter Eggs y la lógica de detección de secuencias (Completado)
- Implementar sonidos 8-bit con Web Audio API (Completado)
- Agregar estilos CSS para la consola, banners y efectos visuales (Completado)
- Integrar e inicializar `Cheats.init()` en el frontend (Completado)
- Documentar los Easter Eggs en el `README.md` (Completado)

---

## ✅ PROYECTO FINALIZADO 100%
¡GameVault API con Portadas RAWG y Cheat Console está lista para el despliegue!

