//in this program check only raw and column conditions

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter grid size (e.g. 5 for 5x5): ', (size) => {
    size = parseInt(size);
    if (isNaN(size) || size <= 0) {
        console.log('Invalid size! Please enter a positive number.');
        rl.close();
        return;
    }

    
    let starGrid = Array.from({ length: size }, () => Array(size).fill(' '));
    let solutions = [];

    function canPlace(row, col) {
        for (let i = 0; i < size; i++) {
            if (starGrid[row][i] === '*') return false;
            if (starGrid[i][col] === '*') return false;
        }
        return true;
    }

    function isSafe(row, col) {
        let directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],         [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (let [dx, dy] of directions) {
            let newRow = row + dx;
            let newCol = col + dy;
            if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
                if (starGrid[newRow][newCol] === '*') {
                    return false;
                }
            }
        }
        return true;
    }

    function findSolutions(row = 0) {
        if (row === size) {
            // Ek valid solution mil gaya, usko store karna h
            solutions.push(starGrid.map(row => [...row]));
            return;
        }

        for (let col = 0; col < size; col++) {
            if (canPlace(row, col) && isSafe(row, col)) {
                starGrid[row][col] = '*'; // Place star
                findSolutions(row + 1); // Next row pe move
                starGrid[row][col] = ' ';
            }
        }
    }

    findSolutions(); 

    if (solutions.length === 0) {
        console.log("\n❌ No possible solutions found.");
    } else {
        console.log(`\n✅ Found ${solutions.length} possible solutions:\n`);
        solutions.forEach((solution, index) => {
            console.log(`Solution ${index + 1}:`);
            console.table(solution);
        });
    }

    rl.close();
});
