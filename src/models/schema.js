const db = require('../config/database');

const createTables = () => {
    const schema = `
        CREATE TABLE IF NOT EXISTS genres (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS platforms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            short_name TEXT,
            manufacturer TEXT
        );

        CREATE TABLE IF NOT EXISTS games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            year INTEGER,
            developer TEXT,
            rating REAL,
            genre_id INTEGER,
            FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE SET NULL
        );

        CREATE TABLE IF NOT EXISTS game_platforms (
            game_id INTEGER,
            platform_id INTEGER,
            PRIMARY KEY (game_id, platform_id),
            FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
            FOREIGN KEY (platform_id) REFERENCES platforms (id) ON DELETE CASCADE
        );
    `;

    db.exec(schema);
    console.log("✅ Tablas creadas correctamente.");
};

module.exports = { createTables };
