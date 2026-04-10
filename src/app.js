require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api', routes);

// Ruta de información general
app.get('/api-info', (req, res) => {
    res.json({
        name: "GameVault API",
        version: "1.0.0",
        description: "API de videojuegos estilo Rick and Morty",
        endpoints: {
            games: "/api/game",
            genres: "/api/genre",
            platforms: "/api/platform"
        }
    });
});

// Manejo de rutas no encontradas (404)
app.use(notFoundHandler);

// Manejador de errores global
app.use(errorHandler);

module.exports = app;
