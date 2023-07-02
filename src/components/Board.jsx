import Square from "./Square";
import "./Board.css";

export default function Board({ Xturn, squares, onPlay, currentMove }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares, currentMove)) {
      return;
    }
    const newSquares = squares.slice();

    if (Xturn) newSquares[i] = "X";
    else newSquares[i] = "O";
    onPlay(newSquares);
  }

  const winner = calculateWinner(squares, currentMove);
  let status = "Next player: " + (Xturn ? "X" : "O");
  if (winner) status = `Winner: ${winner}`;
  // false is draw
  else if (winner === false) status = `It's a draw!`;

  return (
    <>
      <div className="status">
        <h2>{status}</h2>
      </div>
      <div className="game-board">
        {squares.map((square, index) => {
          return (
            <Square
              key={index}
              value={square}
              onSquareClick={() => handleClick(index)}
            />
          );
        })}
      </div>
    </>
  );
}

function calculateWinner(squares, move) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    const winningCondition =
      squares[a] && squares[a] === squares[b] && squares[b] === squares[c];

    if (winningCondition) {
      return squares[a];
    } else if (move === 9) {
      // there are 9 squares. if all of them are filled then false
      return false;
    }
  }
  return null;
}
