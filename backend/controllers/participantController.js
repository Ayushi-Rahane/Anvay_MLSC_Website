const Participant = require('../models/Participant');
const { generateCitizenId } = require('../utils/generateCitizenId');

// @desc    Get all participants
// @route   GET /api/participants
const getParticipants = async (req, res, next) => {
    try {
        const participants = await Participant.find().sort({ totalPoints: -1 });
        res.json(participants);
    } catch (error) {
        next(error);
    }
};

// @desc    Get participant by citizen ID
// @route   GET /api/participants/citizen/:citizenId
const getParticipantByCitizenId = async (req, res, next) => {
    try {
        const participant = await Participant.findOne({ citizenId: req.params.citizenId });
        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }
        res.json(participant);
    } catch (error) {
        next(error);
    }
};

// @desc    Register a new participant
// @route   POST /api/participants
const createParticipant = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const existingParticipant = await Participant.findOne({ email });
        if (existingParticipant) {
            return res.status(400).json({ message: 'Participant already exists' });
        }

        const citizenId = generateCitizenId();

        const participant = await Participant.create({
            name,
            email,
            citizenId,
        });

        res.status(201).json(participant);
    } catch (error) {
        next(error);
    }
};

// @desc    Update participant
// @route   PUT /api/participants/:id
const updateParticipant = async (req, res, next) => {
    try {
        const participant = await Participant.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }
        res.json(participant);
    } catch (error) {
        next(error);
    }
};

module.exports = { getParticipants, getParticipantByCitizenId, createParticipant, updateParticipant };
