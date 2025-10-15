// API base URL
const API_BASE = '/api/feedback';

// DOM elements
const feedbackForm = document.getElementById('feedbackForm');
const feedbackText = document.getElementById('feedbackText');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const feedbackList = document.getElementById('feedbackList');
const summarizeBtn = document.getElementById('summarizeBtn');
const summarySection = document.getElementById('summarySection');
const summaryContent = document.getElementById('summaryContent');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupFormHandlers();
    loadFeedbackList();
    setupSummarizeButton();
}

// Form handling
function setupFormHandlers() {
    feedbackText.addEventListener('input', handleTextInput);
    feedbackForm.addEventListener('submit', handleFormSubmit);
}

function handleTextInput() {
    const text = feedbackText.value;
    const wordCount = countWords(text);
    
    // Update character counter
    charCount.textContent = wordCount;
    
    // Update counter styling based on word count
    const counterElement = charCount.parentElement;
    counterElement.className = 'char-counter';
    
    if (wordCount >= 450) {
        counterElement.classList.add('warning');
    }
    
    if (wordCount >= 500) {
        counterElement.classList.add('limit-reached');
        feedbackText.value = text.substring(0, getTextForWordLimit(text, 500));
        charCount.textContent = 500;
    }
    
    // Enable/disable submit button
    submitBtn.disabled = wordCount === 0 || wordCount > 500;
}

function countWords(text) {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
}

function getTextForWordLimit(text, limit) {
    const words = text.trim().split(/\s+/);
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ');
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const text = feedbackText.value.trim();
    if (!text) {
        showError('Please enter some feedback before submitting.');
        return;
    }
    
    const wordCount = countWords(text);
    if (wordCount > 500) {
        showError('Feedback cannot exceed 500 words.');
        return;
    }
    
    // Show loading
    showLoading(true);
    
    try {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Update UI
            loadFeedbackList();
            feedbackForm.reset();
            charCount.textContent = '0';
            showSuccess('Feedback submitted successfully!');
        } else {
            showError(result.error || 'Failed to submit feedback. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        showError('Failed to submit feedback. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Feedback list management
async function loadFeedbackList() {
    try {
        const response = await fetch(API_BASE);
        const result = await response.json();
        
        if (response.ok && result.success) {
            const feedback = result.data;
            
            if (feedback.length === 0) {
                feedbackList.innerHTML = `
                    <div class="empty-state">
                        <h3>No feedback yet</h3>
                        <p>Be the first to share your thoughts!</p>
                    </div>
                `;
                return;
            }
            
            feedbackList.innerHTML = feedback.map(feedback => `
                <div class="feedback-item" data-id="${feedback.id}">
                    <div class="feedback-content">
                        <div class="feedback-preview">${getFirstTenWords(feedback.text)}</div>
                        <div class="feedback-timestamp">${formatTimestamp(feedback.timestamp)}</div>
                    </div>
                    <button class="delete-btn" onclick="deleteFeedback(${feedback.id})" title="Delete feedback">
                        🗑️
                    </button>
                </div>
            `).join('');
        } else {
            showError('Failed to load feedback. Please refresh the page.');
        }
    } catch (error) {
        console.error('Error loading feedback:', error);
        showError('Failed to load feedback. Please refresh the page.');
    }
}

function getFirstTenWords(text) {
    const words = text.trim().split(/\s+/);
    if (words.length <= 10) return text;
    return words.slice(0, 10).join(' ') + '...';
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function deleteFeedback(id) {
    if (!confirm('Are you sure you want to delete this feedback?')) {
        return;
    }
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            loadFeedbackList();
            showSuccess('Feedback deleted successfully!');
        } else {
            showError(result.error || 'Failed to delete feedback. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting feedback:', error);
        showError('Failed to delete feedback. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Summary functionality
function setupSummarizeButton() {
    summarizeBtn.addEventListener('click', handleSummarize);
}

async function handleSummarize() {
    showLoading(true);
    summarizeBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE}/summarize`, {
            method: 'POST'
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            displaySummary(result.data.summary);
            showSuccess('Summary generated successfully!');
        } else {
            showError(result.error || 'API unavailable. Unable to generate summary at this time.');
        }
    } catch (error) {
        console.error('Error generating summary:', error);
        showError('API unavailable. Unable to generate summary at this time.');
    } finally {
        showLoading(false);
        summarizeBtn.disabled = false;
    }
}


function displaySummary(summary) {
    summaryContent.textContent = summary;
    summarySection.style.display = 'block';
    summarySection.scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function showLoading(show) {
    loadingIndicator.style.display = show ? 'flex' : 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}
