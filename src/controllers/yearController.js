const db = require('../config/database');

const yearController = {
    getYears: (req, res) => {
        try {
            const sql = `SELECT DISTINCT year FROM games ORDER BY year DESC`;
            const years = db.prepare(sql).all();
            res.json({
                results: years.map(y => y.year)
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = yearController;
