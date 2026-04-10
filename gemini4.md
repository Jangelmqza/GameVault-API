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

---

### 1. Footer Hint — Pista visible en la página

Al final del `index.html`, justo antes del cierre del `<footer>`, se incluye un bloque de pista sutil pero visible:

```html
<!-- Footer hint — siempre visible -->
<div class="cheat-hint">
  <span class="hint-icon">⌨️</span>
  <span class="hint-text">
    Presiona <kbd>~</kbd> para abrir la Cheat Console
  </span>
</div>
```

**Estilos del hint:**
- Centrado al fondo de la página, tipografía pequeña y tenue
- La tecla `~` tiene estilo de tecla física (borde, fondo oscuro, sombra)
- Brilla suavemente con un pulso CSS cada 3s para llamar la atención sin molestar
- En móvil se oculta (la consola es solo para teclado)

---

### 2. Cheat Console — Panel Terminal

Un panel flotante estilo **terminal retro** que se desliza desde la parte inferior de la pantalla.

#### Apertura y cierre
| Acción | Resultado |
|---|---|
| Presionar `~` en cualquier momento | Abre la consola con animación slide-up + efecto glitch |
| Click en cualquier área fuera de la consola | Cierra la consola con animación slide-down |
| Presionar `~` de nuevo estando abierta | Cierra la consola |
| Presionar `Escape` | Cierra la consola |

> El cierre por click fuera se implementa con un overlay invisible de fondo completo (`z-index` debajo de la consola) que captura el click y llama a `closeConsole()`. El overlay se agrega al DOM cuando la consola se abre y se elimina cuando se cierra.

#### Layout de la consola

```
┌──────────────────────────────────────────────────────┐
│  🕹️ GAMEVAULT CHEAT CONSOLE v1.0                     │
│ ─────────────────────────────────────────────────── │
│  INPUT ACTUAL:  [ ↑  ↑  ↓  _ ]                      │  ← teclas en tiempo real
│                                                      │
│  CHEATS DISPONIBLES:                                 │
│                                                      │
│  ↑↑↓↓←→←→BA     OVERDRIVE MODE       [activo 15s]  │
│  IDKFA           DOOM PALETTE         [activo 20s]  │
│  NOCLIP          GHOST MODE           [activo 15s]  │
│  GODMODE         CONFETTI RAIN        [activo 8s]   │
│  IDDQD           FLIP SCREEN          [toggle]      │
│  HOWDOI          SHOW CREDITS         [activo 10s]  │
│  MATRIX          MATRIX RAIN          [activo 10s]  │
│                                                      │
│  [click fuera o ESC para cerrar]                    │
└──────────────────────────────────────────────────────┘
```

**Características del input en tiempo real:**
- Cada tecla presionada aparece como un badge animado en la fila `INPUT ACTUAL`
- Las teclas se van acumulando de izquierda a derecha (máx. 10 visibles)
- Cuando se detecta una secuencia válida, todos los badges destellan en verde y se limpian
- Si la secuencia no matchea nada, los badges destellan en rojo y se limpian

---

### 3. Botón Flotante "RESET EFFECTS" — Siempre Visible

Cuando hay un efecto activo, aparece un botón flotante en la esquina superior derecha que permite cancelar todos los efectos activos de inmediato:

```
┌────────────────────┐
│  ✕  RESET EFFECTS  │  ← botón flotante, esquina sup. derecha
└────────────────────┘
```

**Comportamiento:**
- El botón es **invisible** cuando no hay ningún efecto activo
- Aparece con animación `fade-in` en cuanto se activa cualquier efecto
- Desaparece con `fade-out` cuando todos los efectos se desactivan
- Al hacer click: detiene todos los timers, remueve todas las clases de efecto del `body`, destruye canvas activos (Matrix), limpia partículas (confetti), reproduce sonido de "reset"
- Tiene un borde neon parpadeante para que sea imposible de ignorar

---

### 4. Auto-expiración de Efectos

Cada efecto tiene una duración definida. Pasado ese tiempo, se desactiva solo automáticamente:

| Efecto | Duración | Comportamiento al expirar |
|---|---|---|
| OVERDRIVE | 15 segundos | Fade out gradual de colores + pantalla vuelve a normal |
| DOOM PALETTE | 20 segundos | Transición suave de vuelta a la paleta original |
| GHOST MODE | 15 segundos | Cards recuperan opacidad normalmente |
| CONFETTI | 8 segundos | Las partículas caen y desaparecen, no se generan más |
| FLIP SCREEN | Toggle manual | Solo se quita con `IDDQD` de nuevo o con Reset Button |
| CREDITS | 10 segundos | Panel de créditos hace fade-out solo |
| MATRIX | 10 segundos | Canvas hace fade-out y se destruye del DOM |

> Todos los timers se guardan en un `Set` dentro de `EffectsManager` para poder cancelarlos todos con el botón Reset.

---

### 5. Tabla Completa de Easter Eggs

