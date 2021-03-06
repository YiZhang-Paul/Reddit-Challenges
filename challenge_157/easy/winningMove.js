/* jslint esversion: 6 */
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		/**
		 * read current board
		 * @param {String} [layout] - current layout
		 *
		 * @return {Array} [current board]
		 */
		function readBoard(layout) {
			return layout.match(/\S+(?=\n)|\S+(?!.)/g).map(row => row.split(""));
		}
		/**
		 * check if there is a connect on given direction
		 * @param {String} [direction] - direction to check
		 * @param {char} [marker] - player marker
		 * @param {int} [row] - starting row on board
		 * @param {int} [col] - starting column on board
		 * @param {Array} [board] - game board
		 * @param {int} [goal] - total markers needed for a winning move
		 *
		 * @return {boolean} [test result]
		 */
		function isConnect(direction, marker, row, col, board, goal) {
			const hDirection = /l/.test(direction) ? -1 : (/r/.test(direction) ? 1 : 0);
			const vDirection = /t/.test(direction) ? 1 : (/b/.test(direction) ? -1 : 0);
			let total = 1;
			while(board[row + hDirection] && board[row + hDirection][col + vDirection]) {
				[row, col] = [row + hDirection, col + vDirection];
				if(board[row][col] != marker) {
					break;
				}
				total++;
			}
			return total >= goal;
		}
		/**
		 * check if current move is a winning move
		 * @param {char} [marker] - player marker
		 * @param {int} [row] - row of current move
		 * @param {int} [col] - column of current move
		 * @param {Array} [board] - current game board
		 * @param {int} [goal] - total markers needed for a winning move
		 *
		 * @return {boolean} [test result]
		 */
		function isWinMove(marker, row, col, board, goal = 3) {
			let directions = ["t", "l", "r", "b", "bl", "br", "tl", "tr"];
			return directions.some(direction => isConnect(direction, marker, row, col, board, goal));
		}
		/**
		 * print game board
		 * @param {Array} [board] - game board to print
		 *
		 * @return {String} [game board layout]
		 */
		function printBoard(board) {
			return board.reduce((acc, val) => acc + val.join("") + "\n", "");
		}
		/**
		 * display all winning moves
		 * @param {Array} [winMoves] - winning moves to print
		 *
		 * @return {String} [all win moves]
		 */
		function displayWinMove(winMoves) {
			const plural = winMoves.length > 1;
			const message = `There ${plural ? "are" : "is"} ${winMoves.length} Winning Move${plural ? "s" : ""}:\n\n`;
			return message + winMoves.reduce((acc, val, index) => `${acc}Win Move No.${index + 1}:\n\n${printBoard(val[0])}\n`, "");
		}
		/**
		 * find all winning moves
		 * @param {char} [marker] - player marker
		 * @param {String} [layout] - current board layout
		 *
		 * @return {String} [all possible winning moves]
		 */
		function findWinMoves(marker, layout) {
			let winMoves = [], board = readBoard(layout);
			for(let i = 0; i < board.length; i++) {
				for(let j = 0; j < board[i].length; j++) {
					if(board[i][j] == "-" && isWinMove(marker, i, j, board, 3)) {
						let boardCopy = readBoard(layout);
						boardCopy[i][j] = marker;
						winMoves.push([boardCopy, i, j]);
					}
				}
			}
			return winMoves;
		}
		/**
		 * display block moves
		 * @param {Array} [blockMoves] - block moves to print
		 *
		 * @return {String} [all block moves]
		 */
		function displayBlockMove(blockMoves) {
			const plural = blockMoves.length > 1;
			const message = `There ${plural ? "are" : "is"} ${blockMoves.length} Block Move${plural ? "s" : ""}:\n\n`;
			return message + blockMoves.reduce((acc, val, index) => `${acc}Block Move No.${index + 1}:\n\n${printBoard(val[0])}\n`, "");		
		}
		/**
		 * find all block moves
		 * @param {char} [marker] - player marker
		 * @param {String} [layout] - current board layout
		 *
		 * @return {String} [all possible block moves]
		 */
		function findBlockMoves(marker, layout) {
			return findWinMoves(marker == "X" ? "O" : "X", layout).map(move => {
				move[0][move[1]][move[2]] = marker;
				return move;
			});
		}
		/**
		 * analyze games
		 * @param {char} [marker] - player marker
		 * @param {String} [layout] - current board layout
		 *
		 * @return {String} [game analyze]
		 */
		function analyzeGame(marker, layout) {
			let winMoves = findWinMoves(marker, layout);
			let blockMoves = findBlockMoves(marker, layout);
			return winMoves.length || blockMoves.length ? 
				displayWinMove(winMoves) + displayBlockMove(blockMoves) : "There is Neither Winning Move nor Block Move.";
		}
		//challenge & bonus input
		console.log(`%cChallenge & Bonus Input: `, "color : red;");
		let move = "X";
		let board = `XX-
                 -XO
                 OO-`;
		console.log(`%cMove: ${move}`, "color : skyblue;");
		console.log(`%c${board.split("\n").map(row => row.trim()).join("\n")}\n`, "color : skyblue;");
		console.log(`%c${analyzeGame(move, board)}`, "color : orange;");
		move = "O";
		board = `O-X
						 -OX
						 ---`;
		console.log(`%cMove: ${move}`, "color : skyblue;");
		console.log(`%c${board.split("\n").map(row => row.trim()).join("\n")}\n`, "color : skyblue;");
		console.log(`%c${analyzeGame(move, board)}`, "color : orange;");
		move = "X";
		board = `--O
             OXX
             ---`;
		console.log(`%cMove: ${move}`, "color : skyblue;");
		console.log(`%c${board.split("\n").map(row => row.trim()).join("\n")}\n`, "color : skyblue;");
		console.log(`%c${analyzeGame(move, board)}`, "color : orange;");
	});
})();		