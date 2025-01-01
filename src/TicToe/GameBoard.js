import React, { useState } from 'react';

function GameBoard ({onSelected, board}) {
   
   
    // const[playboard, setPlayBoard] = useState(initialGame);

    // const clickOnSymabolGame = (rowIndex, colIndex) => {
    //     setPlayBoard((playboard)=> {
    //     let updatedBoard =[...playboard.map((innerArray) => ([...innerArray]))]
    //     updatedBoard[rowIndex][colIndex]= isActive;
    //     return updatedBoard;
    //     });
    // onSelected();
    // }
  
  return (
    <ol id='game-board'>
        {board.map((row, rowIndex)=> (
        <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex)=>(
                    <li id={colIndex}>
                        <button onClick={() => (onSelected(rowIndex, colIndex))} disabled={playerSymbol !== null}>{playerSymbol}</button>
                    </li>
                ))}
            </ol>
        </li>
    ))}
         
    </ol>
  )
}

export default GameBoard