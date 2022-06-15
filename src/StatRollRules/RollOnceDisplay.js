import React from 'react';

export default function RollOnceDisplay ({ selectedChar, rolls }) {
  const rollsStyle = {
    color: '#999'
  };

  let strRolls = '';
  let dexRolls = '';
  let conRolls = '';
  let intRolls = '';
  let wisRolls = '';
  let chrRolls = '';

  if (rolls.length > 0) {
    strRolls = rolls[0].join(' + ');
    dexRolls = rolls[1].join(' + ');
    conRolls = rolls[2].join(' + ');
    intRolls = rolls[3].join(' + ');
    wisRolls = rolls[4].join(' + ');
    chrRolls = rolls[5].join(' + ');
  }

  return (
    <p>
      STR: { selectedChar.str } <span data-testid='strRoll' style={ rollsStyle }>({ strRolls })</span><br/>
      DEX: { selectedChar.dex } <span data-testid='dexRoll' style={ rollsStyle }>({ dexRolls })</span><br/>
      CON: { selectedChar.con } <span data-testid='conRoll' style={ rollsStyle }>({ conRolls })</span><br/>
      INT: { selectedChar.int } <span data-testid='intRoll' style={ rollsStyle }>({ intRolls })</span><br/>
      WIS: { selectedChar.wis } <span data-testid='wisRoll' style={ rollsStyle }>({ wisRolls })</span><br/>
      CHR: { selectedChar.chr } <span data-testid='chrRoll' style={ rollsStyle }>({ chrRolls })</span><br/>
    </p>
  );
};
