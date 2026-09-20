import React, { useState } from 'react';
import './TicToe.css';

function TicToe({ initialName, symbol, isActive, onChange }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const editPlayer = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChange(symbol, playerName);
    }
  };

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <>
      <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {isEditing ? (
            <input type="text" required placeholder="Enter Value" onChange={handleChange} />
          ) : (
            <span className="palyer-name">{playerName}</span>
          )}
          &nbsp;
          <span className="palyer-symbol">{symbol}</span>
        </span>
        <button onClick={editPlayer}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    </>
  );
}

export default TicToe;