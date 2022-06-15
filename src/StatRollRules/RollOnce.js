import React, { useState } from 'react';
import RollOnceDisplay from './RollOnceDisplay';

export default function RollOnce ({ selectedChar, onUpdate, gateway }) {
  const [selectedCharState, setSelectedCharState] = useState({});
  const [rollsState, setRollsState] = useState([]);

  async function rollStats() {
    const rolls = await gateway.rollStats('rollstats/rollonce');
    selectedChar.str = rolls[0].reduce((a, b) => a + b, 0);
    selectedChar.dex = rolls[1].reduce((a, b) => a + b, 0);
    selectedChar.con = rolls[2].reduce((a, b) => a + b, 0);
    selectedChar.int = rolls[3].reduce((a, b) => a + b, 0);
    selectedChar.wis = rolls[4].reduce((a, b) => a + b, 0);
    selectedChar.chr = rolls[5].reduce((a, b) => a + b, 0);

    setRollsState(rolls);
    setSelectedCharState(selectedChar);
  }

  function handleUpdate() {
    if (rollsState.length === 0) {
      alert('must roll stats to save');
    } else {
      selectedChar.completionStep++;
      onUpdate(selectedChar);
    }
  }

  return (
      <div>
        <button onClick={ rollStats }>Roll Stats</button>
        <br/>
        <p>Standard Stat Rolling. Roll once per stat and that's it.</p>
        <RollOnceDisplay selectedChar={ selectedCharState } rolls={ rollsState }/>
        <button onClick={ handleUpdate }>Save Stats</button>
      </div>
  );
}
