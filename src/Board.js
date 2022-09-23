import "./css/board.css";

import { useState, useEffect, useRef } from "react";

const Board = ({ reset, setReset, winner, setWinner }) => {
	// 0 for player 1, 1 for player 2 or AI(haven't implemented)
	const [turn, setTurn] = useState(0);

	// current board
	const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);

	// reference for the board
	const boardRef = useRef(null);

	// draw on the board
	const draw = (event, index) => {
		// Draws iff position not taken and no winner yet
		if (data[index - 1] === "" && winner === "") {
			// X if it's p1's turn else O
			const current = turn === 0 ? "X" : "O";

			// update
			data[index - 1] = current;

			// change the rendered
			event.target.innerText = current;

			// change turn
			setTurn(turn === 0 ? 1 : 0);
		}
	};

	//reset if winner decided
	useEffect(() => {
		setData(["", "", "", "", "", "", "", "", ""]);

		// Getting all the children(cells) of the board
		const cells = boardRef.current.children;

		// clear board
		for (let i = 0; i < 9; i++) {
			cells[i].innerText = "";
		}

		// reset turn
		setTurn(0);

		// reset winner
		setWinner("");
		setReset(false);
	}, [reset, setReset, setWinner]);

	// checking winner
	useEffect(() => {
		// checking win condition (row)
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans |=
					data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== "";
			}
			return ans;
		};

		// checking win condition (col)
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans |=
					data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== "";
			}
			return ans;
		};

		// checking win condition (diag)
		const checkDiagonal = () => {
			return (
				(data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
				(data[2] === data[4] && data[2] === data[6] && data[2] !== "")
			);
		};

		// check if win condition
		const checkWin = () => {
			return checkRow() || checkCol() || checkDiagonal();
		};

		// check for tie
		const checkTie = () => {
			let count = 0;
			data.forEach((cell) => {
				if (cell !== "") {
					count++;
				}
			});
			return count === 9;
		};

		// set winner
		if (checkWin()) {
			setWinner(turn === 0 ? "Player 2 Wins!" : "Player 1 Wins!");
		} else if (checkTie()) {
			// set tie
			setWinner("It's a Tie!");
		}
	});

	return (
		<div ref={boardRef} className="board">
			<div className="input input-1" onClick={(e) => draw(e, 1)}></div>
			<div className="input input-2" onClick={(e) => draw(e, 2)}></div>
			<div className="input input-3" onClick={(e) => draw(e, 3)}></div>
			<div className="input input-4" onClick={(e) => draw(e, 4)}></div>
			<div className="input input-5" onClick={(e) => draw(e, 5)}></div>
			<div className="input input-6" onClick={(e) => draw(e, 6)}></div>
			<div className="input input-7" onClick={(e) => draw(e, 7)}></div>
			<div className="input input-8" onClick={(e) => draw(e, 8)}></div>
			<div className="input input-9" onClick={(e) => draw(e, 9)}></div>
		</div>
	);
};

export default Board;
