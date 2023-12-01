import Square from "./Square";
import "./Board.css";

export default function Board({ Xturn, squares, onPlay, currentMove }) {
  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares, currentMove)) {
      return;
    }
    const newSquares = squares.slice();

    if (Xturn) newSquares[i] = "X";
    else newSquares[i] = "O";
    onPlay(newSquares);
  }

  const winner = calculateWinner(squares, currentMove);
  let status = `Next player: ${Xturn ? "X" : "O"}`;
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
              onSquareClick={() => handleSquareClick(index)}
            />
          );
        })}
      </div>
    </>
  );
}

function calculateWinner(squares, move) {
  if (move === 0) return
  const winningLines = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal 
    [0, 4, 8], // to the right downwards
    [2, 4, 6], // to the left downwards
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    const winningCondition =
      squares[a] && squares[a] === squares[b] && squares[b] === squares[c];

    if (winningCondition) return squares[a];
  }

  // there are 9 squares. if all of them are filled 
  // and nobody won then draw
  if (move === 9 && !winningCondition) {
    return false;
  }
  return null;
}
