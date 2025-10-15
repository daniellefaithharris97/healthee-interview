#!/usr/bin/env node

const { initDatabase, closeDatabase } = require('../src/database/init');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  } finally {
    await closeDatabase();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
