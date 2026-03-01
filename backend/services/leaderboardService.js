const Leaderboard = require('../models/Leaderboard');
const { calculateTier } = require('../utils/calculateTier');

/**
 * Recalculate and update a participant's leaderboard entry.
 * @param {string} participantId - MongoDB ObjectId of the participant
 */
const recalculateLeaderboard = async (participantId) => {
    const entry = await Leaderboard.findOne({ participant: participantId });
    if (!entry) return null;

    entry.totalPoints = entry.roomScores.reduce((sum, r) => sum + r.score, 0);
    entry.tier = calculateTier(entry.totalPoints);

    await entry.save();
    return entry;
};

/**
 * Get the full sorted leaderboard.
 */
const getSortedLeaderboard = async () => {
    return await Leaderboard.find().sort({ totalPoints: -1 });
};

module.exports = { recalculateLeaderboard, getSortedLeaderboard };
