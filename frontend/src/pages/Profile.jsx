import React, { useEffect, useState } from 'react';

function Profile() {
  const [invitations, setInvitations] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/invitations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setInvitations(data);
        } else {
          alert('Error al cargar invitaciones');
        }
      } catch (err) {
        console.error(err);
        alert('Error al conectar con el servidor');
      }
    };

    fetchInvitations();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="container mt-4">
      <h2>Mi Perfil</h2>
      <button onClick={handleLogout} className="btn btn-danger mb-4">Cerrar sesión</button>

      <h4>Mis Invitaciones</h4>
      <ul className="list-group">
        {invitations.length > 0 ? (
          invitations.map((inv) => (
            <li key={inv.id_i} className="list-group-item">
              Actividad #{inv.id_ac} - Estado: <strong>{inv.status}</strong>
            </li>
          ))
        ) : (
          <li className="list-group-item">No tienes invitaciones aún.</li>
        )}
      </ul>
    </div>
  );
}

export default Profile;
