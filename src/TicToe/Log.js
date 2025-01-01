import React from 'react'

function Log({turns}) {
  return (
    <ol id='log'>
        {turns.map((turn)=> (
         <li id={`${turn.square.row}${turn.square.col}`}>
            {turn.player} <b>Selected</b> {turn.square.row},{turn.square.col}
        </li>
        )
       )}
          
    </ol>
  )
}

export default Log