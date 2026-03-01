const Participant = require('../models/Participant');
const { generateCitizenId } = require('../utils/generateCitizenId');

/**
 * Generate and assign a unique citizen ID to a participant.
 * @param {string} participantId
 * @returns {string} The generated citizen ID
 */
const assignCitizenId = async (participantId) => {
    let citizenId;
    let isUnique = false;

    // Ensure uniqueness
    while (!isUnique) {
        citizenId = generateCitizenId();
        const existing = await Participant.findOne({ citizenId });
        if (!existing) {
            isUnique = true;
        }
    }

    await Participant.findByIdAndUpdate(participantId, { citizenId });
    return citizenId;
};

module.exports = { assignCitizenId };
