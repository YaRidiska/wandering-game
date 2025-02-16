let settings = {
    enableDuels: true,
    enableQuestions: true,
    enableBlitz: true,
    moveSpeed: "500",
    blitzCells: [14, 22, 30, 38, 64, 70, 75, 88],
    questionCells: [50, 53, 80, 86],
    duelCells: [29, 42, 25, 46]
};

const defaultSettings = {
    blitzCells: [14, 22, 30, 38, 64, 70, 75, 88],
    questionCells: [50, 53, 80, 86],
    duelCells: [29, 42, 25, 46],
    moveSpeed: "500"
};

function loadSettings() {
    const savedSettings = localStorage.getItem('gameSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    } else {
        localStorage.setItem('gameSettings', JSON.stringify(settings));
    }

    document.getElementById('enableDuels').checked = settings.enableDuels;
    document.getElementById('enableQuestions').checked = settings.enableQuestions;
    document.getElementById('enableBlitz').checked = settings.enableBlitz;
    document.getElementById('moveSpeed').value = settings.moveSpeed;
    document.getElementById('blitzCells').value = settings.blitzCells.join(', ');
    document.getElementById('questionCells').value = settings.questionCells.join(', ');
    document.getElementById('duelCells').value = settings.duelCells.join(', ');
}

function saveSettings() {
    settings.enableDuels = document.getElementById('enableDuels').checked;
    settings.enableQuestions = document.getElementById('enableQuestions').checked;
    settings.enableBlitz = document.getElementById('enableBlitz').checked;
    settings.moveSpeed = parseInt(document.getElementById('moveSpeed').value);
    settings.blitzCells = document.getElementById('blitzCells').value
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
    settings.questionCells = document.getElementById('questionCells').value
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
    settings.duelCells = document.getElementById('duelCells').value
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));
    localStorage.setItem('gameSettings', JSON.stringify(settings));
}

function toggleSettings() {
    const menu = document.getElementById('settingsMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    if (menu.style.display === 'flex') {
        loadSettings();
    } else {
        saveSettings();
    }
}

function resetToDefault(type) {
    switch (type) {
        case 'blitz':
            document.getElementById('blitzCells').value = defaultSettings.blitzCells.join(', ');
            settings.blitzCells = [...defaultSettings.blitzCells];
            break;
        case 'question':
            document.getElementById('questionCells').value = defaultSettings.questionCells.join(', ');
            settings.questionCells = [...defaultSettings.questionCells];
            break;
        case 'duel':
            document.getElementById('duelCells').value = defaultSettings.duelCells.join(', ');
            settings.duelCells = [...defaultSettings.duelCells];
            break;
    }
    saveSettings();
}

// Делаем настройки и функции доступными глобально
window.settings = settings;
window.loadSettings = loadSettings;
window.saveSettings = saveSettings;
window.toggleSettings = toggleSettings;
window.resetToDefault = resetToDefault; 