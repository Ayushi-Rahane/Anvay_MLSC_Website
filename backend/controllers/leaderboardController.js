const Leaderboard = require('../models/Leaderboard');

// @desc    Get full leaderboard sorted by points
// @route   GET /api/leaderboard
const getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await Leaderboard.find().sort({ totalPoints: -1 });
        res.json(leaderboard);
    } catch (error) {
        next(error);
    }
};

// @desc    Get leaderboard entries for a specific room
// @route   GET /api/leaderboard/room/:roomId
const getLeaderboardByRoom = async (req, res, next) => {
    try {
        const leaderboard = await Leaderboard.find({
            'roomScores.roomId': req.params.roomId,
        }).sort({ totalPoints: -1 });
        res.json(leaderboard);
    } catch (error) {
        next(error);
    }
};

// @desc    Submit a score (updates leaderboard)
// @route   POST /api/leaderboard/submit
const submitScore = async (req, res, next) => {
    try {
        const { participantId, roomId, score } = req.body;

        let entry = await Leaderboard.findOne({ participant: participantId });

        if (!entry) {
            return res.status(404).json({ message: 'Leaderboard entry not found for this participant' });
        }

        // Update or add room score
        const existingRoom = entry.roomScores.find((r) => r.roomId === roomId);
        if (existingRoom) {
            existingRoom.score = score;
        } else {
            entry.roomScores.push({ roomId, score });
        }

        // Recalculate total points
        entry.totalPoints = entry.roomScores.reduce((sum, r) => sum + r.score, 0);

        // Update tier
        const { calculateTier } = require('../utils/calculateTier');
        entry.tier = calculateTier(entry.totalPoints);

        await entry.save();
        res.json(entry);
    } catch (error) {
        next(error);
    }
};

module.exports = { getLeaderboard, getLeaderboardByRoom, submitScore };
