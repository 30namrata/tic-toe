import React from 'react';

function GameBoard({ onSelected, board, winningCombination, hasWinner }) {
  const isWinningSquare = (rowIndex, colIndex) => {
    if (!winningCombination) return false;
    return winningCombination.some(
      (square) => square.row === rowIndex && square.column === colIndex
    );
  };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => {
              const isWinning = isWinningSquare(rowIndex, colIndex);
              return (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelected(rowIndex, colIndex)}
                    disabled={playerSymbol !== null || hasWinner}
                    className={isWinning ? 'winning-square' : undefined}
                  >
                    {playerSymbol}
                  </button>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;