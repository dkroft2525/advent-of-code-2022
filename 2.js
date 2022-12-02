const fs = require("fs");

const elfShapes = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
};

const playerShapes = {
    X: 1, // Rock
    Y: 2, // Paper
    Z: 3, // Scissors
};

const getWinningPoints = (playerShape, elfShape) => {
    if (aWon(playerShape, elfShape)) return 6; // Player wins
    if (aWon(elfShape, playerShape)) return 0; // Elf wins
    return 3; // Draw
};

const aWon = (a, b) => {
    return (
        (a === 1 && b === 3) || // Rock > Scissors
        (a === 2 && b === 1) || // Paper > Rock
        (a === 3 && b === 2) // Scissors > Paper
    );
};

try {
    const inputArray = fs.readFileSync("input/2-1.txt").toString().split("\n");
    const totalPoints = inputArray.reduce((acc, item) => {
        const [elf, player] = item.split(" ");
        acc += getWinningPoints(playerShapes[player], elfShapes[elf]);
        acc += playerShapes[player];
        return acc;
    }, 0);
    console.log(totalPoints);
} catch (e) {
    console.error(e);
}
