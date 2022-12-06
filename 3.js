const fs = require("fs");

const getPriority = (char) => {
    const lowerOffset = "a".charCodeAt(0) - 1;
    const upperOffset = "A".charCodeAt(0) - 27;
    return char.toUpperCase() === char
        ? char.charCodeAt(0) - upperOffset
        : char.charCodeAt(0) - lowerOffset;
};

const splitString = (st) => {
    return [
        st.substring(0, st.length / 2).split(""),
        st.substring(st.length / 2).split(""),
    ];
};

try {
    const inputArray = fs.readFileSync("input/3-1.txt").toString().split("\n");
    // Part 1
    const duplicatedItems = inputArray.map((st) => {
        const rucksack = splitString(st);
        const duplicatedItem = rucksack[0].find((e) => rucksack[1].includes(e));
        return duplicatedItem;
    });

    const result1 = duplicatedItems.reduce((acc, item) => {
        acc += getPriority(item);
        return acc;
    }, 0);

    // Part 2
    const rucksacks = inputArray.map((st) => st.split(""));
    const badges = [];
    for (let i = 0; i < rucksacks.length; i += 3) {
        const duplicatedItem = rucksacks[i].find(
            (e) => rucksacks[i + 1].includes(e) && rucksacks[i + 2].includes(e)
        );
        badges.push(duplicatedItem);
    }

    const result2 = badges.reduce((acc, item) => {
        acc += getPriority(item);
        return acc;
    }, 0);

    console.log(result1, result2);
} catch (e) {
    console.error(e);
}
