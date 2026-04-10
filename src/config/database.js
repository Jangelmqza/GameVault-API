const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbPath = path.resolve(process.env.DB_PATH || './database.sqlite');
const db = new Database(dbPath, { verbose: console.log });

// Habilitar claves foráneas
db.pragma('foreign_keys = ON');

module.exports = db;
