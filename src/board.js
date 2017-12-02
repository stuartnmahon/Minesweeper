export class Board {
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