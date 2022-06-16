import React, { useState } from 'react';
import RollTwiceDisplay from './RollTwiceDisplay';

export default function RollTwice ({ selectedChar, onUpdate, gateway }) {
  const [selectedCharState, setSelectedCharState] = useState(selectedChar);
  const [rolls, setRolls] = useState([]);

  function getHigherRoll(roll1, roll2) {
    let total1 = roll1.reduce((a, b) => a + b, 0);
    let total2 = roll2.reduce((a, b) => a + b, 0);

    return total1 > total2 ? total1 : total2;
  }

  async function rollStats() {
    const dieRolls = await gateway.rollStats('rollstats/rolltwice');
    selectedCharState.str = getHigherRoll(dieRolls[0], dieRolls[1]);
    selectedCharState.dex = getHigherRoll(dieRolls[2], dieRolls[3]);
    selectedCharState.con = getHigherRoll(dieRolls[4], dieRolls[5]);
    selectedCharState.int = getHigherRoll(dieRolls[6], dieRolls[7]);
    selectedCharState.wis = getHigherRoll(dieRolls[8], dieRolls[9]);
    selectedCharState.chr = getHigherRoll(dieRolls[10], dieRolls[11]);

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
      <p>The higher of two rolls is selected for each ability score</p>
      <RollTwiceDisplay selectedChar={ selectedCharState } rolls={ rolls }/>
      <button onClick={ handleUpdate }>Save Stats</button>
    </div>
  );
}
