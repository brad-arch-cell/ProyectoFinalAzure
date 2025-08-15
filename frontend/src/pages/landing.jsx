import React from 'react';
import './Landing.css'; // Estilo externo para mantener limpio
import { Container } from 'react-bootstrap';

function Landing() {
  return (
    <div className="landing-hero">
      <div className="overlay">
        <Container className="text-center text-white d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-3 fw-bold mb-3">🌟 Automatización Deportiva 🌟</h1>
          <p className="lead fs-4 mb-4">
            Visibilizando el talento desde las calles hasta el resto del mundo
          </p>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <a href="/map" className="btn btn-lg btn-explore">🗺️ Explorar Mapa</a>
            <a href="/login" className="btn btn-lg btn-login">🔐 Iniciar Sesión</a>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Landing;
