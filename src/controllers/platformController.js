const Platform = require('../models/Platform');
const db = require('../config/database');

const platformController = {
    getAllPlatforms: (req, res) => {
        try {
            const platforms = Platform.getAll();
            res.json({
                info: {
                    count: platforms.length,
                    pages: 1,
                    next: null,
                    prev: null
                },
                results: platforms
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getPlatformById: (req, res) => {
        try {
            const platform = Platform.getById(req.params.id);
            if (!platform) return res.status(404).json({ error: 'Plataforma no encontrada' });
            res.json(platform);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getGamesByPlatform: (req, res) => {
        try {
            const sql = `
                SELECT g.*, ge.name as genre_name, GROUP_CONCAT(p.name) as platforms
                FROM games g
                JOIN genres ge ON g.genre_id = ge.id
                JOIN game_platforms gp ON g.id = gp.game_id
                JOIN platforms p ON gp.platform_id = p.id
                WHERE p.id = ?
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

module.exports = platformController;
