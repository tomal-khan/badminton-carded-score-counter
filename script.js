// --- DOM Elements ---
const team1ScoreEl = document.getElementById('team1-score');
const team2ScoreEl = document.getElementById('team2-score');

const team1PlusBtn = document.getElementById('team1-plus');
const team1MinusBtn = document.getElementById('team1-minus');

const team2PlusBtn = document.getElementById('team2-plus');
const team2MinusBtn = document.getElementById('team2-minus');

const smallTeam1ScoreEl = document.getElementById('small-team1-score');
const smallTeam2ScoreEl = document.getElementById('small-team2-score');

const smallTeam1PlusBtn = document.getElementById('small-team1-plus');
const smallTeam1MinusBtn = document.getElementById('small-team1-minus');
const smallTeam2PlusBtn = document.getElementById('small-team2-plus');
const smallTeam2MinusBtn = document.getElementById('small-team2-minus');

const resetButton = document.getElementById('reset-button');

// --- State ---
let team1Score = 0;
let team2Score = 0;
let smallTeam1Score = 0;
let smallTeam2Score = 0;

// --- Functions ---

/**
 * Updates the score display on the page.
 */
function updateScoreDisplay() {
    team1ScoreEl.textContent = team1Score;
    team2ScoreEl.textContent = team2Score;
    smallTeam1ScoreEl.textContent = smallTeam1Score;
    smallTeam2ScoreEl.textContent = smallTeam2Score;
}

/**
 * Resets the game state and updates the display.
 */
function resetGame() {
    team1Score = 0;
    team2Score = 0;
    smallTeam1Score = 0;
    smallTeam2Score = 0;
    updateScoreDisplay();
}

// --- Event Listeners ---

// Team 1 Controls
team1PlusBtn.addEventListener('click', () => {
    team1Score++;
    updateScoreDisplay();
});

team1MinusBtn.addEventListener('click', () => {
    if (team1Score > 0) {
        team1Score--;
        updateScoreDisplay();
    }
});

// Team 2 Controls
team2PlusBtn.addEventListener('click', () => {
    team2Score++;
    updateScoreDisplay();
});

team2MinusBtn.addEventListener('click', () => {
    if (team2Score > 0) {
        team2Score--;
        updateScoreDisplay();
    }
});

// Small Team 1 Controls
smallTeam1PlusBtn.addEventListener('click', () => {
    smallTeam1Score++;
    if (smallTeam1Score === 3) {
        smallTeam1Score = 0;
        smallTeam2Score = 0;
        team2Score++; // Left bottom reaches 3 -> Right top gets 1
    }
    updateScoreDisplay();
});

smallTeam1MinusBtn.addEventListener('click', () => {
    if (smallTeam1Score > 0) {
        smallTeam1Score--;
        updateScoreDisplay();
    }
});

// Small Team 2 Controls
smallTeam2PlusBtn.addEventListener('click', () => {
    smallTeam2Score++;
    if (smallTeam2Score === 3) {
        smallTeam1Score = 0;
        smallTeam2Score = 0;
        team1Score++; // Right bottom reaches 3 -> Left top gets 1
    }
    updateScoreDisplay();
});

smallTeam2MinusBtn.addEventListener('click', () => {
    if (smallTeam2Score > 0) {
        smallTeam2Score--;
        updateScoreDisplay();
    }
});

// Game Controls


// --- Initial Setup ---
// Set the initial scores on page load
updateScoreDisplay();

// --- Player Selection Logic ---
const p1Btn = document.getElementById('p1-btn');
const p1List = document.getElementById('p1-list');
const p2Btn = document.getElementById('p2-btn');
const p2List = document.getElementById('p2-list');

function toggleList(btn, list) {
    const isShown = list.classList.toggle('show');
    if (btn.id === 'p2-btn') {
        btn.style.transform = isShown ? 'rotate(-90deg)' : 'rotate(0deg)';
    } else {
        btn.style.transform = isShown ? 'rotate(90deg)' : 'rotate(0deg)';
    }
}

p1Btn.addEventListener('click', () => toggleList(p1Btn, p1List));
p2Btn.addEventListener('click', () => toggleList(p2Btn, p2List));

// Handle selection from lists
document.querySelectorAll('.player-list li').forEach(item => {
    item.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const targetSpan = document.getElementById(targetId);
        if (targetSpan) {
            targetSpan.textContent = e.target.textContent;
        }
        // Hide list after selection
        e.target.parentElement.classList.remove('show');
        // Reset button rotation
        const btn = e.target.parentElement.id === 'p1-list' ? p1Btn : p2Btn;
        btn.style.transform = 'rotate(0deg)';
    });
});