/**
 * Calculate tier based on total points.
 * @param {number} totalPoints
 * @returns {string} Tier name
 */
const calculateTier = (totalPoints) => {
    if (totalPoints >= 400) return 'Platinum';
    if (totalPoints >= 250) return 'Gold';
    if (totalPoints >= 100) return 'Silver';
    return 'Bronze';
};

module.exports = { calculateTier };
