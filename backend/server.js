const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const corsConfig = require('./config/cors');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();

// -------------------
// Middleware
// -------------------
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// -------------------
// Routes
// -------------------
app.use('/api/participants', require('./routes/participantRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));


app.use('/api/admin', require('./routes/mentorRoutes'));

// -------------------
// Health Check Route
// -------------------
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'BlockCity API is running 🏙️',
        environment: process.env.NODE_ENV
    });
});

// -------------------
// Error Handling Middleware
// -------------------
app.use(notFound);
app.use(errorHandler);

// -------------------
// Start Server
// -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});