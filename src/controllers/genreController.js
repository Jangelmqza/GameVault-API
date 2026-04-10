const Genre = require('../models/Genre');
const db = require('../config/database');

const genreController = {
    getAllGenres: (req, res) => {
        try {
            const genres = Genre.getAll();
            
            // Estructura estilo Rick and Morty API
            res.json({
                info: {
                    count: genres.length,
                    pages: 1, // Los géneros son pocos, no suelen requerir paginación real aún
                    next: null,
                    prev: null
                },
                results: genres
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getGenreById: (req, res) => {
        try {
            const genre = Genre.getById(req.params.id);
            if (!genre) return res.status(404).json({ error: 'Género no encontrado' });
            res.json(genre);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getGamesByGenre: (req, res) => {
        try {
            const sql = `
                SELECT g.*, ge.name as genre_name, GROUP_CONCAT(p.name) as platforms
                FROM games g
                JOIN genres ge ON g.genre_id = ge.id
                LEFT JOIN game_platforms gp ON g.id = gp.game_id
                LEFT JOIN platforms p ON gp.platform_id = p.id
                WHERE ge.id = ?
                GROUP BY g.id
            `;
            const games = db.prepare(sql).all(req.params.id);
            res.json({
                results: games
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = genreController;
