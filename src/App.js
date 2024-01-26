// src/App.js
import React, { useState } from 'react';
import './App.css';

const INITIAL_STATE = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(INITIAL_STATE);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winnerResult = calculateWinner(newBoard);
    if (winnerResult) {
      setWinner(winnerResult);
    }
  };

  const handleReset = () => {
    setBoard(INITIAL_STATE);
    setWinner(null);
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    return (
      <button className={`square ${winner && winner.line.includes(index) ? 'winning' : ''}`} onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const status = winner ? `Winner: ${winner.player}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className={`game ${winner ? winner.player.toLowerCase() : ''}`}>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      {winner && renderWinningLine(winner.line)}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }

  return null;
};

const renderWinningLine = (line) => {
  const [start, middle, end] = line;

  const isHorizontal = start % 3 === 0 && end % 3 === 2;
  const isVertical = start <= 2 && end >= 6;
  const isDiagonal = start === 0 && end === 8 || start === 2 && end === 6;

  const style = {
    top: isHorizontal ? 'calc(50% - 30px)' : isVertical ? '0' : 'calc(50% - 135px)',
    left: isVertical ? `${(start % 3) * 60 + 20}px` : '0',
  };

  return (
    <div className={`winning-line ${isHorizontal ? 'horizontal-line' : isVertical ? 'vertical-line' : 'diagonal-line'}`} style={style}></div>
  );
};

export default App;
