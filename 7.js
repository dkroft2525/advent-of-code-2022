const fs = require("fs");

let cd = "/";

const dirStructure = {
    "/": {},
};

const mkDir = (dirName) => {
    if (!currentDir[dirName]) {
        currentDir[dirName] = {};
    }
};

const navigateTo = (dir) => {
    const dirParts = dir.split("/").filter((e) => e);
    let directory = dirStructure["/"];
    while (dirParts.length) {
        const nextDir = dirParts.shift();
        if (!directory[nextDir]) {
            mkDir(nextDir);
        }
        directory = directory[nextDir];
    }
    return directory;
};

let currentDir = navigateTo(cd);

const runCommand = (command) => {
    const cmdParts = command.split(" ");
    if (cmdParts[0] === "$") {
        // Command
        if (cmdParts[1] == "ls") {
            // Ignore?
        }
        if (cmdParts[1] == "cd") {
            if (cmdParts[2] == "..") {
                cd = cd.slice(
                    0,
                    cd.lastIndexOf("/", cd.lastIndexOf("/") - 1) + 1
                );
            } else if (cmdParts[2] == "/") {
                cd = "/";
            } else {
                cd += `${cmdParts[2]}/`;
            }
            currentDir = navigateTo(cd);
        }
    } else if (!isNaN(parseInt(cmdParts[0]))) {
        // File
        currentDir[cmdParts[1]] = parseInt(cmdParts[0]);
    } else if (cmdParts[0] === "dir") {
        // Directory
        mkDir(cmdParts[1]);
    } else {
        // Unknown
        console.error(`UNKNOWN COMMAND: '${command}'`);
    }
};

const setDirectorySizes = (cur = "/") => {
    const current = navigateTo(cur);
    current._FILESIZE = Object.keys(current).reduce((acc, key) => {
        if (typeof current[key] === "object") {
            acc += setDirectorySizes(`${cur}${key}/`);
        } else {
            acc += current[key];
        }
        return acc;
    }, 0);
    return current._FILESIZE;
};

const getSmallDirectoryTotal = (cur = "/") => {
    const cutoff = 100000;
    const current = navigateTo(cur);
    let result = 0;
    result += Object.keys(current).reduce((acc, key) => {
        if (typeof current[key] === "object") {
            if (current[key]._FILESIZE && current[key]._FILESIZE <= cutoff) {
                acc += current[key]._FILESIZE;
            }
            acc += getSmallDirectoryTotal(`${cur}${key}/`);
        }
        return acc;
    }, 0);
    return result;
};

const getSmallDirectories = (requiredExtra, cur = "/") => {
    const current = navigateTo(cur);
    const result = Object.keys(current).reduce((acc, key) => {
        if (typeof current[key] === "object") {
            if (
                current[key]._FILESIZE &&
                current[key]._FILESIZE > requiredExtra
            ) {
                acc.push({
                    path: `${cur}${key}/`,
                    size: current[key]._FILESIZE,
                });
            }
            acc = [
                ...acc,
                ...getSmallDirectories(requiredExtra, `${cur}${key}/`),
            ];
        }
        return acc;
    }, []);
    return result;
};

const run = async () => {
    try {
        const inputArray = fs
            .readFileSync("input/7-1.txt")
            .toString()
            .split("\n");
        inputArray.forEach((cmd) => {
            runCommand(cmd);
        });
        cd = "/";
        currentDir = navigateTo(cd);
        const totalSize = setDirectorySizes();
        // For debugging
        // await fs.writeFile(
        //     "7-output.json",
        //     JSON.stringify(dirStructure),
        //     "utf8",
        //     () => {}
        // );
        const smallDirTotal = getSmallDirectoryTotal();
        console.log(smallDirTotal); // Result 1

        const totalMemory = 70000000;
        const totalUsed = 47048086;
        const totalFree = totalMemory - totalUsed;
        const requiredMemory = 30000000;
        const requiredExtra = requiredMemory - totalFree;
        const smallDirectories = getSmallDirectories(requiredExtra);
        const smallestDirectory = smallDirectories.sort(
            (a, b) => a.size - b.size
        );
        console.log(smallestDirectory[0]);
    } catch (e) {
        console.error(e);
    }
};

run();
