const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];

    for(let numRows = 0; numRows < numberOfRows; numRows++){
        const row = [];
        for(let numCols = 0; numCols < numberOfColumns; numCols++){
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

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

        if(board[randomRowIndex][randomColumnIndex] !== 'B'){
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;
};

const getNumberOfNeighborBombs = (bombBoard, flipRow, flipColumn) => {
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
    let numberOfBombs = 0;
    const neighborOffsets = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [1, 0],
        [-1, 1]
    ];

    neighborOffsets.forEach(offset => {
        const neighborRowIndex = flipRow + offset[0];
        const neighborColumnIndex = flipColumn + offset[1];
    });

    if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
        if(bombBoard[neighborRowIndex][neighborOffsets] === 'B'){
            numberOfBombs++;
        }
    }
    return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, flipRow, flipColumn) => {
    if(playerBoard[flipRow][flipColumn] !== ' '){
        console.log('This tile has already been flipped!');
        return;
    }

    if(bombBoard[flipRow][flipColumn] === 'B'){
        playerBoard[flipRow][flipColumn] = 'B';
    } else {
        playerBoard[flipRow][flipColumn] = getNumberOfNeighborBombs(bombBoard, flipRow, flipColumn);
    }
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

flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board: ');
printBoard(playerBoard);