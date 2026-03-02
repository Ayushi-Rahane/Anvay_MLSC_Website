const express = require('express');
const router = express.Router();
const {
    createSubmission,
    getSubmissionsByRoom,
    updateSubmissionStatus,
    deleteSubmission
} = require('../controllers/submissionController');
// const { protect } = require('../middleware/authMiddleware'); // Uncomment and apply if needed

router.post('/', createSubmission);
router.get('/room/:roomId', getSubmissionsByRoom);
router.put('/:id/status', updateSubmissionStatus);
router.delete('/:id', deleteSubmission);

module.exports = router;
