# Internal Feedback Tool

A lightweight internal feedback collection tool designed for CS teams to gather and analyze customer feedback efficiently.

## Features

- 📝 **Simple Feedback Collection**: Submit feedback with 500-word limit and real-time character counting
- 📊 **Feedback Management**: View, delete, and manage previous feedback submissions
- 🤖 **AI Summary Generation**: Generate AI-powered summaries of all feedback (with fallback to mock summaries)
- 💾 **Persistent Storage**: SQLite database for reliable data persistence
- 🎨 **Responsive Design**: Clean, modern UI that works on all devices
- ⚡ **Real-time Updates**: Instant feedback submission and deletion

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daniellefaithharris97/healthee-interview.git
   cd healthee-interview
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize the database:**
   ```bash
   npm run init-db
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` (or the port shown in the terminal)

### Alternative Ports

If port 3000 is busy, you can use a different port:

```bash
PORT=3500 npm start
```

## Usage

### Submitting Feedback

1. **Enter your feedback** in the text area (max 500 words)
2. **Watch the character counter** - it will prevent typing when you reach the limit
3. **Click "Submit Feedback"** to save your feedback
4. **See confirmation** that your feedback was saved

### Managing Feedback

- **View all feedback** in the list below the form
- **See preview** of each feedback (first 10 words + timestamp)
- **Delete feedback** by clicking the trash icon
- **Confirm deletion** in the popup dialog

### AI Summary

- **Click "Generate AI Summary"** to get insights from all feedback
- **View the summary** in the dedicated section
- **Note**: Currently uses mock summaries (AI integration pending)

## Development

### Project Structure

```
healthee-interview/
├── src/                     # Backend source code
│   ├── app.js              # Main Express server
│   ├── config/             # Configuration files
│   ├── database/           # Database initialization
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
├── public/                 # Frontend files
│   ├── index.html          # Main HTML page
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── data/                   # SQLite database files
├── tasks/                  # Project documentation
├── scripts/                # Utility scripts
│   ├── init-db.js         # Database initialization
│   └── setup.sh           # Project setup
├── package.json            # Dependencies and scripts
├── README.md              # This file
└── .gitignore             # Git ignore rules
```

### Available Scripts

- `npm start` - Start the application
- `npm run init-db` - Initialize the database
- `npm test` - Run tests (when implemented)
- `npm run dev` - Start with nodemon for development

### API Endpoints

- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Retrieve all feedback
- `DELETE /api/feedback/:id` - Delete specific feedback
- `POST /api/feedback/summarize` - Generate AI summary

### Database Schema

The application uses SQLite with a simple `feedback` table:

```sql
CREATE TABLE feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Simple Server Deployment

1. **Clone and setup:**
   ```bash
   git clone https://github.com/daniellefaithharris97/healthee-interview.git
   cd healthee-interview
   npm install
   npm run init-db
   ```

2. **Start the application:**
   ```bash
   npm start
   ```

3. **Access the tool:**
   Open `http://your-server:3000` in a web browser

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
PORT=3000
NODE_ENV=development
```

### Database

The SQLite database is automatically created at `data/feedback.db` on first run.

## Troubleshooting

### Port Already in Use

If you get `EADDRINUSE` error, try a different port:

```bash
PORT=3500 npm start
```

### Database Issues

If you encounter database errors:

1. **Delete the database file:**
   ```bash
   rm data/feedback.db
   ```

2. **Reinitialize:**
   ```bash
   npm run init-db
   ```

### Common Issues

- **Port conflicts**: Use `PORT=XXXX npm start` with a different port
- **Database locked**: Stop the application and restart
- **Missing dependencies**: Run `npm install` again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Healthee interview process.