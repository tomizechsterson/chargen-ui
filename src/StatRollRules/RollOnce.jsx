import React, { useState } from 'react';
import RollOnceDisplay from './RollOnceDisplay';

export default function RollOnce ({ selectedChar, onUpdate, gateway }) {
  const [selectedCharState, setSelectedCharState] = useState(selectedChar);
  const [rolls, setRolls] = useState([]);

  async function rollStats() {
    const dieRolls = await gateway.rollStats('rollstats/rollonce');
    selectedCharState.str = dieRolls[0].reduce((a, b) => a + b, 0);
    selectedCharState.dex = dieRolls[1].reduce((a, b) => a + b, 0);
    selectedCharState.con = dieRolls[2].reduce((a, b) => a + b, 0);
    selectedCharState.int = dieRolls[3].reduce((a, b) => a + b, 0);
    selectedCharState.wis = dieRolls[4].reduce((a, b) => a + b, 0);
    selectedCharState.chr = dieRolls[5].reduce((a, b) => a + b, 0);

    setRolls(dieRolls);
    setSelectedCharState(selectedCharState);
  }

  function handleUpdate() {
    if (rolls.length === 0) {
      alert('must roll stats to save');
    } else {
      selectedCharState.completionStep++;
      onUpdate(selectedCharState);
    }
  }

  return (
      <div>
        <button onClick={ rollStats }>Roll Stats</button>
        <br/>
        <p>Standard Stat Rolling. Roll once per stat and that's it.</p>
        <RollOnceDisplay selectedChar={ selectedCharState } rolls={ rolls }/>
        <button onClick={ handleUpdate }>Save Stats</button>
      </div>
  );
}
