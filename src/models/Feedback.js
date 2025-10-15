const { db } = require('../database/init');
const logger = require('../utils/logger');

class Feedback {
  static async create(text) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO feedback (text) VALUES (?)');
      stmt.run(text, function(err) {
        if (err) {
          logger.error('Error creating feedback', err);
          reject(err);
        } else {
          logger.info(`Created feedback with ID: ${this.lastID}`);
          resolve({
            id: this.lastID,
            text: text,
            timestamp: new Date().toISOString()
          });
        }
      });
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM feedback ORDER BY timestamp DESC', (err, rows) => {
        if (err) {
          logger.error('Error fetching feedback', err);
          reject(err);
        } else {
          logger.info(`Fetched ${rows.length} feedback entries`);
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM feedback WHERE id = ?', [id], (err, row) => {
        if (err) {
          logger.error('Error fetching feedback by ID', err);
          reject(err);
        } else if (!row) {
          reject(new Error('Feedback not found'));
        } else {
          resolve(row);
        }
      });
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('DELETE FROM feedback WHERE id = ?');
      stmt.run(id, function(err) {
        if (err) {
          logger.error('Error deleting feedback', err);
          reject(err);
        } else if (this.changes === 0) {
          reject(new Error('Feedback not found'));
        } else {
          logger.info(`Deleted feedback with ID: ${id}`);
          resolve({ id: id, deleted: true });
        }
      });
    });
  }

  static async getAllText() {
    return new Promise((resolve, reject) => {
      db.all('SELECT text FROM feedback ORDER BY timestamp ASC', (err, rows) => {
        if (err) {
          logger.error('Error fetching feedback text for summary', err);
          reject(err);
        } else {
          const texts = rows.map(row => row.text);
          resolve(texts);
        }
      });
    });
  }
}

module.exports = Feedback;
