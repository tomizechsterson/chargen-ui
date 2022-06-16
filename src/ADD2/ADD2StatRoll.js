import React, { useState } from 'react';
import RollOnce from '../StatRollRules/RollOnce';
import RollTwice from '../StatRollRules/RollTwice';
import RollFour from '../StatRollRules/RollFour';
import Assignment from '../StatRollRules/Assignment';
import Add7Dice from "../StatRollRules/Add7Dice";

export default function ADD2StatRoll ({ selectedChar, onUpdate, gateway }) {
  const [rollRule, setRollRule] = useState('rollOnce');

  function setSelectedCharStatsTo8() {
    selectedChar.str = selectedChar.dex = selectedChar.con =
      selectedChar.int = selectedChar.wis = selectedChar.chr = 8;
    return selectedChar;
  }

  return (
    <div>
      <label>Stat rolling rule:</label>
      <select data-cy='statRollSelect' value={ rollRule } onChange={ e => setRollRule(e.target.value) }>
        <option value='rollOnce'>Roll Once</option>
        <option value='rollTwice'>Roll Twice</option>
        <option value='assignment'>Stat Assignment</option>
        <option value='assignment2x'>Double Stat Assignment</option>
        <option value='roll4'>Roll 4 dice</option>
        <option value='add7Dice'>Add 7 Dice to 8</option>
      </select>
      {
        rollRule === 'rollOnce' &&
        <RollOnce
          selectedChar={ selectedChar }
          onUpdate={ onUpdate }
          gateway={ gateway }
        />
      }
      {
        rollRule === 'rollTwice' &&
        <RollTwice
          selectedChar={ selectedChar }
          onUpdate={ onUpdate }
          gateway={ gateway }
        />
      }
      {
        rollRule === 'assignment' &&
        <Assignment
          selectedChar={ selectedChar }
          onUpdate={ onUpdate }
          double={ false }
          gateway={ gateway }
        />
      }
      {
        rollRule === 'assignment2x' &&
        <Assignment
          selectedChar={ selectedChar }
          onUpdate={ onUpdate }
          double={ true }
          gateway={ gateway }
        />
      }
      {
        rollRule === 'roll4' &&
        <RollFour
          selectedChar={ selectedChar }
          onUpdate={ onUpdate }
          gateway={ gateway }
        />
      }
      {
        rollRule === 'add7Dice' &&
        <Add7Dice
          selectedChar={ setSelectedCharStatsTo8() }
          onUpdate={ onUpdate }
          gateway={ gateway }
        />
      }
    </div>
  );
}
