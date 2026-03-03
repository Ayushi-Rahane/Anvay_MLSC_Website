const express = require('express');
const router = express.Router();
const {
    createSubmission,
    getSubmissionsByRoom,
    updateSubmissionStatus,
    deleteSubmission,
    removeExtraPoints
} = require('../controllers/submissionController');

router.post('/', createSubmission);
router.get('/room/:roomId', getSubmissionsByRoom);
router.put('/:id/status', updateSubmissionStatus);
router.delete('/:id', deleteSubmission);
router.delete('/:id/extra/:index', removeExtraPoints);

module.exports = router;
