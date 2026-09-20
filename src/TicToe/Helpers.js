const deriverHelpersValue = (gameTurns) => {
  let currentPlayer ='X';
  if(gameTurns.length > 0 && gameTurns[0].player ==='X') {
    currentPlayer ='O';
  }
return currentPlayer  
}

export {
    deriverHelpersValue
}