const RoomSubmission = require('../models/RoomSubmission');
const { calculateTier } = require('../utils/calculateTier');

/**
 * Process a score submission for a participant in a room.
 * @param {Object} params - { participantId, roomId, score, adminId }
 * @returns {Object} The created or updated submission
 */
const processScoreSubmission = async ({ participantId, roomId, score, adminId }) => {
    // Check for existing submission
    const existing = await RoomSubmission.findOne({
        participant: participantId,
        roomId,
    });

    if (existing) {
        existing.score = score;
        existing.submittedBy = adminId;
        await existing.save();
        return existing;
    }

    const submission = await RoomSubmission.create({
        participant: participantId,
        roomId,
        score,
        submittedBy: adminId,
    });

    return submission;
};

/**
 * Get all submissions for a participant.
 * @param {string} participantId
 * @returns {Array} Submissions
 */
const getSubmissionsForParticipant = async (participantId) => {
    return await RoomSubmission.find({ participant: participantId }).sort({ createdAt: 1 });
};

module.exports = { processScoreSubmission, getSubmissionsForParticipant };
