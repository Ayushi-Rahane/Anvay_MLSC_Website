const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config({ path: '../../.env' });

const connectDB = require('../config/db');

const seedRooms = async () => {
    try {
        await connectDB();

        // Seed admin user if not exists
        const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
        if (!adminExists) {
            await Admin.create({
                name: 'Admin',
                email: process.env.ADMIN_EMAIL || 'admin@blockcity.com',
                password: process.env.ADMIN_PASSWORD || 'changeme123',
            });
            console.log('✅ Admin user seeded');
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        console.log('🌱 Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedRooms();
