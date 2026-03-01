/**
 * Middleware to validate score submission requests.
 */
const validateSubmission = (req, res, next) => {
    const { participantId, roomId, score } = req.body;

    const errors = [];

    if (!participantId) {
        errors.push('participantId is required');
    }

    if (!roomId) {
        errors.push('roomId is required');
    }

    if (score === undefined || score === null) {
        errors.push('score is required');
    } else if (typeof score !== 'number' || score < 0 || score > 100) {
        errors.push('score must be a number between 0 and 100');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

module.exports = { validateSubmission };
