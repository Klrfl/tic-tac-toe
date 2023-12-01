import Board from "./Board";
import "./Game.css";

import { useState } from "react";

export default function Game() {
  const [Xturn, setXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(newSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(() => currentMove + 1);
    setXTurn(!Xturn);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXTurn(move % 2 === 0);
  }

  function resetGame() {
    if (window.confirm("are you sure?")) {
      setHistory([Array(9).fill(null)]);
      jumpTo(0);
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) description = "Go to start";
    else description = `Go to move #${move}`;

    if (move === history.length - 1) {
      return <li key={move}>You are at move #{move}</li>;
    } else {
      return (
        <li key={move}>
          <button className="btn" onClick={() => jumpTo(move)}>
            {description}
          </button>
        </li>
      );
    }
  });

  return (
    <div className="game">
      <div className="board-container">
        <Board
          Xturn={Xturn}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove} />
        <button onClick={resetGame} className="btn btn--reset">
          Reset game
        </button>
      </div>

      <div className="game-info">
        <h2>Moves</h2>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
