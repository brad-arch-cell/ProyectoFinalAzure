import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import L from 'leaflet';
import './MapPage.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const pavasCenter = [9.9425, -84.1336];
const zoomLevel = 16;
const bounds = [
  [9.935, -84.145],
  [9.955, -84.120],
];

function FlyToPavasOnce({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

function MapPage() {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/places');
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        console.error('Error al cargar lugares:', err);
      }
    };
    fetchPlaces();
  }, []);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setDescription('');
    setSubmitted(false);
    setShowPanel(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          place_id: selectedPlace.id_p,
          date: new Date().toISOString().split('T')[0],
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch (err) {
      alert('Error al enviar el reporte.');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={pavasCenter}
        zoom={zoomLevel}
        style={{ height: '100%', width: '100%' }}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        maxZoom={18}
        minZoom={14}
        scrollWheelZoom
      >
        <FlyToPavasOnce center={pavasCenter} zoom={zoomLevel} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {places.map((place) => (
          <Marker
            key={place.id_p}
            position={place.location.split(',').map(Number)}
            eventHandlers={{
              click: () => handleMarkerClick(place),
            }}
          />
        ))}
      </MapContainer>

      {/* Panel lateral */}
      <Offcanvas show={showPanel} onHide={() => setShowPanel(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedPlace?.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button
            variant="success"
            size="sm"
            className="mb-3"
            onClick={() => navigate(`/activities?place=${selectedPlace?.id_p}`)}
          >
            Ver Actividades
          </Button>

          {submitted ? (
            <p className="text-success">Reporte enviado ✅</p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Describa el problema</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="mt-2">
                Enviar Reporte
              </Button>
            </Form>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default MapPage;
