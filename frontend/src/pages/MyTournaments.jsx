import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('es-CR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
};

function MyTournaments() {
  const dummyActivities = [
    {
      id_ac: 1,
      name: 'ASDAS',
      description: 'asASas',
      date: new Date().toISOString(),
      id_p: 1,
      placeName: 'Plaza de Deportes Villa Esperanza'
    },
    {
      id_ac: 2,
      name: 'asdf',
      description: 'asdsda',
      date: new Date(Date.now() + 86400000).toISOString(),
      id_p: 2,
      placeName: 'Plaza de Deportes Villa Esperanza'
    },
    {
      id_ac: 3,
      name: 'dfgd',
      description: 'dfgd',
      date: new Date(Date.now() + 172800000).toISOString(),
      id_p: 3,
      placeName: 'Skatepark Llanos del Sol'
    },
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Mis Torneos Creados</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {dummyActivities.map(act => (
          <Col key={act.id_ac}>
            <Card className="h-100 shadow-sm hover-scale border-0" style={{ backgroundColor: '#fdf0d5' }}>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold text-danger">{act.name} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                   {act.placeName}
                </Card.Subtitle>
                <Card.Text> {act.description}</Card.Text>
                <Card.Text> <strong>Fecha:</strong> {formatDate(act.date)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyTournaments;