| Combinación / Comando | Tipo | Efecto | Duración |
|---|---|---|---|
| `↑ ↑ ↓ ↓ ← → ← → B A` | Secuencia de teclas | **OVERDRIVE**: colores neón al máximo, scanlines intensas, shake de pantalla, jingle 8-bit, banner animado | 15s |
| `IDKFA` | Texto en consola | **DOOM Palette**: fondo negro puro, textos rojo sangre | 20s |
| `NOCLIP` | Texto en consola | **Ghost Mode**: todas las cards semi-transparentes con shimmer | 15s |
| `GODMODE` | Texto en consola | **Confetti Rain**: lluvia de 🎮🕹️👾⭐ por toda la pantalla | 8s |
| `IDDQD` | Texto en consola | **Flip Screen**: la página se voltea 180° con animación | Toggle |
| `HOWDOI` | Texto en consola | **Credits**: panel "GAME OVER" con stack y créditos del dev | 10s |
| `MATRIX` | Texto en consola | **Matrix Rain**: canvas fullscreen con lluvia de chars verdes | 10s |
| Click × 10 en el logo | Mouse | **Pixel Explosion**: logo explota en partículas y se recompone | Auto |

---

### 6. Sonidos 8-bit con Web Audio API

Los sonidos se generan **100% en el navegador** con osciladores, sin archivos externos:

| Sonido | Cuando suena |
|---|---|
| `powerUp` | Al activar cualquier cheat correctamente |
| `error` | Al escribir una secuencia inválida (badges en rojo) |
| `coin` | Al abrir la Cheat Console |
| `overdrivejingle` | Específico para OVERDRIVE (melodía de 4 notas) |
| `reset` | Al presionar el botón Reset Effects |
| `flip` | Al activar/desactivar FLIP SCREEN |

---

### 7. Arquitectura de `cheats.js`

```js
// cheats.js — tres módulos internos:
//
// CheatEngine
//   - Listener global de keydown
//   - Buffer circular de hasta 10 teclas
//   - Detecta secuencias de flechas (Konami-style)
//   - Detecta texto escrito (IDKFA, NOCLIP, etc.)
//   - Dispara eventos custom: 'cheatActivated', 'cheatInput'
//
// CheatConsole
//   - Crea y gestiona el panel DOM de la terminal
//   - Se suscribe a 'cheatInput' para actualizar badges en tiempo real
//   - Maneja apertura/cierre con overlay invisible
//   - Anima badges en verde (éxito) o rojo (fallo)
//
// EffectsManager
//   - Aplica/remueve clases CSS en body para cada efecto
//   - Genera sonidos con Web Audio API
//   - Gestiona Set de timers activos para auto-expiración
//   - Controla visibilidad del botón flotante Reset Effects
//   - Método público: resetAll() para limpiar todo de golpe
//
// Exporta: init() → llamado desde main.js al cargar la página
```

---

### 8. Cambios en `index.html`

```html
<!-- Al final del <footer>, antes de </footer> -->
<div class="cheat-hint">
  <span>⌨️ Presiona</span> <kbd>~</kbd> <span>para abrir la Cheat Console</span>
</div>

<!-- Justo antes de </body> -->
<div id="cheat-console" class="cheat-console" aria-hidden="true">...</div>
<button id="reset-effects-btn" class="reset-effects-btn" hidden>✕ RESET EFFECTS</button>
<canvas id="matrix-canvas" class="matrix-canvas" hidden></canvas>
<div id="confetti-container" class="confetti-container"></div>
```

---

### 9. Cambios en `styles.css`

```css
/* Hint del footer */
.cheat-hint         — texto centrado tenue con kbd estilizado y pulso suave

/* Cheat Console */
.cheat-console      — panel fijo bottom-0, fuera de pantalla por defecto (translateY 100%)
.cheat-console.open — translateY(0), transición 300ms ease + glitch keyframe al abrir
.console-overlay    — div fullscreen invisible, z-index debajo de consola, captura clicks

/* Badges de input */
.key-badge          — badge individual por tecla, animación de aparición
.key-badge.success  — verde + glow, animación flash
.key-badge.error    — rojo + shake, animación flash

/* Botón Reset */
.reset-effects-btn  — posición fija top-right, borde neon parpadeante, fade-in/out

/* Efectos de body */
body.overdrive      — filtros hue-rotate + saturate al máximo + animación shake
body.dark-doom      — variables CSS a rojo/negro, sin transición abrupta
body.noclip         — .game-card { opacity: 0.25; filter: blur(1px) }
body.flipped        — #app { transform: rotate(180deg); transition: 0.5s }

/* Canvas y partículas */
.matrix-canvas      — position fixed, fullscreen, pointer-events none, z-index alto
.confetti-piece     — position absolute, animación keyframe caída con rotación aleatoria
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
- Agregar **footer hint** en `index.html` (Completado)
- Crear `public/js/cheats.js` con módulos avanzados y badges (Completado)
- Implementar **botón flotante "✕ RESET EFFECTS"** con lógica de visibilidad (Completado)
- Implementar los 8 Easter Eggs con auto-expiración y animaciones (Completado)
- Implementar 6 sonidos 8-bit con Web Audio API (Completado)
- Agregar todos los estilos CSS avanzados (Completado)
- Inicializar `cheats.init()` en `main.js` (Completado)
- Actualizar `README.md` con la tabla de comandos y duraciones (Completado)

---

## ✅ PROYECTO FINALIZADO 100%
¡GameVault Pro con Cheat Console Avanzada está lista!

