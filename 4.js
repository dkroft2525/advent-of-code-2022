const fs = require("fs");

const getSectionNumbers = (st) => {
    return [
        st.substring(0, st.indexOf("-")),
        st.substring(st.indexOf("-") + 1),
    ];
};

const getInts = (a, b) => {
    a[0] = parseInt(a[0]);
    a[1] = parseInt(a[1]);
    b[0] = parseInt(b[0]);
    b[1] = parseInt(b[1]);
    return [a, b];
};

const sectionFullyContained = (a, b) => {
    [a, b] = getInts(a, b);
    return a[0] >= b[0] && a[0] <= b[1] && a[1] >= b[0] && a[1] <= b[1];
};

const sectionContained = (a, b) => {
    [a, b] = getInts(a, b);
    return (a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]);
};

try {
    const inputArray = fs.readFileSync("input/4-1.txt").toString().split("\n");
    const fullContainedSections = inputArray.reduce(
        (acc, st, i) => {
            const firstSections = getSectionNumbers(
                st.substring(0, st.indexOf(","))
            );
            const secondSections = getSectionNumbers(
                st.substring(st.indexOf(",") + 1)
            );

            if (
                sectionFullyContained(firstSections, secondSections) ||
                sectionFullyContained(secondSections, firstSections)
            ) {
                acc[0] += 1;
            }
            if (
                sectionContained(firstSections, secondSections) ||
                sectionContained(secondSections, firstSections)
            ) {
                acc[1] += 1;
            }
            return acc;
        },
        [0, 0]
    ); // [part1, part2]

    console.log(
        `Part 1: ${fullContainedSections[0]}, Part 2: ${fullContainedSections[1]}`
    );
} catch (e) {
    console.error(e);
}
