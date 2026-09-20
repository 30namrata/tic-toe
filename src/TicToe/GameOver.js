import React from 'react';

function GameOver({ winner, Restart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>It's a Draw!</p>}
      <p>
        <button onClick={Restart}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;