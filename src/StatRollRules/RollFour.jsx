import React, { useState } from 'react';
import RollFourDisplay from './RollFourDisplay';

export default function RollFour ({ selectedChar, onUpdate, gateway }) {
  const [selectedCharState, setSelectedCharState] = useState(selectedChar);
  const [rolls, setRolls] = useState([]);

  function addThreeLargest(roll) {
    const sorted = roll.sort(function(a, b) {
      return b - a
    });
    let total = 0;
    for (let i = 0; i < 3; i++) {
      total += sorted[i];
    }
    return total;
  }

  async function rollStats() {
    const dieRolls = await gateway.rollStats('rollstats/rollfour');
    selectedCharState.str = addThreeLargest(dieRolls[0]);
    selectedCharState.dex = addThreeLargest(dieRolls[1]);
    selectedCharState.con = addThreeLargest(dieRolls[2]);
    selectedCharState.int = addThreeLargest(dieRolls[3]);
    selectedCharState.wis = addThreeLargest(dieRolls[4]);
    selectedCharState.chr = addThreeLargest(dieRolls[5]);

    setRolls(dieRolls);
    setSelectedCharState(selectedCharState);
  }

  function handleUpdate() {
    if (rolls.length === 0) {
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
      <p>Only the three highest rolls are added to the ability score</p>
      <RollFourDisplay selectedChar={ selectedCharState } rolls={ rolls }/>
      <button onClick={ handleUpdate }>Save Stats</button>
    </div>
  );
}
