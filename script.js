// 4x5 Grid Daten exakt aus dem Screenshot von cluesbysam.com
// Kette: A3 -> D3 -> A4, A5 -> B2 -> B1 -> C2, C3 -> B3, D5 -> C5 -> B4 -> D4 -> D1, D2 -> C4 -> C1 -> A1 -> A2 -> B5
const GRID_DATA = [
  // Spalte A
  { id: 'A1', name: 'Johanna', job: 'builder', role: 'innocent', clue: 'I bet the thief is a cold fish', avatar: '👷' },
  { id: 'A2', name: 'Arthur', job: 'baby', role: 'innocent', clue: 'The thief is slippery as an eel!', avatar: '👷' },
  { id: 'A3', name: 'A3', job: 'builder', role: 'innocent', clue: 'Quita (D3) is one of 3 innocents in row 3', avatar: '👷' },
  { id: 'A4', name: 'A4', job: 'singer', role: 'innocent', clue: '1 of the 2 criminals neighboring Hilda (C2) is on the edges', avatar: '🎤' },
  { id: 'A5', name: 'Fanny', job: 'singer', role: 'innocent', clue: 'Someone stole my pet fish!', avatar: '🎤' },

  // Spalte B
  { id: 'B1', name: 'B1', job: 'judge', role: 'innocent', clue: '1 of the 2 criminals on the edges is my neighbor', avatar: '⚖️' },
  { id: 'B2', name: 'Harry', job: 'pawn', role: 'innocent', clue: '1 of the 2 criminals neighboring me is Berat\'s (B1) neighbor', avatar: '👷' },
  { id: 'B3', name: 'Annegret', job: 'singer', role: 'innocent', clue: 'Was it a red herring by any chance?', avatar: '🎤' },
  { id: 'B4', name: 'Klaus', job: 'singer', role: 'criminal', clue: 'There are as many innocent coders as there are innocent judges', avatar: '🎤' },
  { id: 'B5', name: 'Michi', job: 'coder', role: 'criminal', clue: 'Will you let me off the hook if I give it back?', avatar: '💻' },

  // Spalte C
  { id: 'C1', name: 'Barbara Salesch', job: 'judge', role: 'criminal', clue: 'Don\'t you have bigger fish to fry?', avatar: '⚖️' },
  { id: 'C2', name: 'Pizzabote', job: 'pilot', role: 'innocent', clue: '1 of the 2 criminals in column C is in row 3', avatar: '👩‍🏫' },
  { id: 'C3', name: 'Martin Luther', job: 'teacher', role: 'criminal', clue: 'Zoya D5 is one of Yusef\'s C5 3 innocent neighbors', avatar: '👩‍🏫' },
  { id: 'C4', name: 'Tobi', job: 'coder', role: 'innocent', clue: 'There are plenty of fish in the sea, but only a handful of criminals!', avatar: '💻' },
  { id: 'C5', name: 'Niklas', job: 'coder', role: 'innocent', clue: 'There\'s an odd number of criminals in row 1', avatar: '💻' },

  // Spalte D
  { id: 'D1', name: 'D1', job: 'judge', role: 'innocent', clue: 'Quita (D3) has at least 3 innocent neighbors', avatar: '⚖️' },
  { id: 'D2', name: 'D2', job: 'judge', role: 'innocent', clue: 'You\'re slowly reeling them in...', avatar: '⚖️' },
  { id: 'D3', name: 'Daniel', job: 'teacher', role: 'innocent', clue: 'There are 2 innocents below Kumar (A3)', avatar: '👩‍🏫' },
  { id: 'D4', name: 'Sophie', job: 'teacher', role: 'innocent', clue: 'There are exactly 2 innocents to the left of Emma D1', avatar: '👩‍🏫' },
  { id: 'D5', name: 'Micha', job: 'coder', role: 'innocent', clue: 'We\'d better cast a wide net to catch the thief...', avatar: '💻' }
];

const STEP_REQUIREMENTS = {
  'A3': 1,
  'D3': 2,
  'A4': 3,
  'A5': 3,
  'B2': 4,
  'B1': 5,
  'C2': 6,
  'C3': 6,
  'B3': 7,
  'D5': 7,
  'C5': 8,
  'B4': 9,
  'D4': 10,
  'D1': 11,
  'D2': 11,
  'C4': 12,
  'C1': 13,
  'A1': 14,
  'A2': 15,
  'B5': 16
};

