// 4x5 Grid Daten exakt aus dem Screenshot von cluesbysam.com
// Kette: A3 -> D3 -> A4, A5 -> B2 -> B1 -> C2, C3 -> B3, D5 -> C5 -> B4 -> D4 -> D1, D2 -> C4 -> C1 -> A1 -> A2 -> B5
const GRID_DATA = [
  // Spalte A
  { id: 'A1', name: 'Johanna', job: 'builder', role: 'innocent', clue: 'I bet the thief is a cold fish', clueType: 'joke', avatar: '👷' },
  { id: 'A2', name: 'Arthur', job: 'baby', role: 'innocent', clue: 'The thief is slippery as an eel!', clueType: 'joke', avatar: '👷' },
  { id: 'A3', name: 'A3', job: 'builder', role: 'innocent', clue: 'Quita (D3) ist eine von 3 Grünen in Reihe 3', clueType: 'logic', avatar: '👷' },
  { id: 'A4', name: 'Claudia Roth', job: 'Grüne', role: 'innocent', clue: 'Einer der 2 Roten neben Hilda (C2) befindet sich am Rand', clueType: 'logic', avatar: '🎤' },
  { id: 'A5', name: 'Fanny', job: 'singer', role: 'innocent', clue: 'Someone stole my pet fish!', clueType: 'joke', avatar: '🎤' },

  // Spalte B
  { id: 'B1', name: 'B1', job: 'judge', role: 'innocent', clue: 'Einer der 2 Roten am Rand ist mein Nachbar', clueType: 'logic', avatar: '⚖️' },
  { id: 'B2', name: 'Harry', job: 'pawn', role: 'innocent', clue: 'Einer der 2 Roten neben mir ist der Nachbar von Berat (B1)', clueType: 'logic', avatar: '👷' },
  { id: 'B3', name: 'Annegret', job: 'singer', role: 'innocent', clue: 'Was it a red herring by any chance?', clueType: 'joke', avatar: '🎤' },
  { id: 'B4', name: 'Klaus', job: 'singer', role: 'criminal', clue: 'Es gibt genauso viele grüne Coder wie grüne Richter', clueType: 'logic', avatar: '🎤' },
  { id: 'B5', name: 'Michi', job: 'coder', role: 'criminal', clue: 'Will you let me off the hook if I give it back?', clueType: 'joke', avatar: '💻' },

  // Spalte C
  { id: 'C1', name: 'Barbara Salesch', job: 'judge', role: 'criminal', clue: 'Don\'t you have bigger fish to fry?', clueType: 'joke', avatar: '⚖️' },
  { id: 'C2', name: 'Pizzabote', job: 'pilot', role: 'innocent', clue: 'Einer der 2 Roten in Spalte C ist in Reihe 3', clueType: 'logic', avatar: '👩‍🏫' },
  { id: 'C3', name: 'Martin Luther', job: 'teacher', role: 'criminal', clue: 'Zoya (D5) ist eine von Yusefs (C5) 3 grünen Nachbarn', clueType: 'logic', avatar: '👩‍🏫' },
  { id: 'C4', name: 'Tobi', job: 'coder', role: 'innocent', clue: 'There are plenty of fish in the sea, but only a handful of criminals!', clueType: 'joke', avatar: '💻' },
  { id: 'C5', name: 'Niklas', job: 'coder', role: 'innocent', clue: 'Es gibt eine ungerade Anzahl von Roten in Reihe 1', clueType: 'logic', avatar: '💻' },

  // Spalte D
  { id: 'D1', name: 'D1', job: 'judge', role: 'innocent', clue: 'Quita (D3) hat mindestens 3 grüne Nachbarn', clueType: 'logic', avatar: '⚖️' },
  { id: 'D2', name: 'D2', job: 'judge', role: 'innocent', clue: 'You\'re slowly reeling them in...', clueType: 'joke', avatar: '⚖️' },
  { id: 'D3', name: 'Daniel', job: 'teacher', role: 'innocent', clue: 'Es gibt 2 Grüne unter Kumar (A3)', clueType: 'logic', avatar: '👩‍🏫' },
  { id: 'D4', name: 'Sophie', job: 'teacher', role: 'innocent', clue: 'Es gibt genau 2 Grüne links von Emma (D1)', clueType: 'logic', avatar: '👩‍🏫' },
  { id: 'D5', name: 'Micha', job: 'coder', role: 'innocent', clue: 'We\'d better cast a wide net to catch the thief...', clueType: 'joke', avatar: '💻' }
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
  'A2': 11,
  'D2': 12,
  'C4': 12,
  'C1': 12,
  'A1': 12,
  'B5': 12
};

