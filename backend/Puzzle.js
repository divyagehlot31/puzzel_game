//static grid and region for 5x5 grid

const readline = require('readline'); // for user input use readline module import 

// Readline interface create kiya jo input lega terminal se
const rl = readline.createInterface({
    input: process.stdin,                   
    output: process.stdout                 
});

//Regions Grid
const Grid = [
    [1, 1, 3, 5, 5], 
    [1, 1, 4, 4, 5],
    [1, 1, 4, 4, 5],
    [2, 1, 4, 4, 5],
    [2, 2, 4, 5, 5]
];

console.log("\n ********** Welcome to the Star Placement Game **********");
console.table(Grid);

// Grid for Store stars 
const starGrid = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
];

const placedRegions = [];         //store regions

let starsPlaced = 0;            //Star counting

// Row and coloumn me star check krega
function canPlace(row, col) {
    
    for (let i = 0; i < 5; i++) {
        if (starGrid[row][i] === '*') return false;
        if (starGrid[i][col] === '*') return false;
    }
    
    let region = Grid[row][col];         // Current region nikalenge
    if (placedRegions.includes(region)) return false; 

    return true; 
}

// edges me stars check Karega
function isSafe(row, col) {
    let directions = [
        [-1, -1], [-1, 0], [-1, 1],  
        [0, -1],         [0, 1],      
        [1, -1], [1, 0], [1, 1]       
    ];
    
    for (let [dx, dy] of directions) {                 //check all directions
        let newRow = row + dx;                    
        let newCol = col + dy;

        
        if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
            if (starGrid[newRow][newCol] === '*') { 
                return false; // 
            }
        }
    }
    return true; 
}

//Star placing function
function placeStar(row, col) {
    if (canPlace(row, col) && isSafe(row, col)) {       //call canPlace and isSafe
        starGrid[row][col] = '*'; 
        
        let region = Grid[row][col]; 

        placedRegions.push(region);  // store Region in list

        starsPlaced++; 

        console.log(` Star placed at (${row}, ${col})
                       `);
    } else {
        console.log(` Cannot place at (${row}, ${col}). Try another position.`);
    }
}

// Take user input
function askForInput() {
    if (starsPlaced >= 5) {
        console.log("\n🎉 All 5 stars placed successfully!\n");                 // console.table(starGrid); // Final star grid table
        rl.close();                                                          // close Input 
        return console.table(starGrid);
    }

    rl.question(`Enter row (0-4) and col (0-4) to place star (e.g. 2 3): `, (input) => {
        let [row, col] = input.split(" ").map(Number); // Input ko number me convert karenge

        // Check input is valid or not
        if (isNaN(row) || isNaN(col) || row < 0 || row > 4 || col < 0 || col > 4) {
            console.log(" Invalid input! Please enter numbers between 0-4.");
        } else {
            placeStar(row, col); //call function
        }

        askForInput(); //call the function till 5 star placed 
    });
}

console.log("***You need to place 5 stars in a valid position on the grid!***\n");
askForInput(); // User se input lena start karenge

// placeStar(2, 0); 
// placeStar(4, 1); 
// placeStar(0, 2); 
// placeStar(3, 3); 
// placeStar(1, 4); 
