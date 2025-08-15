import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Activities.css';


const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-CR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
};
function Activities() {
  const [activities, setActivities] = useState([]);
  const [places, setPlaces] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const placeId = queryParams.get('place');

useEffect(() => {
  const fetchData = async () => {
    try {
      const resPlaces = await fetch('http://localhost:3000/api/places');
      const placesData = await resPlaces.json();
      const placeMap = {};
      placesData.forEach(p => {
        placeMap[p.id_p.toString()] = p.name;
      });
      setPlaces(placeMap);
      
      // Usar el parámetro si existe
      const url = placeId
        ? `http://localhost:3000/api/activities?place=${placeId}`
        : 'http://localhost:3000/api/activities';

      const resActs = await fetch(url);
      const data = await resActs.json();
      setActivities(data);
    } catch (err) {
      console.error('Error cargando actividades:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [placeId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Actividades Comunitarias</h2>
      {activities.length === 0 ? (
        <p className="text-center">No hay actividades registradas.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {activities.map(act =>(
            <Col key={act.id_ac}>
              <Card className="h-100 shadow-sm hover-scale">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{act.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
  {places[act.id_p?.toString()] || 'Parque desconocido'}
</Card.Subtitle>
                  <Card.Text>{act.description}</Card.Text>
                  <Card.Text>
  <strong>Fecha:</strong> {formatDate(act.date)}
</Card.Text>
                </Card.Body>
              </Card>
            </Col>
))}
        </Row>
      )}
      <div className="d-flex justify-content-end mb-3">
      <Link
  to="/create-activity"
  className="btn btn-primary rounded-circle"
  style={{
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '56px',
    height: '56px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }}
>
  +
</Link>
</div>
    </Container>
    
  );
}

export default Activities;
