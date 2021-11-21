import React from 'react';

const RollFourDisplay = (props) => {
  const { selectedChar, rolls } = props;
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
    strRolls = rolls[0].sort(function(a, b) {
      return b - a
    }).join(' + ');
    dexRolls = rolls[1].sort(function(a, b) {
      return b - a
    }).join(' + ');
    conRolls = rolls[2].sort(function(a, b) {
      return b - a
    }).join(' + ');
    intRolls = rolls[3].sort(function(a, b) {
      return b - a
    }).join(' + ');
    wisRolls = rolls[4].sort(function(a, b) {
      return b - a
    }).join(' + ');
    chrRolls = rolls[5].sort(function(a, b) {
      return b - a
    }).join(' + ');
  }

  return (
    <p>
      STR: { selectedChar.str } <span style={ rollsStyle }>({ strRolls })</span><br/>
      DEX: { selectedChar.dex } <span style={ rollsStyle }>({ dexRolls })</span><br/>
      CON: { selectedChar.con } <span style={ rollsStyle }>({ conRolls })</span><br/>
      INT: { selectedChar.int } <span style={ rollsStyle }>({ intRolls })</span><br/>
      WIS: { selectedChar.wis } <span style={ rollsStyle }>({ wisRolls })</span><br/>
      CHR: { selectedChar.chr } <span style={ rollsStyle }>({ chrRolls })</span><br/>
    </p>
  );
};
export default RollFourDisplay;
