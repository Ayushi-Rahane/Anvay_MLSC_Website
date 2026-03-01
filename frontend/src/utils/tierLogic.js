/**
 * Determine the tier based on total points.
 * @param {number} totalPoints
 * @returns {string} Tier name
 */
export const getTier = (totalPoints) => {
    if (totalPoints >= 400) return 'Platinum';
    if (totalPoints >= 250) return 'Gold';
    if (totalPoints >= 100) return 'Silver';
    return 'Bronze';
};

/**
 * Get tier color class for Tailwind
 * @param {string} tier
 * @returns {string}
 */
export const getTierColor = (tier) => {
    const colors = {
        Bronze: 'text-bronze',
        Silver: 'text-silver',
        Gold: 'text-gold',
        Platinum: 'text-platinum',
    };
    return colors[tier] || colors.Bronze;
};
