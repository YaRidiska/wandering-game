const container = document.getElementById('circles-container');
let circles = [];
let players = [
    { id: 1, element: document.getElementById('player1'), name: 'Игрок 1' },
    { id: 2, element: document.getElementById('player2'), name: 'Игрок 2' },
    { id: 3, element: document.getElementById('player3'), name: 'Игрок 3' }
];
let playerPositions = [0, 0, 0];
let currentPlayerTurn = 0;

const specialMoves = {
    5: 0, 8: 12, 13: 20, 15: 11, 19: 49,
    21: 67, 23: 6, 31: 3, 34: 59, 39: 35,
    48: 18, 60: 62, 63: 55, 65: 26, 71: 51,
    76: 17, 78: 47, 84: 87, 89: 64
};

function saveGameState() {
    const gameState = {
        playerPositions,
        currentPlayerTurn,
        players: players.map(p => ({
            id: p.id,
            name: p.name,
            score: p.score || 0
        }))
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);

        if (gameState.players) {
            players.forEach(p => p.element.remove());
            players = gameState.players.map(p => {
                const playerDiv = document.createElement('div');
                playerDiv.className = `player player${p.id}`;
                return {
                    id: p.id,
                    name: p.name,
                    score: p.score || 0,
                    element: playerDiv
                };
            });
        }

        playerPositions = gameState.playerPositions;
        currentPlayerTurn = gameState.currentPlayerTurn;

        players.forEach((player, index) => {
            if (circles[playerPositions[index]]) {
                positionPlayerNearCircle(circles[playerPositions[index]], player.element, index);
            }
        });

        updateCurrentPlayerDisplay();
    }
}

function resetGame() {
    if (!confirm('Вы уверены, что хотите начать новую игру?')) {
        return;
    }

    const gameState = {
        playerPositions: new Array(players.length).fill(0),
        currentPlayerTurn: 0,
        players: players.map(p => ({
            id: p.id,
            name: p.name,
            score: 0
        }))
    };

    localStorage.setItem('gameState', JSON.stringify(gameState));

    players.forEach(player => {
        if (player.element && player.element.parentNode) {
            player.element.remove();
        }
    });

    players = gameState.players.map(p => ({
        id: p.id,
        name: p.name,
        score: p.score || 0,
        element: (() => {
            const playerDiv = document.createElement('div');
            playerDiv.className = `player player${p.id}`;
            return playerDiv;
        })()
    }));

    playerPositions = gameState.playerPositions;
    currentPlayerTurn = gameState.currentPlayerTurn;

    createPath();
    initializeTooltips();
}

// Делаем переменные и функции доступными глобально
window.container = container;
window.circles = circles;
window.players = players;
window.playerPositions = playerPositions;
window.currentPlayerTurn = currentPlayerTurn;
window.specialMoves = specialMoves;
window.saveGameState = saveGameState;
window.loadGameState = loadGameState;
window.resetGame = resetGame; 