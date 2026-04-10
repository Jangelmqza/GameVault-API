const db = require('../config/database');

const Genre = {
    getAll: () => {
        const sql = `
            SELECT g.*, (SELECT COUNT(*) FROM games WHERE genre_id = g.id) as game_count
            FROM genres g
        `;
        return db.prepare(sql).all();
    },
    getById: (id) => {
        return db.prepare('SELECT * FROM genres WHERE id = ?').get(id);
    }
};

module.exports = Genre;
