const db = require('../db');

exports.getAllPlaces = (req, res) => {
  db.query('SELECT * FROM place', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los lugares' });
    res.json(results);
  });
};

exports.createPlace = (req, res) => {
  const { name, location } = req.body;
  db.query('INSERT INTO place (name, location) VALUES (?, ?)', [name, location], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear el lugar' });
    res.status(201).json({ mensaje: 'Lugar creado', id: result.insertId });
  });
};
