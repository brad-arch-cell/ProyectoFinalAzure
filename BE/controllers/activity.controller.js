const db = require('../db');

// Obtener todas las actividades o filtradas por parque
exports.getAll = (req, res) => {
  const { place } = req.query;

  if (place) {
    db.query('SELECT * FROM activity WHERE id_p = ?', [place], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener actividades filtradas' });
      }
      return res.json(results);
    });
  } else {
    db.query('SELECT * FROM activity', (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener actividades' });
      }
      return res.json(results);
    });
  }
};

// Crear una actividad (requiere token con email)
exports.create = (req, res) => {
  const { name, description, date, id_p } = req.body;
  const creator_email = req.user?.email;

  if (!creator_email) {
    return res.status(401).json({ error: 'Token inválido o sin email' });
  }

  const sql = 'INSERT INTO activity (name, description, date, id_p, creator_email) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, description, date, id_p, creator_email], (err, result) => {
    if (err) {
      console.error('Error al crear actividad:', err);
      return res.status(500).json({ error: 'Error al crear actividad' });
    }
    res.status(201).json({ message: 'Actividad creada', id: result.insertId });
  });
};

// Obtener solo las actividades del usuario autenticado
exports.getMine = (req, res) => {
  const email = req.user?.email;

  if (!email) {
    return res.status(401).json({ error: 'Token inválido o sin email' });
  }

  const sql = 'SELECT * FROM activity WHERE creator_email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error al obtener actividades del usuario:', err);
      return res.status(500).json({ error: 'Error al obtener actividades personales' });
    }
    res.json(results);
  });
};
