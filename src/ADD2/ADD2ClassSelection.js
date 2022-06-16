import React from 'react';

export default function ADD2ClassSelection ({ selectedChar, onUpdate }) {
  function handleClassChange(e) {
    if (e.target.value) {
      saveCharacter(selectedChar, e.target.value, onUpdate);
    }
  }

  function saveCharacter(selectedChar, selectedClass, onUpdate) {
    selectedChar.className = selectedClass;
    selectedChar.completionStep++;
    onUpdate(selectedChar);
  }

  let id = 0;
  const options = selectedChar.availableClasses && selectedChar.availableClasses.map(function(item) {
    return <option key={id++} value={item}>{item}</option>
  });

  return (
    <div>
      STR: {selectedChar.str} <br/>
      DEX: {selectedChar.dex} <br/>
      CON: {selectedChar.con} <br/>
      INT: {selectedChar.int} <br/>
      WIS: {selectedChar.wis} <br/>
      CHR: {selectedChar.chr} <br/>
      Race: {selectedChar.race} Gender: {selectedChar.gender} <br/>
      Select Class:
      <select data-cy='classSelect' onChange={ handleClassChange }>
        <option key={ -1 } value=''/>
        {options}
      </select>
    </div>
  );
}
