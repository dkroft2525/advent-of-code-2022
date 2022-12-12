const fs = require("fs");

const isVisible = (trees, { tRow, tCol }) => {
    const tree = trees[tRow][tCol];
    const visible = trees.reduce(
        (acc, currentRow, r) => {
            if (currentRow[tCol] >= tree) {
                if (r < tRow) {
                    acc.top = false;
                }
                if (r > tRow) {
                    acc.bottom = false;
                }
            }
            if (r === tRow) {
                currentRow.forEach((t, c) => {
                    if (t >= tree) {
                        if (c < tCol) {
                            acc.left = false;
                        }
                        if (c > tCol) {
                            acc.right = false;
                        }
                    }
                });
            }
            return acc;
        },
        {
            top: true,
            bottom: true,
            left: true,
            right: true,
        }
    );
    const isVisible =
        visible.top || visible.bottom || visible.left || visible.right;
    return isVisible;
};

const getMaxScenicScore = (trees) => {
    return trees.reduce((acc, row, r) => {
        row.forEach((tree, c) => {
            let current = [0, 0, 0, 0];
            let i = r - 1;
            let complete = false;
            while (i >= 0 && !complete) {
                current[0]++;
                if (trees[i][c] >= tree) complete = true;
                i--;
            }
            i = r + 1;
            complete = false;
            while (i < trees.length && !complete) {
                current[1]++;
                if (trees[i][c] >= tree) complete = true;
                i++;
            }
            i = c - 1;
            complete = false;
            while (i >= 0 && !complete) {
                current[2]++;
                if (trees[r][i] >= tree) complete = true;
                i--;
            }
            i = c + 1;
            complete = false;
            while (i < row.length && !complete) {
                current[3]++;
                if (trees[r][i] >= tree) complete = true;
                i++;
            }
            const cur = current.reduce((acc, val) => {
                return acc * val;
            }, 1);
            acc = cur > acc ? cur : acc;
        });
        return acc;
    }, 0);
};

try {
    const inputArray = fs.readFileSync("input/8-1.txt").toString().split("\n");
    const trees = inputArray.map((line) => {
        return line.split("");
    });
    const numVisible = trees.reduce((acc, row, tRow) => {
        row.forEach((tree, tCol) => {
            acc += isVisible(trees, { tRow, tCol }) ? 1 : 0;
        });
        return acc;
    }, 0);
    console.log(numVisible);
    const maxScenicScore = getMaxScenicScore(trees);
    console.log(maxScenicScore);
} catch (e) {
    console.error(e);
}
