const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const activityController = require('../controllers/activity.controller');

// Obtener todas las actividades o filtradas por parque
router.get('/', activityController.getAll);

// Crear una actividad (requiere autenticación)
router.post('/', verifyToken, activityController.create);

// Obtener actividades creadas por el usuario autenticado
router.get('/my', verifyToken, activityController.getMine);

module.exports = router;
