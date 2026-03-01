const mongoose = require('mongoose');

const roomSubmissionSchema = new mongoose.Schema(
    {
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Participant',
            required: true,
        },
        roomId: {
            type: String,
            required: [true, 'Room ID is required'],
        },
        score: {
            type: Number,
            required: [true, 'Score is required'],
            min: 0,
            max: 100,
        },
        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin',
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate submissions for same participant + room
roomSubmissionSchema.index({ participant: 1, roomId: 1 }, { unique: true });

module.exports = mongoose.model('RoomSubmission', roomSubmissionSchema);
