const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { name, age, email, password, sport } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10); // 🔐 importante

  const sql = 'INSERT INTO athlete (name, age, email, password, sport) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, age, email, hashedPassword, sport], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al registrar atleta' });
    res.status(201).json({ mensaje: 'Registro exitoso', id: result.insertId });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM athlete WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Email no encontrado' });

    const athlete = results[0];
    const passwordValid = bcrypt.compareSync(password, athlete.password);
    if (!passwordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id_a: athlete.id_a }, 'secreto123', { expiresIn: '1h' });
    res.json({ mensaje: 'Login exitoso', token });
  });
};

//  Obtener todos los atletas
exports.getAll = (req, res) => {
  db.query('SELECT id_a, name, age, email, sport FROM athlete', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener atletas' });
    res.json(results);
  });
};