let currentStep = 2;
let playerSelections = {
  'A3': 'innocent'
};
let activeCardId = null;

// DOM Elements
const gridContainer = document.getElementById('grid-container');
const actionModal = document.getElementById('action-modal');
const modalFeedback = document.getElementById('modal-feedback');
const successModal = document.getElementById('success-modal');
const successStats = document.getElementById('success-stats');

function initGame() {
  playerSelections = {
    'A3': 'innocent'
  };
  currentStep = 2;
  modalFeedback.textContent = '';
  renderGrid();

  // Event Listeners
  document.getElementById('btn-innocent').addEventListener('click', () => makeSelection('innocent'));
  document.getElementById('btn-criminal').addEventListener('click', () => makeSelection('criminal'));

  // Modal schließen bei Klick auf den Hintergrund
  actionModal.addEventListener('click', (e) => {
    if (e.target === actionModal) {
      closeModal();
    }
  });

  // Modal schließen bei ESC-Taste
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  document.getElementById('restart-game-btn').addEventListener('click', () => {
    successModal.classList.add('hidden');
    initGame();
  });
}

function renderGrid() {
  gridContainer.innerHTML = '';

  const sortedData = [...GRID_DATA].sort((a, b) => {
    const rowA = a.id[1];
    const rowB = b.id[1];
    if (rowA !== rowB) return rowA.localeCompare(rowB);
    return a.id[0].localeCompare(b.id[0]);
  });

  sortedData.forEach(person => {
    const selection = playerSelections[person.id];
    const isSolved = (selection === person.role);

    const card = document.createElement('div');
    card.className = 'suspect-card';

    if (selection === 'innocent') card.classList.add('status-innocent');
    if (selection === 'criminal') card.classList.add('status-criminal');

    let clueText = '';
    let clueClass = 'card-clue';
    if (isSolved) {
      clueText = `"${person.clue}"`;
    } else {
      clueText = '🔒 Clue locked';
      clueClass += ' locked';
    }

    card.innerHTML = `
      <div class="card-header">
        <span class="card-id">${person.id}</span>
        <span class="card-avatar">${person.avatar}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${person.name}</div>
        <div class="card-job">${person.job}</div>
      </div>
      <div class="${clueClass}">
        ${clueText}
      </div>
    `;

    card.addEventListener('click', () => {
      if (isSolved) return;
      openModal(person.id);
    });

    gridContainer.appendChild(card);
  });
}

function openModal(id) {
  activeCardId = id;
  modalFeedback.textContent = '';
  actionModal.classList.remove('hidden');
}

function closeModal() {
  actionModal.classList.add('hidden');
  activeCardId = null;
  modalFeedback.textContent = '';
}

function makeSelection(status) {
  if (!activeCardId) return;

  const person = GRID_DATA.find(p => p.id === activeCardId);

  if (activeCardId === 'A3') {
    modalFeedback.textContent = '🔒 Start-Hinweis ist fix!';
    modalFeedback.className = 'modal-feedback error';
    return;
  }

  const requiredStep = STEP_REQUIREMENTS[activeCardId];
  const isCorrectRole = (status === person.role);
  const isStepReached = (requiredStep <= currentStep);

  if (isCorrectRole && isStepReached) {
    playerSelections[activeCardId] = status;
    modalFeedback.textContent = '✅ Richtig!';
    modalFeedback.className = 'modal-feedback success';

    const stepItems = GRID_DATA.filter(p => STEP_REQUIREMENTS[p.id] === currentStep);
    const allStepSolved = stepItems.every(p => playerSelections[p.id] === p.role);
    if (allStepSolved) {
      currentStep++;
    }

    setTimeout(() => {
      closeModal();
      renderGrid();
      checkWinCondition();
    }, 800);

  } else {
    modalFeedback.textContent = '⚠️ Not enough evidence!';
    modalFeedback.className = 'modal-feedback error';
  }
}

function checkWinCondition() {
  const total = GRID_DATA.length;
  const correctCount = Object.keys(playerSelections).filter(id => {
    const p = GRID_DATA.find(item => item.id === id);
    return p && playerSelections[id] === p.role;
  }).length;

  if (correctCount === total) {
    successModal.classList.remove('hidden');
  }
}

initGame();
