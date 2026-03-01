const express = require('express');
const router = express.Router();
const { getRooms, getRoomById, updateRoomStatus } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getRooms);
router.route('/:roomId').get(getRoomById).patch(protect, updateRoomStatus);

module.exports = router;
