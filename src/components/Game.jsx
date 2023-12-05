import Board from "./Board";
import "./Game.css";
import Modal from "./Modal";

import { useEffect, useState } from "react";

export default function Game() {
  const [XTurn, setXTurn] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    setModalIsOpen(true)
  }, [])

  function closeModal() {
    setModalIsOpen(false)
  }

  function handlePlay(newSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(nextHistory);
    setCurrentMove(() => currentMove + 1);
    setXTurn(!XTurn);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXTurn(move % 2 === 0);
  }

  function resetGame() {
    if (window.confirm("are you sure?")) {
      setHistory([Array(9).fill(null)]);
      jumpTo(0);
      setModalIsOpen(true)
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === currentMove) description = `You are at move ${move}`
    else if (move === 0) description = "Go to start";
    else description = `Go to move #${move}`;

    return (
      <li key={move}>
        <button className="btn" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );

  });

  return (
    <>
      <Modal isOpen={modalIsOpen} hasClosed={closeModal}>
        <h2>Who's going first?</h2>
        <p>Sooo... Do you want X or O to go first?</p>

        <div className="button-container">
          <button value="X" onClick={() => setXTurn(true)} className={`${XTurn ? 'active' : ''} select-btn`}>X</button>
          <button value="O" onClick={() => setXTurn(false)} className={`${!XTurn ? 'active' : ''} select-btn`}>O</button>
        </div>
      </Modal>

      <div className="game">
        <div className="board-container">
          <Board
            Xturn={XTurn}
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
    </>
  );
}
