const express = require('express');
const router  = express.Router();
const db      = require('../database');

// ─── GET /clientes ── Listar todos ──────────────────────────────
router.get('/', (req, res) => {
  try {
    const clientes = db.prepare('SELECT * FROM cliente').all();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// ─── GET /clientes/:id ── Obtener uno ───────────────────────────
router.get('/:id', (req, res) => {
  try {
    const cliente = db
      .prepare('SELECT * FROM cliente WHERE id_cliente = ?')
      .get(req.params.id);

    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar cliente' });
  }
});

// ─── POST /clientes ── Crear ─────────────────────────────────────
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;

  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({ error: 'nombre y email son obligatorios' });
  }

  try {
    const result = db
      .prepare('INSERT INTO cliente (nombre, email, telefono) VALUES (?, ?, ?)')
      .run(nombre, email, telefono || null);

    res.status(201).json({
      message: 'Cliente creado',
      id_cliente: result.lastInsertRowid
    });
  } catch (err) {
    // Email duplicado → SQLite lanza UNIQUE constraint
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

// ─── PUT /clientes/:id ── Actualizar ─────────────────────────────
router.put('/:id', (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'nombre y email son obligatorios' });
  }

  try {
    const result = db
      .prepare(`
        UPDATE cliente
        SET nombre = ?, email = ?, telefono = ?
        WHERE id_cliente = ?
      `)
      .run(nombre, email, telefono || null, req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json({ message: 'Cliente actualizado' });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint')) {
      return res.status(409).json({ error: 'El email ya está en uso' });
    }
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// ─── DELETE /clientes/:id ── Eliminar ────────────────────────────
router.delete('/:id', (req, res) => {
  try {
    const result = db
      .prepare('DELETE FROM cliente WHERE id_cliente = ?')
      .run(req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ error: 'Cliente no encontrado' });

    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

module.exports = router;