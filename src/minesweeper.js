const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];

    for(let numRows = 0; numRows < numberOfRows; numRows++){
        let row = [];
        for(let numCols = 0; numCols < numberOfColumns; numCols++){
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

console.log(generatePlayerBoard(3,3));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    let numberOfBombsPlaced = 0;

    for(let numRows = 0; numRows < numberOfRows; numRows++){
        let row = [];
        for(let numCols = 0; numCols < numberOfColumns; numCols++){
            row.push(null);
        }
        board.push(row);
    }

    while(numberOfBombsPlaced < numberOfBombs){
        // An important note: This has the potential to place bombs on top of already existing bombs.
        // This will be fixed when you learn about control flow.
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
    }

    return board;
};

const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);