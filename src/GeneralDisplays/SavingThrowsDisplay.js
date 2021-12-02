import React from 'react';

const SavingThrowsDisplay = (props) => {
  const { selectedChar } = props;
  return (
    <div>
      <h4>Saving Throws</h4>
      <p>
        Paralyzation, Poison, Death Magic: { selectedChar.paralyze } <br/>
        Rod, Staff, Wand: { selectedChar.rod } <br/>
        Petrification, Polymorph: { selectedChar.petrification } <br/>
        Breath Weapon: { selectedChar.breath } <br/>
        Spell: { selectedChar.spell } <br/>
      </p>
    </div>
  );
};
export default SavingThrowsDisplay;
