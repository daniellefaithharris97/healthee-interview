const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const logger = require('../utils/logger');
const { asyncHandler } = require('../utils/errorHandler');

// Validation helper
const validateFeedback = (text) => {
  if (!text || typeof text !== 'string') {
    return { valid: false, error: 'Feedback text is required' };
  }
  
  const trimmedText = text.trim();
  if (trimmedText.length === 0) {
    return { valid: false, error: 'Feedback text cannot be empty' };
  }
  
  const wordCount = trimmedText.split(/\s+/).length;
  if (wordCount > 500) {
    return { valid: false, error: 'Feedback cannot exceed 500 words' };
  }
  
  return { valid: true, text: trimmedText };
};

// POST /api/feedback - Create new feedback
router.post('/', asyncHandler(async (req, res) => {
  const { text } = req.body;
  
  const validation = validateFeedback(text);
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error
    });
  }
  
  try {
    const feedback = await Feedback.create(validation.text);
    logger.info(`Created feedback: ${feedback.id}`);
    
    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    logger.error('Failed to create feedback', error);
    res.status(500).json({
      error: 'Failed to create feedback'
    });
  }
}));

// GET /api/feedback - Get all feedback
router.get('/', asyncHandler(async (req, res) => {
  try {
    const feedback = await Feedback.getAll();
    logger.info(`Retrieved ${feedback.length} feedback entries`);
    
    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    logger.error('Failed to fetch feedback', error);
    res.status(500).json({
      error: 'Failed to fetch feedback'
    });
  }
}));

// GET /api/feedback/:id - Get specific feedback
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      error: 'Valid feedback ID is required'
    });
  }
  
  try {
    const feedback = await Feedback.getById(parseInt(id));
    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    if (error.message === 'Feedback not found') {
      res.status(404).json({
        error: 'Feedback not found'
      });
    } else {
      logger.error('Failed to fetch feedback by ID', error);
      res.status(500).json({
        error: 'Failed to fetch feedback'
      });
    }
  }
}));

// DELETE /api/feedback/:id - Delete feedback
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      error: 'Valid feedback ID is required'
    });
  }
  
  try {
    const result = await Feedback.delete(parseInt(id));
    logger.info(`Deleted feedback: ${id}`);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.message === 'Feedback not found') {
      res.status(404).json({
        error: 'Feedback not found'
      });
    } else {
      logger.error('Failed to delete feedback', error);
      res.status(500).json({
        error: 'Failed to delete feedback'
      });
    }
  }
}));

// POST /api/feedback/summarize - Generate AI summary
router.post('/summarize', asyncHandler(async (req, res) => {
  try {
    const feedbackTexts = await Feedback.getAllText();
    
    if (feedbackTexts.length === 0) {
      return res.status(400).json({
        error: 'No feedback available to summarize'
      });
    }
    
    // For now, return a mock summary
    // TODO: Integrate with OpenAI API
    const mockSummary = generateMockSummary(feedbackTexts);
    
    res.json({
      success: true,
      data: {
        summary: mockSummary,
        feedbackCount: feedbackTexts.length
      }
    });
  } catch (error) {
    logger.error('Failed to generate summary', error);
    res.status(500).json({
      error: 'Failed to generate summary'
    });
  }
}));

// Mock summary generator (to be replaced with OpenAI integration)
function generateMockSummary(feedbackTexts) {
  const themes = [
    "User interface improvements",
    "Performance optimization", 
    "Feature requests",
    "Bug reports",
    "Team collaboration",
    "System reliability",
    "User experience enhancements"
  ];
  
  const randomThemes = themes.slice(0, Math.min(3, Math.floor(Math.random() * 3) + 1));
  const themeText = randomThemes.join(', ');
  
  return `Based on ${feedbackTexts.length} feedback submissions, the main themes include ${themeText}. The team has provided valuable insights about user experience and system performance. Key areas for improvement have been identified, and the feedback shows a positive trend in user satisfaction with recent updates.`;
}

module.exports = router;
