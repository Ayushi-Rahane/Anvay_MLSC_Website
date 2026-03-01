const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema(
    {
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Participant',
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        citizenId: {
            type: String,
            required: true,
        },
        totalPoints: {
            type: Number,
            default: 0,
        },
        tier: {
            type: String,
            enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
            default: 'Bronze',
        },
        roomScores: [
            {
                roomId: String,
                score: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Index for sorting by points
leaderboardSchema.index({ totalPoints: -1 });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
