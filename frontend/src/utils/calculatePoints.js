/**
 * Calculate total points from room submissions.
 * @param {Array} submissions - Array of room submission objects { roomId, score }
 * @returns {number} Total points
 */
export const calculateTotalPoints = (submissions = []) => {
    return submissions.reduce((total, sub) => total + (sub.score || 0), 0);
};

/**
 * Calculate average score across rooms.
 * @param {Array} submissions
 * @returns {number} Average score
 */
export const calculateAverage = (submissions = []) => {
    if (submissions.length === 0) return 0;
    const total = calculateTotalPoints(submissions);
    return Math.round(total / submissions.length);
};
