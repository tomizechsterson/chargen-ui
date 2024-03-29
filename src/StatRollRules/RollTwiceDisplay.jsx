import React from 'react';

export default function RollTwiceDisplay ({ selectedChar, rolls }) {
  const rollsStyle = {
    color: '#999'
  };

  let formattedRollText = (roll) => {
    return '(' + roll.reduce((a, b) => a + b, 0) + ':  ' + roll.join(' + ') + ')';
  };

  let strRolls = '';
  let dexRolls = '';
  let conRolls = '';
  let intRolls = '';
  let wisRolls = '';
  let chrRolls = '';

  if (rolls.length > 0) {
    strRolls = formattedRollText(rolls[0]) + ', ' + formattedRollText(rolls[1]);
    dexRolls = formattedRollText(rolls[2]) + ', ' + formattedRollText(rolls[3]);
    conRolls = formattedRollText(rolls[4]) + ', ' + formattedRollText(rolls[5]);
    intRolls = formattedRollText(rolls[6]) + ', ' + formattedRollText(rolls[7]);
    wisRolls = formattedRollText(rolls[8]) + ', ' + formattedRollText(rolls[9]);
    chrRolls = formattedRollText(rolls[10]) + ', ' + formattedRollText(rolls[11]);
  }

  return (
    <p>
      STR: { selectedChar.str } <span data-testid='strRoll' style={ rollsStyle }>{ strRolls }</span><br/>
      DEX: { selectedChar.dex } <span data-testid='dexRoll' style={ rollsStyle }>{ dexRolls }</span><br/>
      CON: { selectedChar.con } <span data-testid='conRoll' style={ rollsStyle }>{ conRolls }</span><br/>
      INT: { selectedChar.int } <span data-testid='intRoll' style={ rollsStyle }>{ intRolls }</span><br/>
      WIS: { selectedChar.wis } <span data-testid='wisRoll' style={ rollsStyle }>{ wisRolls }</span><br/>
      CHR: { selectedChar.chr } <span data-testid='chrRoll' style={ rollsStyle }>{ chrRolls }</span><br/>
    </p>
  );
};
