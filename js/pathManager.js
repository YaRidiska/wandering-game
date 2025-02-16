// Координаты пути
const pathCoordinates = [
    { x: 30, y: 1180 },
    { x: 120, y: 1195 },
    { x: 240, y: 1195 },
    { x: 360, y: 1195 },
    { x: 480, y: 1195 },
    { x: 600, y: 1195 },
    { x: 720, y: 1195 },
    { x: 840, y: 1195 },
    { x: 940, y: 1200 },
    { x: 1080, y: 1195 },
    { x: 1200, y: 1195 },
    { x: 1320, y: 1195 },
    { x: 1440, y: 1195 },
    { x: 1560, y: 1195 },
    { x: 1680, y: 1195 },
    { x: 1800, y: 1195 },
    { x: 1800, y: 1090 },
    { x: 1790, y: 980 },
    { x: 1670, y: 980 },
    { x: 1550, y: 1010 },
    { x: 1320, y: 980 },
    { x: 1200, y: 980 },
    { x: 1080, y: 980 },
    { x: 960, y: 980 },
    { x: 840, y: 980 },
    { x: 720, y: 980 },
    { x: 590, y: 1000 },
    { x: 480, y: 980 },
    { x: 340, y: 980 },
    { x: 125, y: 980 },
    { x: 125, y: 880 },
    { x: 135, y: 785 },
    { x: 250, y: 770 },
    { x: 350, y: 770 },
    { x: 480, y: 770 },
    { x: 600, y: 770 },
    { x: 720, y: 770 },
    { x: 840, y: 770 },
    { x: 960, y: 770 },
    { x: 1080, y: 770 },
    { x: 1210, y: 780 },
    { x: 1330, y: 780 },
    { x: 1440, y: 770 },
    { x: 1560, y: 770 },
    { x: 1680, y: 770 },
    { x: 1800, y: 770 },
    { x: 1790, y: 670 },
    { x: 1780, y: 570 },
    { x: 1660, y: 570 },
    { x: 1540, y: 570 },
    { x: 1420, y: 570 },
    { x: 1300, y: 570 },
    { x: 1080, y: 570 },
    { x: 950, y: 570 },
    { x: 825, y: 570 },
    { x: 720, y: 570 },
    { x: 600, y: 570 },
    { x: 480, y: 570 },
    { x: 360, y: 570 },
    { x: 240, y: 570 },
    { x: 125, y: 570 },
    { x: 125, y: 370 },
    { x: 240, y: 370 },
    { x: 360, y: 370 },
    { x: 480, y: 370 },
    { x: 580, y: 330 },
    { x: 720, y: 370 },
    { x: 840, y: 370 },
    { x: 1080, y: 370 },
    { x: 1190, y: 370 },
    { x: 1300, y: 370 },
    { x: 1440, y: 370 },
    { x: 1560, y: 370 },
    { x: 1680, y: 370 },
    { x: 1790, y: 370 },
    { x: 1780, y: 250 },
    { x: 1800, y: 160 },
    { x: 1680, y: 160 },
    { x: 1550, y: 160 },
    { x: 1420, y: 160 },
    { x: 1290, y: 160 },
    { x: 1160, y: 160 },
    { x: 1050, y: 160 },
    { x: 930, y: 160 },
    { x: 820, y: 160 },
    { x: 695, y: 160 },
    { x: 590, y: 160 },
    { x: 470, y: 160 },
    { x: 350, y: 160 },
    { x: 260, y: 160 },
    { x: 140, y: 45 }
];

function createPath() {
    const circleSize = 50;
    container.innerHTML = '';
    circles = [];

    const savedPositions = [...playerPositions];
    const savedTurn = currentPlayerTurn;

    players.forEach(player => container.appendChild(player.element));

    let maxY = 0;

    pathCoordinates.forEach((coord, i) => {
        const circle = document.createElement('div');
        circle.className = 'circle';

        circle.style.left = `${coord.x}px`;
        circle.style.top = `${coord.y}px`;

        const hue = (i / pathCoordinates.length) * 360;
        circle.style.backgroundColor = `hsl(${hue}, 70%, 50%)`;

        container.appendChild(circle);
        circles.push({
            element: circle,
            x: coord.x,
            y: coord.y
        });

        maxY = Math.max(maxY, coord.y);
    });

    container.style.height = `${maxY + circleSize * 3}px`;

    playerPositions = savedPositions;
    currentPlayerTurn = savedTurn;

    players.forEach((player, index) => {
        if (circles[playerPositions[index]]) {
            positionPlayerNearCircle(circles[playerPositions[index]], player.element, index);
        }
    });

    updateCurrentPlayerDisplay();
}

function positionPlayerNearCircle(circle, playerElement, playerIndex) {
    const radius = 40;
    const totalPlayers = players.length;
    const circleSize = 40;

    const angleInDegrees = -90 + (360 / totalPlayers) * playerIndex;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    const x = circle.x + (circleSize / 2) + radius * Math.cos(angleInRadians);
    const y = circle.y + (circleSize / 2) + radius * Math.sin(angleInRadians);

    playerElement.style.left = `${x - 20}px`;
    playerElement.style.top = `${y - 20}px`;
}

window.createPath = createPath;
window.positionPlayerNearCircle = positionPlayerNearCircle; 