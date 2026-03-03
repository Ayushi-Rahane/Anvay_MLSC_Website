const express = require('express');
const router = express.Router();
const {
    getParticipants,
    getParticipantByUce,
    updateBonusScore,
    updateFinalProjectScore
} = require('../controllers/participantController');

router.get('/', getParticipants);
router.get('/:uce', getParticipantByUce);
router.put('/:uce/bonus', updateBonusScore);
router.put('/:uce/finalproject', updateFinalProjectScore);

module.exports = router;