const db = require('../config/database');
const { paginate } = require('../middleware/pagination');

const gameController = {
    getAllGames: (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = 20;
            const offset = (page - 1) * limit;

            const { name, genre, platform, year } = req.query;
            let conditions = [];
            let params = [];

            if (name) {
                conditions.push("g.name LIKE ?");
                params.push(`%${name}%`);
            }
            if (genre) {
                conditions.push("ge.name LIKE ?");
                params.push(`%${genre}%`);
            }
            if (platform) {
                conditions.push("p.short_name LIKE ? OR p.name LIKE ?");
                params.push(`%${platform}%`, `%${platform}%`);
            }
            if (year) {
                conditions.push("g.year = ?");
                params.push(year);
            }

            const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

            // Contar total para paginación (con filtros)
            const countSql = `
                SELECT COUNT(DISTINCT g.id) as total 
                FROM games g
                LEFT JOIN genres ge ON g.genre_id = ge.id
                LEFT JOIN game_platforms gp ON g.id = gp.game_id
                LEFT JOIN platforms p ON gp.platform_id = p.id
                ${whereClause}
            `;
            const totalItems = db.prepare(countSql).get(...params).total;

            // Obtener resultados paginados
            const dataSql = `
                SELECT g.*, ge.name as genre_name, GROUP_CONCAT(p.short_name) as platforms
                FROM games g
                LEFT JOIN genres ge ON g.genre_id = ge.id
                LEFT JOIN game_platforms gp ON g.id = gp.game_id
                LEFT JOIN platforms p ON gp.platform_id = p.id
                ${whereClause}
                GROUP BY g.id
                LIMIT ? OFFSET ?
            `;
            const games = db.prepare(dataSql).all(...params, limit, offset);

            // Formatear resultados (convertir platforms string a array)
            const results = games.map(game => ({
                ...game,
                platforms: game.platforms ? game.platforms.split(',') : []
            }));

            res.json({
                info: paginate(req, totalItems, page, limit),
                results: results
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getGameById: (req, res) => {
        try {
            const sql = `
                SELECT g.*, ge.name as genre_name, GROUP_CONCAT(p.short_name) as platforms
                FROM games g
                LEFT JOIN genres ge ON g.genre_id = ge.id
                LEFT JOIN game_platforms gp ON g.id = gp.game_id
                LEFT JOIN platforms p ON gp.platform_id = p.id
                WHERE g.id = ?
                GROUP BY g.id
            `;
            const game = db.prepare(sql).get(req.params.id);
            
            if (!game) return res.status(404).json({ error: 'Juego no encontrado' });

            res.json({
                ...game,
                platforms: game.platforms ? game.platforms.split(',') : []
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = gameController;
