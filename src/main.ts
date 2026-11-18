import './style.css';
import { PUZZLES, Puzzle } from './puzzles';

// State
let currentPuzzleIndex = 0;
let unlockedHintsCount = 0;

// DOM Elements
const briefingSection = document.getElementById('briefing-section') as HTMLElement;
const puzzleSection = document.getElementById('puzzle-section') as HTMLElement;
const successSection = document.getElementById('success-section') as HTMLElement;

function init() {
  renderBriefing();
}

function renderBriefing() {
  briefingSection.innerHTML = `
    <h2>AKTE: GEBURTSTAG 2026</h2>
    <p>Hallo Detektiv! Du wurdest auserwählt, eine geheimnisvolle Mission zu lösen.</p>
    <p>Vor dir liegt eine Reihe von Hinweisen (Clues), die dich Schritt für Schritt zum Ziel führen. Jeder Hinweis erfordert die richtige Antwort, um fortzufahren.</p>
    <p>Falls du feststeckst, kannst du Hinweise anfordern. Viel Erfolg!</p>
    <button id="start-btn" style="margin-top: 15px;">Ermittlung starten</button>
  `;

  document.getElementById('start-btn')?.addEventListener('click', () => {
    briefingSection.classList.add('hidden');
    puzzleSection.classList.remove('hidden');
    renderCurrentPuzzle();
  });
}

function renderCurrentPuzzle() {
  const puzzle: Puzzle = PUZZLES[currentPuzzleIndex];
  
  // Progress Bar HTML erzeugen
  const total = PUZZLES.length;
  let progressBarHtml = '<div class="progress-bar">';
  for (let i = 0; i < total; i++) {
    let cls = 'progress-step';
    if (i < currentPuzzleIndex) cls += ' completed';
    else if (i === currentPuzzleIndex) cls += ' active';
    progressBarHtml += `<div class="${cls}"></div>`;
  }
  progressBarHtml += '</div>';

  puzzleSection.innerHTML = `
    ${progressBarHtml}
    <div class="clue-meta">${puzzle.title} (Rätsel ${currentPuzzleIndex + 1} von ${total})</div>
    <div class="clue-question">${puzzle.question}</div>
    
    <div class="input-group">
      <input type="text" id="answer-input" placeholder="Antwort eingeben..." autocomplete="off" />
      <button id="submit-btn">Prüfen</button>
    </div>
    <div id="feedback" class="feedback"></div>

    <div class="hints-container">
      <button id="hint-btn" class="btn-secondary">Hinweis anfordern (${unlockedHintsCount}/${puzzle.hints.length})</button>
      <div id="hints-list" style="margin-top: 10px;">
        ${puzzle.hints.slice(0, unlockedHintsCount).map(h => `<div class="hint-box">💡 ${h}</div>`).join('')}
      </div>
    </div>
  `;

  // Event Listeners
  const inputEl = document.getElementById('answer-input') as HTMLInputElement;
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
  const hintBtn = document.getElementById('hint-btn') as HTMLButtonElement;

  inputEl.focus();

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  submitBtn.addEventListener('click', checkAnswer);

  hintBtn.addEventListener('click', () => {
    if (unlockedHintsCount < puzzle.hints.length) {
      unlockedHintsCount++;
      renderCurrentPuzzle();
    } else {
      const hintList = document.getElementById('hints-list');
      if (hintList) {
        const warning = document.createElement('div');
        warning.className = 'hint-box';
        warning.style.color = 'var(--danger-color)';
        warning.textContent = 'Keine weiteren Hinweise verfügbar!';
        hintList.appendChild(warning);
      }
    }
  });
}

function checkAnswer() {
  const inputEl = document.getElementById('answer-input') as HTMLInputElement;
  const feedbackEl = document.getElementById('feedback') as HTMLElement;
  const puzzle = PUZZLES[currentPuzzleIndex];

  const userVal = inputEl.value.trim().toLowerCase();

  if (!userVal) {
    feedbackEl.textContent = 'Bitte gib eine Antwort ein.';
    feedbackEl.className = 'feedback error';
    return;
  }

  // Prüfen gegen alle erlaubten Antworten
  const isCorrect = puzzle.answers.some(ans => ans.toLowerCase() === userVal);

  if (isCorrect) {
    feedbackEl.textContent = puzzle.successMessage;
    feedbackEl.className = 'feedback success';
    
    setTimeout(() => {
      currentPuzzleIndex++;
      unlockedHintsCount = 0; // Reset für nächstes Rätsel
      
      if (currentPuzzleIndex < PUZZLES.length) {
        renderCurrentPuzzle();
      } else {
        renderSuccess();
      }
    }, 1500);

  } else {
    feedbackEl.textContent = '❌ Das war leider nicht korrekt. Versuch es noch einmal!';
    feedbackEl.className = 'feedback error';
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
  }
}

function renderSuccess() {
  puzzleSection.classList.add('hidden');
  successSection.classList.remove('hidden');

  successSection.innerHTML = `
    <h2>AKTE ERFOLGREICH GESCHLOSSEN! 🎉</h2>
    <p>Herzlichen Glückwunsch! Du hast alle Hinweise erfolgreich entschlüsselt und den Fall geknackt.</p>
    <p style="font-size: 1.1rem; color: var(--accent-color); font-family: var(--font-heading);">Alles Gute zum Geburtstag! Auf viele weitere legendäre Kapitel.</p>
    <div style="margin-top: 25px; text-align: center;">
      <button onclick="location.reload()">Nochmal spielen</button>
    </div>
  `;
}

init();
