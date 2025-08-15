const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'mysql_db',
  port: 3306,
  user: 'root',
  password: 'TuPass123',
  database: 'myapp_db'
});

conexion.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = conexion;
