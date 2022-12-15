import React from 'react';

export default function DD35CharacterCreate({ onClose, selectedChar }) {
  return (
    <div>
      <h4>{selectedChar.name}</h4>
      <button onClick={() => onClose()}>Close</button>
    </div>
  );
}
