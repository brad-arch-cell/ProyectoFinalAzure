import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function CreateActivity() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [creator_email, setCreator_email] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/places');
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error('Error al cargar parques:', err);
      }
    };
    fetchPlaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !date || !placeId ) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:3000/api/activities', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify({
    name,
    description,
    date,
    id_p: placeId
  }),
});


      if (!res.ok) throw new Error();

      setSuccess(true);
      setTimeout(() => {
        navigate('/activities');
      }, 1500);
    } catch (err) {
      setError('No se pudo crear la actividad.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Crear Nueva Actividad</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Actividad creada correctamente ✅</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la actividad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej. Torneo relámpago"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Breve detalle de la actividad"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
  type="datetime-local"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  required
/>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Parque</Form.Label>
          <Form.Select
  value={placeId}
  onChange={(e) => setPlaceId(e.target.value)}
  required
>
  <option value="">Seleccione un parque</option>
  {places.map((p) => (
    <option key={p.id_p} value={p.id_p}>
      {p.name}
    </option>
  ))}
</Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Crear Actividad
        </Button>
      </Form>
    </Container>
  );
}

export default CreateActivity;
