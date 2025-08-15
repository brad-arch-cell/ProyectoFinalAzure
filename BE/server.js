const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// Importar rutas
const athleteRoutes = require('./routes/athlete.routes');
const placeRoutes = require('./routes/place.routes');
const activityRoutes = require('./routes/activity.routes');
const reportRoutes = require('./routes/report.routes');
const invitationRoutes = require('./routes/invitation.routes');

const app = express();
const puerto = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Verificar conexión a BD
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos MySQL');
});

// Usar rutas
app.use('/api/athletes', athleteRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/invitations', invitationRoutes);

// Servidor corriendo
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
