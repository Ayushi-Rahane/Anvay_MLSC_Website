const { db } = require('../config/firebaseAdmin');

async function checkSubmissions() {
    const uce = "BC2025001";
    const roomId = "room2";

    const snapshot = await db.collection('submissions')
        .where('uce', '==', uce.toUpperCase())
        .get();

    console.log(`Found ${snapshot.docs.length} total submissions for ${uce}`);

    const activeSubmissions = snapshot.docs.filter(doc => {
        const data = doc.data();
        console.log(`Checking doc ${doc.id}: `, data);
        return data.roomId === roomId && (data.status === 'pending' || data.status === 'approved');
    });

    console.log(`Active matches for ${roomId}: `, activeSubmissions.length);
}

checkSubmissions();
