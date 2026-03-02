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
        const { uce, roomId, name, tier } = req.body;
        if (!uce || !roomId) {
            return res.status(400).json({ message: 'UCE and roomId are required' });
        }

        const validRooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
        if (!validRooms.includes(roomId)) {
            return res.status(400).json({ message: 'Invalid room id' });
        }

        // Check if a pending or approved submission already exists for this UCE + SPECIFIC room
        // Querying only by 'uce' to avoid requiring a Firestore composite index
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

        // Create new submission
        const newSubmission = {
            uce: uce.toUpperCase(),
            roomId,
            name: name || 'Unknown',
            tier: tier || 'Explorer',
            basePoints: 100, // Example default base points
            extraPoints: 0,
            status: 'pending',
            extraHistory: [],
            submittedAt: new Date().toISOString()
        };

        const docRef = await submissionsCollection.add(newSubmission);
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

        // If marking as approved, update the actual participant score in Firestore
        if (status === 'approved' && subData.status !== 'approved') {
            const finalBase = subData.basePoints;
            const finalExtra = updates.extraPoints !== undefined ? updates.extraPoints : subData.extraPoints;
            const totalRoomScore = finalBase + finalExtra;

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

module.exports = {
    createSubmission,
    getSubmissionsByRoom,
    updateSubmissionStatus,
    deleteSubmission
};
