import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';

function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/athletes');
        if (!res.ok) throw new Error('Error al obtener atletas');
        const data = await res.json();
        setAthletes(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los atletas.');
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Atletas Registrados</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {athletes.length === 0 ? (
        <p className="text-center">No hay atletas registrados.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {athletes.map((ath) => (
            <Col key={ath.id_a}>
              <Card className="h-100 shadow-sm hover-scale">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{ath.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{ath.sport}</Card.Subtitle>
                  <Card.Text><strong>Edad:</strong> {ath.age}</Card.Text>
                  <Card.Text><strong>Email:</strong> {ath.email}</Card.Text>

                  <Button
                    variant="primary"
                    onClick={() => alert(`Invitación enviada a ${ath.name} (simulado)`)}
                  >
                    Invitar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Athletes;
