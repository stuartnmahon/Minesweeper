'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'hasNonBombEmptySpaces',
        value: function hasNonBombEmptySpaces() {
            return this._numberOfBombs !== this._numberOfTiles;
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(flipRow, flipColumn) {
            var _this = this;

            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            var numberOfBombs = 0;
            var neighborOffsets = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [1, 0], [-1, 1]];

            neighborOffsets.forEach(function (offset) {
                var neighborRowIndex = flipRow + offset[0];
                var neighborColumnIndex = flipColumn + offset[1];

                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                    if (_this._bombBoard[neighborRowIndex][neighborOffsets] === 'B') {
                        numberOfBombs++;
                    }
                }
            });
        }
    }, {
        key: 'flipTile',
        value: function flipTile(flipRow, flipColumn) {
            if (this._playerBoard[flipRow][flipColumn] !== ' ') {
                console.log('This tile has already been flipped!');
                return;
            }

            if (this._bombBoard[flipRow][flipColumn] === 'B') {
                this._playerBoard[flipRow][flipColumn] = 'B';
            } else {
                this._playerBoard[flipRow][flipColumn] = this.getNumberOfNeighborBombs(flipRow, flipColumn);
            }
            this._numberOfTiles--;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];

            for (var numRows = 0; numRows < numberOfRows; numRows++) {
                var row = [];
                for (var numCols = 0; numCols < numberOfColumns; numCols++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            var numberOfBombsPlaced = 0;

            for (var numRows = 0; numRows < numberOfRows; numRows++) {
                var row = [];
                for (var numCols = 0; numCols < numberOfColumns; numCols++) {
                    row.push(null);
                }
                board.push(row);
            }

            while (numberOfBombsPlaced < numberOfBombs) {
                var randomRowIndex = Math.floor(Math.random() * numberOfRows);
                var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

                if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                    board[randomRowIndex][randomColumnIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            }
            return board;
        }
    }]);

    return Board;
}();