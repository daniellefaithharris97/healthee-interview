# Task List: Internal Feedback Tool

## Relevant Files

- `src/app.js` - Main Express server setup and route configuration
- `src/routes/feedback.js` - API routes for feedback CRUD operations
- `src/models/Feedback.js` - Database model for feedback entries
- `src/database/init.js` - Database initialization and schema setup
- `scripts/init-db.js` - Database initialization script
- `src/utils/logger.js` - Logging utility for application logs
- `src/utils/errorHandler.js` - Error handling middleware and utilities
- `src/config/environment.js` - Environment configuration management
- `public/index.html` - Main HTML page with feedback form and list
- `public/css/styles.css` - Styling for the feedback interface
- `public/js/app.js` - Frontend JavaScript for form handling and API calls
- `package.json` - Project dependencies and scripts (express, sqlite3, cors, body-parser, jest)
- `src/routes/feedback.test.js` - Unit tests for feedback API routes
- `src/models/Feedback.test.js` - Unit tests for feedback model
- `public/js/app.test.js` - Unit tests for frontend JavaScript

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npm test` to run all tests
- The project uses SQLite for simplicity and ease of setup
- Frontend will be vanilla HTML/CSS/JS for simplicity

## Tasks

- [ ] 1.0 Project Setup and Database Configuration
  - [x] 1.1 Initialize Node.js project with package.json and install dependencies (express, sqlite3, cors, body-parser)
  - [x] 1.2 Create project directory structure (src/, public/, tests/)
  - [x] 1.3 Set up SQLite database with feedback table (id, text, timestamp columns)
  - [x] 1.4 Create database initialization script with schema creation
  - [x] 1.5 Add basic error handling and logging setup
  - [x] 1.6 Create environment configuration for development

- [ ] 2.0 Backend API Development
  - [ ] 2.1 Create Express server with basic middleware (CORS, body-parser, static files)
  - [ ] 2.2 Implement POST /api/feedback endpoint for creating new feedback
  - [ ] 2.3 Implement GET /api/feedback endpoint for retrieving all feedback
  - [ ] 2.4 Implement DELETE /api/feedback/:id endpoint for removing feedback
  - [ ] 2.5 Add input validation for feedback text (500 word limit, non-empty)
  - [ ] 2.6 Add error handling for database operations and API responses
  - [ ] 2.7 Create feedback model with database interaction methods

- [ ] 3.0 Frontend UI Development
  - [ ] 3.1 Create HTML structure with feedback form and list container
  - [ ] 3.2 Style the interface with CSS (form, list, buttons, responsive design)
  - [ ] 3.3 Implement feedback form with character counter (X/500 words)
  - [ ] 3.4 Add word limit enforcement (prevent typing when limit reached)
  - [ ] 3.5 Create feedback list display with first 10 words and timestamp
  - [ ] 3.6 Add delete buttons (trash icons) for each feedback entry
  - [ ] 3.7 Implement form submission and list refresh functionality
  - [ ] 3.8 Add loading states and user feedback for API calls

- [ ] 4.0 Integration and Testing
  - [ ] 4.1 Connect frontend form to backend API for feedback submission
  - [ ] 4.2 Connect frontend list to backend API for displaying feedback
  - [ ] 4.3 Connect delete buttons to backend API for feedback removal
  - [ ] 4.4 Test complete workflow: submit → view → delete → refresh
  - [ ] 4.5 Add error handling for network failures and API errors
  - [ ] 4.6 Test data persistence across browser sessions
  - [ ] 4.7 Write unit tests for API endpoints and frontend functions
  - [ ] 4.8 Test responsive design on different screen sizes

- [ ] 5.0 AI Summary Feature Implementation
  - [ ] 5.1 Add "Summarize" button to the top right of feedback list area
  - [ ] 5.2 Create POST /api/summarize endpoint for AI summary generation
  - [ ] 5.3 Implement OpenAI API integration for text summarization
  - [ ] 5.4 Add fallback handling for API unavailability ("API unavailable" message)
  - [ ] 5.5 Create summary display area in the frontend
  - [ ] 5.6 Add loading state for summary generation
  - [ ] 5.7 Test AI summary functionality with sample data
  - [ ] 5.8 Add error handling for AI API failures and rate limits
