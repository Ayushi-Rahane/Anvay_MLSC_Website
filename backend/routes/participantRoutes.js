const express = require('express');
const router = express.Router();
const {
    getParticipants,
    getParticipantByCitizenId,
    createParticipant,
    updateParticipant,
} = require('../controllers/participantController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getParticipants).post(protect, createParticipant);
router.route('/citizen/:citizenId').get(getParticipantByCitizenId);
router.route('/:id').put(protect, updateParticipant);

module.exports = router;