let currentStep = 2;
let playerSelections = {
  'A3': 'innocent'
};
let cardCircles = {}; // { 'A1': { left: '', right: '' }, ... }
let clueDimmed = {}; // { 'A3': true, ... }
let activeCardId = null;
let activeColorPicker = null;

const COLOR_PALETTE = [
  { name: 'Zurücksetzen', value: '' },
  { name: 'Grün', value: '#26af5f' },
  { name: 'Rot', value: '#c0392b' },
  { name: 'Gelb (Entweder-oder)', value: '#f1c40f' },
  { name: 'Blau', value: '#3498db' },
  { name: 'Lila', value: '#9b59b6' },
  { name: 'Orange', value: '#e67e22' }
];

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
  cardCircles = {};
  clueDimmed = {};
  currentStep = 2;
  modalFeedback.textContent = '';
  closeColorPicker();
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
      closeColorPicker();
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
    const circles = cardCircles[person.id] || { left: '', right: '' };

    const card = document.createElement('div');
    card.className = 'suspect-card';

    if (selection === 'innocent') card.classList.add('status-innocent');
    if (selection === 'criminal') card.classList.add('status-criminal');

    let clueHtml = '';
    if (isSolved) {
      const isDimmed = clueDimmed[person.id] ? ' dimmed' : '';
      const clueClass = person.clueType === 'joke' ? `card-clue joke${isDimmed}` : `card-clue${isDimmed}`;
      clueHtml = `
        <div class="${clueClass}">
          "${person.clue}"
        </div>
      `;
    }

    card.innerHTML = `
      <div class="card-header">
        <span class="card-id">${person.id}</span>
        <span class="card-avatar">${person.avatar}</span>
      </div>
      <div class="card-body">
        <div class="name-container">
          <div class="color-circle left-circle" data-card-id="${person.id}" data-side="left" style="background-color: ${circles.left || 'transparent'};"></div>
          <div class="name-info">
            <div class="card-name">${person.name}</div>
            <div class="card-job">${person.job}</div>
          </div>
          <div class="color-circle right-circle" data-card-id="${person.id}" data-side="right" style="background-color: ${circles.right || 'transparent'};"></div>
        </div>
      </div>
      ${clueHtml}
    `;

    // Kreis-Klicks abfangen (öffnen Farb-Picker)
    card.querySelectorAll('.color-circle').forEach(circleEl => {
      circleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openColorPicker(circleEl, person.id, circleEl.dataset.side);
      });
    });

    // Hinweis-Klick zum Ausgrauen (Dimmen)
    const clueEl = card.querySelector('.card-clue');
    if (clueEl) {
      clueEl.addEventListener('click', (e) => {
        e.stopPropagation();
        clueDimmed[person.id] = !clueDimmed[person.id];
        renderGrid();
      });
    }

    card.addEventListener('click', () => {
      if (isSolved) return;
      openModal(person.id);
    });

    gridContainer.appendChild(card);
  });
}

function openColorPicker(circleElement, cardId, side) {
  closeColorPicker();

  const popover = document.createElement('div');
  popover.className = 'color-picker-popover';

  COLOR_PALETTE.forEach(col => {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    if (col.value === '') {
      swatch.classList.add('clear-swatch');
    } else {
      swatch.style.backgroundColor = col.value;
    }
    swatch.title = col.name;

    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!cardCircles[cardId]) {
        cardCircles[cardId] = { left: '', right: '' };
      }
      cardCircles[cardId][side] = col.value;
      closeColorPicker();
      renderGrid();
    });

    popover.appendChild(swatch);
  });

  const rect = circleElement.getBoundingClientRect();
  popover.style.top = `${rect.bottom + window.scrollY + 5}px`;
  popover.style.left = `${rect.left + window.scrollX - 45}px`;

  document.body.appendChild(popover);
  activeColorPicker = popover;

  setTimeout(() => {
    window.addEventListener('click', handleOutsideClick);
  }, 10);
}

function closeColorPicker() {
  if (activeColorPicker) {
    activeColorPicker.remove();
    activeColorPicker = null;
    window.removeEventListener('click', handleOutsideClick);
  }
}

function handleOutsideClick(e) {
  if (activeColorPicker && !activeColorPicker.contains(e.target)) {
    closeColorPicker();
  }
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
    modalFeedback.textContent = '⚠️ Das kann man so nicht sagen!';
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
