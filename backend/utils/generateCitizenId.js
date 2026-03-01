/**
 * Generate a unique citizen ID for BlockCity.
 * Format: BC-XXXXX (5 alphanumeric characters)
 * @returns {string}
 */
const generateCitizenId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'BC-';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

module.exports = { generateCitizenId };
