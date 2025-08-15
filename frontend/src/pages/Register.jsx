import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    sport: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/athletes/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert('Registro exitoso');
        navigate('/login');
      } else {
        const data = await res.json();
        alert(`Error: ${data.mensaje || 'No se pudo registrar'}`);
      }
    } catch (err) {
      alert('Error en el servidor');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>🏃 Registro de Atleta</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Nombre completo" onChange={handleChange} required className="form-control mb-3" />
          <input name="age" type="number" placeholder="Edad" onChange={handleChange} required className="form-control mb-3" />
          <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required className="form-control mb-3" />
          <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required className="form-control mb-3" />
          <input name="sport" placeholder="Deporte favorito" onChange={handleChange} required className="form-control mb-4" />
          <button type="submit" className="register-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
