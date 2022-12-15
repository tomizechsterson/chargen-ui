import React from 'react';

export default function ADD2AlignmentSelection ({ selectedChar, onUpdate }) {
  function handleChange(e) {
    if (e.target.value) {
      saveCharacter(selectedChar, e.target.value);
    }
  }

  function saveCharacter(selectedChar, alignment) {
    selectedChar.alignment = alignment;
    selectedChar.completionStep++;
    onUpdate(selectedChar);
  }

  let id = 0;
  const options = selectedChar.availableAlignments && selectedChar.availableAlignments.map(function(item) {
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
      Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className} <br/>
      Select Alignment:
      <select data-cy='alignmentSelect' onChange={ handleChange }>
        <option key={ -1 } value=''/>
        {options}
      </select>
    </div>
  );
}
