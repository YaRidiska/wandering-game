function togglePlayerMenu() {
    const menu = document.getElementById('playerMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    updatePlayersList();
}

function updatePlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';

    players.forEach((player, index) => {
        const playerItem = document.createElement('div');
        playerItem.className = 'player-item';
        playerItem.innerHTML = `
            <div class="player-info-container">
                <div class="player-icon player${player.id}"></div>
                <span class="player-name">${player.name}</span>
                <button onclick="renamePlayer(${index})" class="rename-button">✏️</button>
            </div>
            <button onclick="removePlayer(${index})" class="delete-button">Удалить</button>
        `;
        playersList.appendChild(playerItem);
    });
}

function addPlayer() {
    let newId = 1;
    const usedIds = players.map(p => p.id);
    while (usedIds.includes(newId)) {
        newId++;
    }

    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    playerDiv.classList.add(`player${newId}`);

    const tooltip = document.createElement('div');
    tooltip.className = 'player-tooltip';
    document.body.appendChild(tooltip);

    playerDiv.addEventListener('mouseenter', function (e) {
        const player = players.find(p => p.element === this);
        if (player) {
            tooltip.textContent = player.name;
            tooltip.style.opacity = '1';

            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.top = rect.top - 30 + 'px';
        }
    });

    playerDiv.addEventListener('mouseleave', function () {
        tooltip.style.opacity = '0';
    });

    const newPlayer = {
        id: newId,
        element: playerDiv,
        name: `Игрок ${newId}`,
        score: 0
    };

    players.push(newPlayer);
    playerPositions.push(0);

    container.appendChild(playerDiv);

    // Переопределяем позиции всех игроков
    players.forEach((player, index) => {
        if (circles[playerPositions[index]]) {
            positionPlayerNearCircle(circles[playerPositions[index]], player.element, index);
        }
    });

    updatePlayersList();
    updatePlayerListCorner();
    updateCurrentPlayerDisplay();
    saveGameState();
}

function removePlayer(index) {
    const player = players[index];
    if (player.element && player.element.parentNode) {
        player.element.remove();
    }

    players.splice(index, 1);
    playerPositions.splice(index, 1);

    if (players.length === 0) {
        document.getElementById('currentPlayer').textContent = '';
        currentPlayerTurn = 0;
    } else if (currentPlayerTurn >= players.length) {
        currentPlayerTurn = 0;
    }

    if (circles.length > 0) {
        players.forEach((player, i) => {
            if (circles[playerPositions[i]]) {
                positionPlayerNearCircle(circles[playerPositions[i]], player.element, i);
            }
        });
    }

    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';
    if (players.length > 0) {
        players.forEach((player, idx) => {
            const playerItem = document.createElement('div');
            playerItem.className = 'player-item';
            playerItem.innerHTML = `
                <div class="player-info-container">
                    <div class="player-icon player${player.id}"></div>
                    <span class="player-name">${player.name}</span>
                    <button onclick="renamePlayer(${idx})" class="rename-button">✏️</button>
                </div>
                <button onclick="removePlayer(${idx})" class="delete-button">Удалить</button>
            `;
            playersList.appendChild(playerItem);
        });
    }

    updateCurrentPlayerDisplay();
    updatePlayerListCorner();
    saveGameState();
}

function renamePlayer(index) {
    const player = players[index];
    const newName = prompt('Введите новое имя игрока:', player.name);

    if (newName !== null && newName.trim() !== '') {
        player.name = newName.trim();
        updatePlayersList();
        updateCurrentPlayerDisplay();
        updatePlayerListCorner();
        saveGameState();
    }
}

window.togglePlayerMenu = togglePlayerMenu;
window.updatePlayersList = updatePlayersList;
window.addPlayer = addPlayer;
window.removePlayer = removePlayer;
window.renamePlayer = renamePlayer;