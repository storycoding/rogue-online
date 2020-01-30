const mapTouchToKey = (playerId, position) => {
    const { x, y } = position;

    const zoom = 0.5; // zoom should be a dynamically controlled variable

    const tileSize = 100;
    const center = tileSize / 2;

    const moveThreshold = center * zoom; // how far from the center to register as a click

    const currentPlayerDiv = document.getElementById(playerId);
    if (!currentPlayerDiv) {
        return;
    }

    const playerX = (currentPlayerDiv.offsetLeft + center) * zoom;
    const playerY = (currentPlayerDiv.offsetTop + center) * zoom;

    const gapX = playerX - x;
    const gapY = playerY - y;

    const absoluteX = Math.abs(gapX);
    const AbsoluteY = Math.abs(gapY);

    let key;

    if (absoluteX > AbsoluteY) {
        if (absoluteX > moveThreshold) {
            key = gapX > 0 ? "ArrowLeft" : "ArrowRight";
        }
    } else if (absoluteX < AbsoluteY) {
        if (AbsoluteY > moveThreshold) {
            key = gapY > 0 ? "ArrowUp" : "ArrowDown";
        }
    }

    return key;
};

export default mapTouchToKey;
