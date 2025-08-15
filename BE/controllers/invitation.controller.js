const db = require('../db');

exports.getUserInvitations = (req, res) => {
  const id_a = req.id_a;
  db.query('SELECT * FROM invitation WHERE id_a = ?', [id_a], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener invitaciones' });
    res.json(results);
  });
};

exports.createInvitation = (req, res) => {
  const { id_a, id_ac, status } = req.body;
  const sql = 'INSERT INTO invitation (id_a, id_ac, status) VALUES (?, ?, ?)';
  db.query(sql, [id_a, id_ac, status], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear invitación' });
    res.status(201).json({ mensaje: 'Invitación creada', id: result.insertId });
  });
};
