const fs = require("fs");

const isStartOfPacket = (chars) => {
    return chars.length === new Set(chars).size;
};

const getStart = (inputArray, markerLength) => {
    let i = markerLength;
    while (
        i < inputArray.length &&
        !isStartOfPacket(inputArray.slice(i - markerLength, i))
    ) {
        i++;
    }
    return i;
};

try {
    const inputArray = fs.readFileSync("input/6-1.txt").toString().split("");
    const part1Result = getStart(inputArray, 4);
    const part2Result = getStart(inputArray, 14);

    console.log(
        `Part 1 result: ${part1Result} | Part 2 result: ${part2Result}`
    );
} catch (e) {
    console.error(e);
}
