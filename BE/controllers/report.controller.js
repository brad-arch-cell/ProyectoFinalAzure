const db = require('../db');

exports.getAllReports = (req, res) => {
  db.query('SELECT * FROM report', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener reportes' });
    res.json(results);
  });
};

exports.createReport = (req, res) => {
  const { description, date, id_p } = req.body;
  const sql = 'INSERT INTO report (description, date, id_p) VALUES (?, ?, ?)';
  db.query(sql, [description, date, id_p], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear reporte' });
    res.status(201).json({ mensaje: 'Reporte creado', id: result.insertId });
  });
};
