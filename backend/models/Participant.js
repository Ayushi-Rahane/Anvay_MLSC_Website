const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        citizenId: {
            type: String,
            required: true,
            unique: true,
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
        roomsCompleted: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Participant', participantSchema);
