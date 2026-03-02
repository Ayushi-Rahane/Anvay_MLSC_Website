const { db } = require('../config/firebaseAdmin');

async function seedData() {
    const participants = [
        { uce: 'BC2025001', name: 'Ayush Irahane', team: 'Innovators', role: 'Auditor', room1: 100, room2: 0, totalScore: 100 },
        { uce: 'BC2025002', name: 'John Doe', team: 'Alpha', role: 'Explorer', room1: 0, totalScore: 0 },
        { uce: 'BC2025003', name: 'Jane Smith', team: 'Beta', role: 'Builder', room1: 100, room2: 100, totalScore: 200 }
    ];

    const batch = db.batch();

    for (const p of participants) {
        const uce = p.uce;
        delete p.uce; // Use UCE as the document ID
        const docRef = db.collection('participants').doc(uce);
        batch.set(docRef, p);
    }

    try {
        await batch.commit();
        console.log('Test participants successfully seeded to Firestore!');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

seedData();
