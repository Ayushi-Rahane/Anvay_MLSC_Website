// Shared constants for the backend

const STATUS = {
    LOCKED: 'locked',
    OPEN: 'open',
    COMPLETED: 'completed',
};

const TIERS = {
    BRONZE: 'Bronze',
    SILVER: 'Silver',
    GOLD: 'Gold',
    PLATINUM: 'Platinum',
};

const TIER_THRESHOLDS = {
    PLATINUM: 400,
    GOLD: 250,
    SILVER: 100,
    BRONZE: 0,
};

module.exports = { STATUS, TIERS, TIER_THRESHOLDS };
