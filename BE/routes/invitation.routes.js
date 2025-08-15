const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitation.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, invitationController.getUserInvitations);

router.post('/', invitationController.createInvitation);

module.exports = router;
