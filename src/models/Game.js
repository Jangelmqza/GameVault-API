const db = require('../config/database');

const Game = {
    getAll: (params = {}) => {
        let sql = `
            SELECT g.*, ge.name as genre_name, GROUP_CONCAT(p.name) as platforms
            FROM games g
            LEFT JOIN genres ge ON g.genre_id = ge.id
            LEFT JOIN game_platforms gp ON g.id = gp.game_id
            LEFT JOIN platforms p ON gp.platform_id = p.id
            GROUP BY g.id
        `;
        // Los filtros se implementarán en el controlador
        return db.prepare(sql).all();
    },
    getById: (id) => {
        const sql = `
            SELECT g.*, ge.name as genre_name, GROUP_CONCAT(p.name) as platforms
            FROM games g
            LEFT JOIN genres ge ON g.genre_id = ge.id
            LEFT JOIN game_platforms gp ON g.id = gp.game_id
            LEFT JOIN platforms p ON gp.platform_id = p.id
            WHERE g.id = ?
            GROUP BY g.id
        `;
        return db.prepare(sql).get(id);
    }
};

module.exports = Game;
