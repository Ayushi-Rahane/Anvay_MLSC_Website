const { db } = require('../config/firebaseAdmin');

const submissionsCollection = db.collection('submissions');
const participantsCollection = db.collection('participants');

const calcTotal = (data) =>
    Number(data.room1 || 0) +
    Number(data.room2 || 0) +
    Number(data.room3 || 0) +
    Number(data.room4 || 0) +
    Number(data.room5 || 0) +
    Number(data.bonusScore || 0) +
    Number(data.finalProjectScore || 0);

// @desc    Create a new submission
// @route   POST /api/submissions
const createSubmission = async (req, res, next) => {
    try {
        const { uce, roomId, name, tier, secretCode } = req.body;
        if (!uce || !roomId) {
            return res.status(400).json({ message: 'UCE and roomId are required' });
        }

        const validRooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
        if (!validRooms.includes(roomId)) {
            return res.status(400).json({ message: 'Invalid room id' });
        }

        // Secret code validation
        const ADMIN_SECRET_CODE = 'ANVAYA2025';
        if (secretCode !== ADMIN_SECRET_CODE) {
            return res.status(401).json({ message: 'Invalid secret code. Please ask the admin.' });
        }

        // Check if a pending or approved submission already exists for this UCE + SPECIFIC room
        const snapshot = await submissionsCollection
            .where('uce', '==', uce.toUpperCase())
            .get();

        const activeSubmissions = snapshot.docs.filter(doc => {
            const data = doc.data();
            return data.roomId === roomId && (data.status === 'pending' || data.status === 'approved');
        });

        if (activeSubmissions.length > 0) {
            return res.status(400).json({ message: 'Submission already exists for this specific room.' });
        }

        // Create new submission - Automatically approve if code is correct
        const newSubmission = {
            uce: uce.toUpperCase(),
            roomId,
            name: name || 'Unknown',
            tier: tier || 'Explorer',
            basePoints: 10, // Default base points updated to 10
            extraPoints: 0,
            status: 'approved', // Auto-approved on valid code
            extraHistory: [],
            submittedAt: new Date().toISOString(),
            approvedAt: new Date().toISOString()
        };

        const docRef = await submissionsCollection.add(newSubmission);

        // Also update the participant's score immediately
        const pDocRef = participantsCollection.doc(uce.toUpperCase());
        const pDoc = await pDocRef.get();
        if (pDoc.exists) {
            const updatedP = { ...pDoc.data(), [roomId]: 10 };
            const newTotalScore = calcTotal(updatedP);
            await pDocRef.update({
                [roomId]: 10,
                totalScore: newTotalScore
            });
        }

        res.status(201).json({ id: docRef.id, ...newSubmission });
    } catch (error) {
        next(error);
    }
};

// @desc    Get submissions for a specific room (Admin use)
// @route   GET /api/submissions/room/:roomId
const getSubmissionsByRoom = async (req, res, next) => {
    try {
        const { roomId } = req.params;
        const snapshot = await submissionsCollection
            .where('roomId', '==', roomId)
            .get();

        const submissions = snapshot.docs.map(doc => ({
            id: doc.id,
            citizenId: doc.data().uce, // Map uce back to citizenId for UI
            ...doc.data()
        }));

        // Sort by submittedAt descending (newest first)
        submissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

        res.json(submissions);
    } catch (error) {
        next(error);
    }
};

// @desc    Update submission status & add extra points
// @route   PUT /api/submissions/:id/status
const updateSubmissionStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, extraPoints, reason } = req.body;

        const docRef = submissionsCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Submission not found' });

        const subData = doc.data();
        const updates = {};

        if (status) updates.status = status;

        // If adding extra points
        if (extraPoints !== undefined) {
            updates.extraPoints = subData.extraPoints + Number(extraPoints);
            updates.extraHistory = [
                { points: Number(extraPoints), reason: reason || '', addedAt: new Date().toISOString() },
                ...(subData.extraHistory || [])
            ];
        }

        await docRef.update(updates);
        const finalExtra = updates.extraPoints !== undefined ? updates.extraPoints : subData.extraPoints;

        // Update the actual participant score in Firestore for this room
        const totalRoomScore = subData.basePoints + finalExtra;
        const pDocRef = participantsCollection.doc(subData.uce);
        const pDoc = await pDocRef.get();
        if (pDoc.exists) {
            const updatedP = { ...pDoc.data(), [subData.roomId]: totalRoomScore };
            const newTotalScore = calcTotal(updatedP);
            await pDocRef.update({
                [subData.roomId]: totalRoomScore,
                totalScore: newTotalScore
            });
        }


        res.json({ message: 'Submission updated successfully', id, ...updates });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete submission (hard reject)
// @route   DELETE /api/submissions/:id
const deleteSubmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const docRef = submissionsCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Submission not found' });

        await docRef.delete();
        res.json({ message: 'Submission permanently deleted' });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove an extra points entry
// @route   DELETE /api/submissions/:id/extra/:index
const removeExtraPoints = async (req, res, next) => {
    try {
        const { id, index } = req.params;
        const docRef = submissionsCollection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) return res.status(404).json({ message: 'Submission not found' });

        const subData = doc.data();
        const history = subData.extraHistory || [];
        const idx = parseInt(index);

        if (isNaN(idx) || idx < 0 || idx >= history.length) {
            return res.status(400).json({ message: 'Invalid history index' });
        }

        const removedEntry = history[idx];
        const newExtraPoints = subData.extraPoints - removedEntry.points;
        const newHistory = [...history];
        newHistory.splice(idx, 1);

        await docRef.update({
            extraPoints: newExtraPoints,
            extraHistory: newHistory
        });

        // Update participant score
        const totalRoomScore = subData.basePoints + newExtraPoints;
        const pDocRef = participantsCollection.doc(subData.uce);
        const pDoc = await pDocRef.get();
        if (pDoc.exists) {
            const updatedP = { ...pDoc.data(), [subData.roomId]: totalRoomScore };
            const newTotalScore = calcTotal(updatedP);
            await pDocRef.update({
                [subData.roomId]: totalRoomScore,
                totalScore: newTotalScore
            });
        }

        res.json({ message: 'Extra points removed', extraPoints: newExtraPoints });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSubmission,
    getSubmissionsByRoom,
    updateSubmissionStatus,
    deleteSubmission,
    removeExtraPoints
};

