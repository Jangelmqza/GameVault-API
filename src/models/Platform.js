const db = require('../config/database');

const Platform = {
    getAll: () => {
        const sql = `
            SELECT p.*, (SELECT COUNT(*) FROM game_platforms WHERE platform_id = p.id) as game_count
            FROM platforms p
        `;
        return db.prepare(sql).all();
    },
    getById: (id) => {
        return db.prepare('SELECT * FROM platforms WHERE id = ?').get(id);
    }
};

module.exports = Platform;
