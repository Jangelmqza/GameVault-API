# 🎮 GameVault API

GameVault es una API RESTful inspirada en la arquitectura de la API de Rick and Morty, diseñada para entusiastas de los videojuegos que buscan datos estructurados sobre títulos clásicos y modernos.

![Status](https://img.shields.io/badge/Status-Beta-cyan)
![Node](https://img.shields.io/badge/Node-20.0+-green)
![DB](https://img.shields.io/badge/Database-SQLite-blue)

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

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Poblar la base de datos (Seed):
   ```bash
   node src/seed/seedData.js
   ```
4. Iniciar el servidor:
   ```bash
   npm start
   ```
5. Abrir `http://localhost:3000` en el navegador.

---

## 📦 Stack Tecnológico
- **Backend:** Node.js, Express.js
- **Base de Datos:** SQLite (`better-sqlite3`)
- **Frontend:** Vanilla JS, CSS3 (Custom Variables & Animations)
- **Documentación:** Estilo Rick and Morty API

---
*Desarrollado con ❤️ para la comunidad gaming.*
