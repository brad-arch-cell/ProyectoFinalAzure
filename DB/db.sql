-- Crear base de datos (por si no existe)
CREATE DATABASE IF NOT EXISTS myapp_db;
USE myapp_db;

-- Tabla: athlete
CREATE TABLE IF NOT EXISTS athlete (
  id_a INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  sport VARCHAR(100) NOT NULL
);

-- Tabla: place
CREATE TABLE IF NOT EXISTS place (
  id_p INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(255)
);

-- Tabla: activity
CREATE TABLE IF NOT EXISTS activity (
  id_ac INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  date DATE,
  id_p INT,
  FOREIGN KEY (id_p) REFERENCES place(id_p)
);

-- Tabla: report
CREATE TABLE IF NOT EXISTS report (
  id_r INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT NOT NULL,
  date DATE,
  id_p INT,
  FOREIGN KEY (id_p) REFERENCES place(id_p)
);

-- Tabla: invitation (intermedia entre athlete y activity)
CREATE TABLE IF NOT EXISTS invitation (
  id_i INT AUTO_INCREMENT PRIMARY KEY,
  id_a INT,
  id_ac INT,
  status ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
  FOREIGN KEY (id_a) REFERENCES athlete(id_a),
  FOREIGN KEY (id_ac) REFERENCES activity(id_ac)
);

INSERT INTO place (name, location) VALUES
('Parque Cristal', '9.954717,-84.120732'),
('Parque Los Leones', '9.945438,-84.121400'),
('Parque Llama del Bosque', '9.944599,-84.119954'),
('Parque del Café', '9.941165,-84.116052'),
('Parque Iberia', '9.939318,-84.116492');

ALTER TABLE activity MODIFY date DATETIME;
SELECT * FROM activity WHERE id_p = 25;
ALTER TABLE activity ADD COLUMN creator_email VARCHAR(100);
