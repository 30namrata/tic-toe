import { useState } from 'react';
import './App.css';

import TicToe from './TicToe/TicToe';
import GameBoard from './TicToe/GameBoard';
import Log from './TicToe/Log';
import { deriverHelpersValue } from './TicToe/Helpers';
import { WinnigCombniation } from './TicToe/WinnigCombniation.js';
import GameOver from './TicToe/GameOver.js';

function App() {
  const Player_Turns = {
    X: 'Player 1',
    O: 'Player 2'
  };

  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(Player_Turns);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const activePlayer = deriverHelpersValue(gameTurns);
  const initialGame = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const derivedGameBoard = (gameTurns) => {
    let playboard = [...initialGame.map((array) => [...array])];
    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      playboard[row][col] = player;
    }
    return playboard;
  };

  const derivedWinner = (playboard, player) => {
    for (const combination of WinnigCombniation) {
      let firstSqSymbol = playboard[combination[0].row][combination[0].column];
      let secondSqSymbol = playboard[combination[1].row][combination[1].column];
      let thirdSqSymbol = playboard[combination[2].row][combination[2].column];
      if (firstSqSymbol && firstSqSymbol === secondSqSymbol && firstSqSymbol === thirdSqSymbol) {
        return {
          winnerName: player[firstSqSymbol],
          symbol: firstSqSymbol,
          winningCombination: combination
        };
      }
    }
    return null;
  };

  const playboard = derivedGameBoard(gameTurns);
  const winnerInfo = derivedWinner(playboard, player);
  const winner = winnerInfo ? winnerInfo.winnerName : null;
  const winningCombination = winnerInfo ? winnerInfo.winningCombination : null;
  const gameOver = gameTurns.length === 9 && !winner;

  const activePlayerSymbol = (rowIndex, colIndex) => {
    if (winner || gameOver) return;
    setGameTurns((prevTurns) => {
      let currentPlayer = deriverHelpersValue(prevTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];
      return updateTurns;
    });
  };

  const handleRestartGame = () => {
    if (winnerInfo) {
      setScores((prev) => ({ ...prev, [winnerInfo.symbol]: prev[winnerInfo.symbol] + 1 }));
    } else if (gameOver) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newgame) => {
    setPlayer((player) => {
      return {
        ...player,
        [symbol]: newgame
      };
    });
  };

  return (
    <main>
      <header>
        <h1>Tic-Tac-Toe</h1>
      </header>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <TicToe
            initialName={Player_Turns.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChange={handlePlayerNameChange}
          />
          <TicToe
            initialName={Player_Turns.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChange={handlePlayerNameChange}
          />
        </ol>

        <div className="score-board">
          <div className="score-badge">
            <span className="label">{player.X} (X):</span> <strong>{scores.X}</strong>
          </div>
          <div className="score-badge">
            <span className="label">Draws:</span> <strong>{scores.draws}</strong>
          </div>
          <div className="score-badge">
            <span className="label">{player.O} (O):</span> <strong>{scores.O}</strong>
          </div>
        </div>

        {(winner || gameOver) && (
          <GameOver winner={winner} Restart={handleRestartGame} />
        )}
        <GameBoard
          onSelected={activePlayerSymbol}
          board={playboard}
          winningCombination={winningCombination}
          hasWinner={Boolean(winner)}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
