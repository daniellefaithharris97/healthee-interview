const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config/environment');
const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./utils/errorHandler');
const { initDatabase } = require('./database/init');

// Import routes
const feedbackRoutes = require('./routes/feedback');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/feedback', feedbackRoutes);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize database and start server
const PORT = config.port;

async function startServer() {
    try {
        // Initialize database
        await initDatabase();
        logger.info('Database initialized successfully');
        
        // Start server
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
            logger.info(`Open http://localhost:${PORT} to view the feedback tool`);
        });
    } catch (error) {
        logger.error('Failed to start server', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
