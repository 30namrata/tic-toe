import { useState } from 'react';
import './App.css';

import TicToe from './TicToe/TicToe';
import GameBoard from './TicToe/GameBoard';
import Log from './TicToe/Log';
import { deriverHelpersValue } from './TicToe/Helpers';
import { WinnigCombniation } from './TicToe/WinnigCombniation.js';
import GameOver from './TicToe/GameOver.js';
function App() {
  var [a,b] = useState(19);
  const Player_Turns = {
    X : 'Player  1',
    O : 'Player 2'
  }
  //for tic toe game
  const[gameTurns,setGameTurns] = useState([]);
  const[player, setPlayer] = useState(Player_Turns)
  // const[activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriverHelpersValue(gameTurns)
  const initialGame = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ];
  const derivedGameBoard = (gameTurns)=>{
    let playboard = [...initialGame.map((array)=> [...array])];
  for ( const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    playboard[row][col] = player;


}
return playboard;
  }
 const derivedWinner = (playboard,player ) => {
  let winner ;
  for (const combination of WinnigCombniation){
    debugger
    let firstSqSymbol = playboard[combination[0].row][combination[0].column];
    let secondSqSyambbol = playboard[combination[1].row][combination[1].column];
    let thirdSqSymbol = playboard[combination[2].row][combination[2].column];
    if(firstSqSymbol && firstSqSymbol == secondSqSyambbol && firstSqSymbol == thirdSqSymbol){
      winner = player[firstSqSymbol];
    }
  }
  return winner;
  }
  const playboard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(playboard, player);
  let gameOver = gameTurns.length == 9 && !winner;
  const activePlayerSymbol = (rowIndex, colIndex) => {
    // setActivePlayer((activeSymbol)=> activeSymbol == 'X' ? 'O' : 'X' )
  setGameTurns((prevTurns) =>{
  let currentPlayer = deriverHelpersValue(prevTurns);
  const updateTurns =[
    { square : {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns ]
    return updateTurns;
   });

  }
  const handleRestartGame = () =>{
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newgame)=>{
    setPlayer((player)=>{ 
    return {
      ...player,
      [symbol]: newgame
      
    }})
  }

  return (
    <>
    <main>
    <div id='game-container'>
        <ol id='players' className='highlight-player'>
      <TicToe path='/game' initialName={Player_Turns.X} symbol='X' isActive={activePlayer ==='X' } onChange={handlePlayerNameChange}/>
      <TicToe path='/game' element={<TicToe/>} symbol='O' initialName={Player_Turns.O} isActive={activePlayer==='O'} onChange={handlePlayerNameChange}/>

      </ol>
     {(winner || gameOver) && <GameOver winner={winner} Restart={handleRestartGame}/>}
      <GameBoard onSelected={activePlayerSymbol} board={playboard}/>

    </div>
    <Log turns={gameTurns}/>
  </main>
   
    </>


  );
}



export default App;
