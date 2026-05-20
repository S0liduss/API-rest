// Conexión a SQLite y creación de la tabla si no existe
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'clientes.db'));

// Crear tabla al iniciar
db.exec(`
  CREATE TABLE IF NOT EXISTS cliente (
    id_cliente  INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre      TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    telefono    TEXT,
    created_at  DATETIME DEFAULT (datetime('now'))
  )
`);

module.exports = db;