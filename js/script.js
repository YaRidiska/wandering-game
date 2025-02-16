window.addEventListener('load', () => {
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    const playerColors = {
        1: 'red', 2: 'blue', 3: 'green', 4: 'yellow',
        5: 'purple', 6: 'orange', 7: 'pink', 8: 'cyan',
        9: 'brown', 10: 'lime', 11: 'magenta', 12: 'firebrick',
        13: 'firebrick'
    };

    let css = '';
    for (let i = 1; i <= 13; i++) {
        const color = playerColors[i];
        css += `
            .player${i}, .player-icon.player${i}, .corner-player-icon.player${i} {
                background-image: url("images/${i}.png");
            }
            .player.player${i} {
                background-color: ${color};
                box-shadow: 0 0 15px 5px ${color}80;
            }
        `;
    }
    styleSheet.textContent = css;

    const savedState = localStorage.getItem('gameState');
    if (!savedState) {
        const baseState = {
            playerPositions: [0, 0, 0],
            currentPlayerTurn: 0,
            players: [
                { id: 1, name: 'Игрок 1', score: 0 },
                { id: 2, name: 'Игрок 2', score: 0 },
                { id: 3, name: 'Игрок 3', score: 0 }
            ]
        };
        localStorage.setItem('gameState', JSON.stringify(baseState));
    }

    loadGameState();
    createPath();
    initializeTooltips();
    updatePlayerListCorner();
    loadSettings();

    // Инициализация менеджера игроков
    initPlayerManager({
        container,
        circles,
        players,
        playerPositions,
        currentPlayerTurn,
        updateCurrentPlayerDisplay,
        updatePlayerListCorner,
        saveGameState,
        positionPlayerNearCircle,
        updateAllPlayerPositions
    });
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const savedTurn = currentPlayerTurn;
        createPath();
        currentPlayerTurn = savedTurn;
        updateCurrentPlayerDisplay();
    }, 250);
});