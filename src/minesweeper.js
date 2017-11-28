class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);

        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('The game is over! Here was the final board: ');
            this._board.print();
        } else if(this._board.hasNonBombEmptySpaces()){
            console.log('Current board: ');
            this._board.print();
        } else {
            console.log('Winner, Winner! Here is your winning board: ');
            this._board.print();
        }
    }
}

class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard(){
        return this._playerBoard;
    }

    hasNonBombEmptySpaces() {
        return this._numberOfBombs !== this._numberOfTiles;
    }

    getNumberOfNeighborBombs(flipRow, flipColumn) {
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
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

            if(neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
                if(this._bombBoard[neighborRowIndex][neighborOffsets] === 'B') {
                    numberOfBombs++;
                }
            }
        });
    }

    flipTile(flipRow, flipColumn) {
        if(this._playerBoard[flipRow][flipColumn] !== ' '){
            console.log('This tile has already been flipped!');
            return;
        }

        if(this._bombBoard[flipRow][flipColumn] === 'B'){
            this._playerBoard[flipRow][flipColumn] = 'B';
        } else {
            this._playerBoard[flipRow][flipColumn] = this.getNumberOfNeighborBombs(flipRow, flipColumn);
        }
        this._numberOfTiles --;
    }

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];

        for(let numRows = 0; numRows < numberOfRows; numRows++){
            const row = [];
            for(let numCols = 0; numCols < numberOfColumns; numCols++){
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    }

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
            let randomRowIndex = Math.floor(Math.random() * numberOfRows);
            let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

            if(board[randomRowIndex][randomColumnIndex] !== 'B'){
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }
        return board;
    }

    print(){
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
}

const g = new Game(3,3,3);
g.playMove(0,0);