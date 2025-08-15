import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="nav-bar d-flex justify-content-between align-items-center px-4 py-2">
  <Link className="nav-brand" to="/">🏅 Automatización</Link>

  <div className="nav-links d-flex gap-4 flex-wrap align-items-center">
    <Link to="/map">🗺️ Mapa</Link>
    <Link to="/activities">📋 Actividades</Link>
    <Link to="/my-tournaments">🎯 Mis Torneos</Link>
    <Link to="/athletes">🏃‍♂️ Atletas</Link>

    {token ? (
      <>
        <Link to="/profile">📩 Mis Invitaciones</Link>
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
      </>
    ) : (
      <>
        <Link to="/register">📝 Registro</Link>
        <Link to="/login">🔐 Iniciar sesión</Link>
      </>
    )}
  </div>
</nav>

  );
}

export default Navbar;
