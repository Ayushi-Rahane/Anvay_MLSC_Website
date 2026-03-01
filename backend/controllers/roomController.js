const { ROOMS } = require('../../shared/roomConstants');

// @desc    Get all rooms with their status
// @route   GET /api/rooms
const getRooms = async (req, res, next) => {
    try {
        res.json(Object.values(ROOMS));
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single room by ID
// @route   GET /api/rooms/:roomId
const getRoomById = async (req, res, next) => {
    try {
        const room = Object.values(ROOMS).find((r) => r.id === req.params.roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        next(error);
    }
};

// @desc    Update room status
// @route   PATCH /api/rooms/:roomId
const updateRoomStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const room = Object.values(ROOMS).find((r) => r.id === req.params.roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        // In production, store in DB. For now, update in-memory.
        room.status = status;
        res.json(room);
    } catch (error) {
        next(error);
    }
};

module.exports = { getRooms, getRoomById, updateRoomStatus };
