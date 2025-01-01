import React from 'react'

function GameOver( {winner, Restart}) {
  return (
    <div id='game-over'>
    <h2>GameOver</h2>
    {winner && <p>You Won {winner}!</p>}
    {!winner&& <p>It's Draw&nbsp;Match!</p>}
    
   <p> 
    <button onClick={Restart}>ReStart</button></p>
    </div>
  )
}

export default GameOver