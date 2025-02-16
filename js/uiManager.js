function showModal(message) {
    return new Promise(resolve => {
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modal-text');
        const modalOk = document.getElementById('modal-ok');
        const modalCancel = document.getElementById('modal-cancel');
        modalText.innerHTML = message;
        modal.style.display = 'flex';

        modalOk.onclick = () => {
            modal.style.display = 'none';
            resolve(true);
        };

        modalCancel.onclick = () => {
            modal.style.display = 'none';
            resolve(false);
        };
    });
}

function updateCurrentPlayerDisplay() {
    const currentPlayer = players[currentPlayerTurn];
    document.getElementById('currentPlayer').textContent = currentPlayer ? currentPlayer.name : '';
}

function initializeTooltips() {
    document.querySelectorAll('.player-tooltip').forEach(t => t.remove());

    players.forEach(player => {
        const tooltip = document.createElement('div');
        tooltip.className = 'player-tooltip';
        document.body.appendChild(tooltip);

        player.element.addEventListener('mouseenter', function () {
            tooltip.textContent = player.name;
            tooltip.style.opacity = '1';

            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.top = rect.top - 30 + 'px';
        });

        player.element.addEventListener('mouseleave', function () {
            tooltip.style.opacity = '0';
        });
    });
}

function updatePlayerListCorner() {
    const container = document.getElementById('playerListContent');
    container.innerHTML = '';
    players.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'corner-player-item';
        const icon = document.createElement('div');
        icon.className = `corner-player-icon player${player.id}`;
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `${player.name} (${player.score})`;
        item.appendChild(icon);
        item.appendChild(nameSpan);
        container.appendChild(item);
    });
}

function togglePlayerList() {
    const list = document.getElementById('playerListContent');
    const btn = document.getElementById('togglePlayerList');
    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
        btn.textContent = "Скрыть список игроков";
    } else {
        list.style.display = 'none';
        btn.textContent = "Показать список игроков";
    }
}

window.showModal = showModal;
window.updateCurrentPlayerDisplay = updateCurrentPlayerDisplay;
window.initializeTooltips = initializeTooltips;
window.updatePlayerListCorner = updatePlayerListCorner;
window.togglePlayerList = togglePlayerList; 