// Mistral AI Configuration
const MISTRAL_API_KEY = '4QtZ8GY0zX1EZxZU8jWDJCIJJvNYmn9Y';
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// DOM Elements
const loginModal = document.getElementById('loginModal');
const app = document.getElementById('app');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const emailLoginBtn = document.getElementById('emailLoginBtn');
const emailForm = document.getElementById('emailForm');
const emailSignInBtn = document.getElementById('emailSignInBtn');
const emailSignUpBtn = document.getElementById('emailSignUpBtn');
const backToOptionsBtn = document.getElementById('backToOptionsBtn');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const logoutBtn = document.getElementById('logoutBtn');
const themeToggle = document.getElementById('themeToggle');
const newChatBtn = document.getElementById('newChatBtn');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// State
let currentUser = null;
let conversationHistory = [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set initial theme
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }

    // Auth State Observer
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            showApp();
        } else {
            currentUser = null;
            showLogin();
        }
    });

    // Event Listeners
    googleLoginBtn.addEventListener('click', signInWithGoogle);
    emailLoginBtn.addEventListener('click', showEmailForm);
    emailSignInBtn.addEventListener('click', signInWithEmail);
    emailSignUpBtn.addEventListener('click', signUpWithEmail);
    backToOptionsBtn.addEventListener('click', hideEmailForm);
    logoutBtn.addEventListener('click', logout);
    themeToggle.addEventListener('click', toggleTheme);
    newChatBtn.addEventListener('click', startNewChat);
    sendBtn.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    messageInput.addEventListener('input', autoResizeTextarea);
}

// Authentication Functions
async function signInWithGoogle() {
    try {
        await auth.signInWithPopup(googleProvider);
    } catch (error) {
        showError('Failed to sign in with Google: ' + error.message);
    }
}

function showEmailForm() {
    document.querySelector('.login-buttons').style.display = 'none';
    emailForm.style.display = 'flex';
}

function hideEmailForm() {
    document.querySelector('.login-buttons').style.display = 'flex';
    emailForm.style.display = 'none';
    emailInput.value = '';
    passwordInput.value = '';
}

async function signInWithEmail() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showError('Please enter email and password');
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        showError('Failed to sign in: ' + error.message);
    }
}

async function signUpWithEmail() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        showError('Please enter email and password');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        showSuccess('Account created successfully!');
    } catch (error) {
        showError('Failed to create account: ' + error.message);
    }
}

async function logout() {
    try {
        await auth.signOut();
        conversationHistory = [];
    } catch (error) {
        showError('Failed to logout: ' + error.message);
    }
}

// UI Functions
function showLogin() {
    loginModal.style.display = 'flex';
    app.style.display = 'none';
}

function showApp() {
    loginModal.style.display = 'none';
    app.style.display = 'block';
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
}

function startNewChat() {
    conversationHistory = [];
    chatMessages.innerHTML = `
        <div class="welcome-message">
            <h2>Welcome to KingMRU AI Chat</h2>
            <p>Ask me anything! I'm here to help with your questions, ideas, and creative tasks.</p>
        </div>
    `;
}

function autoResizeTextarea() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 200) + 'px';
}

// Chat Functions
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) return;

    // Disable input
    sendBtn.disabled = true;
    messageInput.disabled = true;

    // Remove welcome message if present
    const welcomeMsg = document.querySelector('.welcome-message');
    if (welcomeMsg) {
        welcomeMsg.remove();
    }

    // Add user message to UI
    addMessage('user', message);

    // Clear input
    messageInput.value = '';
    messageInput.style.height = 'auto';

    // Add message to history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Show typing indicator
    const typingId = addTypingIndicator();

    try {
        // Call Mistral API
        const response = await fetch(MISTRAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: conversationHistory,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        // Remove typing indicator
        removeTypingIndicator(typingId);

        // Add assistant message to UI
        addMessage('assistant', assistantMessage);

        // Add to history
        conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

    } catch (error) {
        removeTypingIndicator(typingId);
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
        console.error('Error:', error);
    }

    // Re-enable input
    sendBtn.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();
}

function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 
        (currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U') : 
        'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Format message content (simple paragraph breaks)
    const paragraphs = content.split('\n\n');
    contentDiv.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant';
    typingDiv.id = 'typing-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(contentDiv);
    chatMessages.appendChild(typingDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return 'typing-indicator';
}

function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) {
        indicator.remove();
    }
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const targetElement = emailForm.style.display !== 'none' ? emailForm : document.querySelector('.login-buttons');
    targetElement.parentNode.insertBefore(errorDiv, targetElement);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const targetElement = emailForm.style.display !== 'none' ? emailForm : document.querySelector('.login-buttons');
    targetElement.parentNode.insertBefore(successDiv, targetElement);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
