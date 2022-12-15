import React, { useState } from 'react';
import DD35CharacterTable from "./DD35CharacterTable";
import DD35CharacterCreate from "./DD35CharacterCreate";

export default function DD35Characters ({ gateway }) {
  const [selectedChar, setSelectedChar] = useState(undefined);

  function handleSelect(character) {
    setSelectedChar(character);
  }

  function handleDeselect() {
    setSelectedChar(undefined);
  }

  return (
    <div>
      {
        selectedChar &&
        <DD35CharacterCreate
          selectedChar={ selectedChar }
          onClose={ handleDeselect }
        />
      }
      {
        !selectedChar &&
        <DD35CharacterTable
          onSelect={ handleSelect }
          gateway={ gateway }
        />
      }
    </div>
  );
}
