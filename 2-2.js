const fs = require("fs");

const shapes = {
    A: { points: 1, loseTo: 3, winTo: 2}, // Rock
    B: { points: 2, loseTo: 1, winTo: 3}, // Paper
    C: { points: 3, loseTo: 2, winTo: 1}, // Scissors
};

const victoryPointMap = {
    X: 0, // Lose
    Y: 3, // Draw
    Z: 6, // Win
};

const getPlayedShapeValue = (elfShape, victoryPoints) => {
    if(victoryPoints === 3) return elfShape.points; // Draw
    if(victoryPoints === 0) return elfShape.loseTo; // Lose
    return elfShape.winTo; // Win
};

try {
    const inputArray = fs.readFileSync("input/2-1.txt").toString().split("\n");
    const totalPoints = inputArray.reduce((acc, item) => {
        const [elf, victoryPoints] = item.split(" ");
        acc += getPlayedShapeValue(shapes[elf], victoryPointMap[victoryPoints]);
        acc += victoryPointMap[victoryPoints];
        return acc;
    }, 0);
    console.log(totalPoints);
} catch (e) {
    console.error(e);
}
