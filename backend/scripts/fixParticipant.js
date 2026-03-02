const { db } = require('../config/firebaseAdmin');

async function fixParticipant() {
    const uce = 'BC2025001';
    const docRef = db.collection('participants').doc(uce);

    // Reset room3, room4, room5 back to 0 so they unlock again
    await docRef.update({
        room3: 0,
        room4: 0,
        room5: 0,
        totalScore: 100 // Room1 completed in seed
    });

    console.log(`Reset progression for ${uce}`);
}

fixParticipant();
