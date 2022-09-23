import Board from "./Board";
import Info from "./Info";
import "./css/App.css";
import { useState } from "react";

function App() {
	// game reset or not
	const [reset, setReset] = useState(false);

	// current winner
	const [winner, setWinner] = useState("");

	const resetBoard = () => {
		setReset(true);
	};

	return (
		<div className="App">
			{/*when there is no winner */}
			<div className={`winner ${winner !== "" ? "" : "shrink"}`}>
				{/*current winner */}
				<div className="winner-text">{winner}</div>
				{/*reset the board */}
				<button onClick={() => resetBoard()}>Reset Board</button>
			</div>

			<Board
				reset={reset}
				setReset={setReset}
				winner={winner}
				setWinner={setWinner}
			/>
			<Info />
		</div>
	);
}

export default App;
