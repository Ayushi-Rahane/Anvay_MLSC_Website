const express = require('express');
const router = express.Router();
const {
    getLeaderboard,
    getLeaderboardByRoom,
    submitScore,
} = require('../controllers/leaderboardController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLeaderboard);
router.route('/room/:roomId').get(getLeaderboardByRoom);
router.route('/submit').post(protect, submitScore);

module.exports = router;
