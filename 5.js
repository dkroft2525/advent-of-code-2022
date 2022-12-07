const fs = require("fs");

const numStacks = 9;

const getStacksMoves = (inputArray) => {
    const [moves, stacks] = inputArray.reduce(
        (acc, line) => {
            if (line.indexOf("move") > -1) {
                acc[0].push(line);
            } else {
                for (let i = 0; i < numStacks; i++) {
                    if (!acc[1][i]) {
                        acc[1][i] = [];
                    }
                    const char = line.charAt(i * 4 + 1);
                    if (char.trim().length) {
                        acc[1][i].push(char);
                    }
                }
            }
            return acc;
        },
        [[], []]
    );
    stacks.forEach((stack) => {
        stack.reverse();
    });
    return [moves, stacks];
};

const moveItems = (stacks, move) => {
    const [, numItems, , from, , to] = move.split(" ");
    for (let i = 0; i < parseInt(numItems); i++) {
        const item = stacks[parseInt(from) - 1].pop();
        stacks[parseInt(to) - 1].push(item);
    }
};

try {
    const inputArray = fs.readFileSync("input/5-1.txt").toString().split("\n");
    const [moves, stacks] = getStacksMoves(inputArray);
    moves.forEach((move) => {
        moveItems(stacks, move);
    });
    const result = stacks.reduce((acc, stack) => {
        return `${acc}${stack[stack.length - 1]}`;
    }, "");
    console.log(result);
} catch (e) {
    console.error(e);
}
