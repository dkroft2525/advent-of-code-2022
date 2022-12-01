const fs = require("fs");

try {
    const inputArray = fs.readFileSync("input/1-1.txt").toString().split("\n");
    let chunkIndex = 0;
    const chunkedInput = inputArray.reduce((acc, item) => {
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        if (!item.trim().length) {
            chunkIndex++;
        } else {
            acc[chunkIndex].push(parseInt(item));
        }
        return acc;
    }, []);

    // Part 2
    const elfCalories = chunkedInput
        .map((val, index) => {
            return {
                elfId: index,
                calories: val.reduce((totalCal, c) => {
                    return totalCal + c;
                }, 0),
            };
        })
        .sort((a, b) => b.calories - a.calories);

    let top3 = 0;
    for (let i = 0; i < 3; i++) {
        top3 += elfCalories[i].calories;
    }

    // Part 1 Result
    console.log(`Part 1 results: ${elfCalories[0].calories} Calories`);
    // Part 2 Result
    console.log(`Part 2 results: ${top3} Calories`);
} catch (e) {
    console.error(e);
}
