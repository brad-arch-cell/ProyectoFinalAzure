const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

router.get('/', placeController.getAllPlaces);
router.post('/', placeController.createPlace);

module.exports = router;
