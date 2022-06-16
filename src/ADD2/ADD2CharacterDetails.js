import React from 'react';
import ADD2DisplayCompleted from './ADD2DisplayCompleted';
import ADD2CharacterCreation from './ADD2CharacterCreation';

export default function ADD2CharacterDetails ({ selectedChar, onUpdate, gateway }) {
  const isOneSelected = Boolean(selectedChar);
  const completeStep = 6;

  return (
    <div>
      {
        isOneSelected && selectedChar.completionStep === completeStep &&
        <ADD2DisplayCompleted selectedChar={ selectedChar } />
      }
      {
        isOneSelected && selectedChar.completionStep < completeStep &&
        <ADD2CharacterCreation
          selectedChar={ selectedChar }
          onUpdate={ onUpdate }
          gateway={ gateway }
        />
      }
      {
        !isOneSelected && <p>No character selected</p>
      }
    </div>
  );
};
