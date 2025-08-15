const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/athlete.controller');

// Registro y login
router.post('/register', athleteController.register);
router.post('/login', athleteController.login);
router.get('/', athleteController.getAll);
  

module.exports = router;
