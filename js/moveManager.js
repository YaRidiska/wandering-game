async function movePlayer() {
    const steps = parseInt(document.getElementById('stepsInput').value);
    if (isNaN(steps) || steps < 1) return;

    const currentPosition = playerPositions[currentPlayerTurn];
    let targetPosition = Math.min(currentPosition + steps, circles.length - 1);

    for (let i = currentPosition + 1; i <= targetPosition; i++) {
        const circle = circles[i];
        positionPlayerNearCircle(circle, players[currentPlayerTurn].element, currentPlayerTurn);
        await new Promise(resolve => setTimeout(resolve, settings.moveSpeed));
    }

    if (specialMoves.hasOwnProperty(targetPosition)) {
        const newPosition = specialMoves[targetPosition];

        const shouldMove = await showModal(`Вы попали на клетку ${targetPosition}! 
            Перемещаемся на клетку ${specialMoves[targetPosition]}`);

        if (shouldMove) {
            const finalCircle = circles[newPosition];
            positionPlayerNearCircle(finalCircle, players[currentPlayerTurn].element, currentPlayerTurn);
            playerPositions[currentPlayerTurn] = newPosition;
            targetPosition = newPosition;
        }
    }

    playerPositions[currentPlayerTurn] = targetPosition;
    players[currentPlayerTurn].score = targetPosition;
    updatePlayerListCorner();

    if (settings.enableBlitz && settings.blitzCells.includes(targetPosition)) {
        await showModal("БЛИЦ<br>Если вы отвечаете правильно хоть на один вопрос, то идёте вперёд на 1 клетку");
    }

    if (settings.enableQuestions && settings.questionCells.includes(targetPosition)) {
        await showModal("ВОПРОС<br>За правильный ответ +2, за неправильный -1");
    }

    if (settings.enableDuels && settings.duelCells.includes(targetPosition)) {
        await showModal("ДУЭЛЬ<br>Выберите противника");
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    currentPlayerTurn = (currentPlayerTurn + 1) % players.length;
    updateCurrentPlayerDisplay();
    document.getElementById('stepsInput').value = '';
    updatePlayerListCorner();
    saveGameState();
}

async function movePlayerBackward() {
    const steps = parseInt(document.getElementById('stepsInput').value);
    if (isNaN(steps) || steps < 1) return;

    const currentPosition = playerPositions[currentPlayerTurn];
    let targetPosition = Math.max(currentPosition - steps, 0);

    for (let i = currentPosition - 1; i >= targetPosition; i--) {
        const circle = circles[i];
        positionPlayerNearCircle(circle, players[currentPlayerTurn].element, currentPlayerTurn);
        await new Promise(resolve => setTimeout(resolve, settings.moveSpeed));
    }

    playerPositions[currentPlayerTurn] = targetPosition;
    players[currentPlayerTurn].score = targetPosition;
    updatePlayerListCorner();


    await new Promise(resolve => setTimeout(resolve, 500));
    currentPlayerTurn = (currentPlayerTurn + 1) % players.length;
    updateCurrentPlayerDisplay();
    document.getElementById('stepsInput').value = '';
    updatePlayerListCorner();
    saveGameState();
}

function setSteps(value) {
    document.getElementById('stepsInput').value = value;
}

function skipTurn() {
    currentPlayerTurn = (currentPlayerTurn + 1) % players.length;
    updateCurrentPlayerDisplay();
    document.getElementById('stepsInput').value = '';
    saveGameState();
}

// Делаем функции доступными глобально
window.movePlayer = movePlayer;
window.movePlayerBackward = movePlayerBackward;
window.setSteps = setSteps;
window.skipTurn = skipTurn; 