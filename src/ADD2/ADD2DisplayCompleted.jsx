import React from 'react';
import StatsDisplay from '../GeneralDisplays/StatsDisplay';
import VitalsDisplay from '../GeneralDisplays/VitalsDisplay';
import SavingThrowsDisplay from '../GeneralDisplays/SavingThrowsDisplay';

export default function ADD2DisplayCompleted ({ selectedChar }) {
  return (
    <div>
      <h2>Character Details</h2>
      <div>
        <h4>{selectedChar.name}</h4>
        <VitalsDisplay selectedChar={ selectedChar }/>
        <StatsDisplay selectedChar={ selectedChar }/>
        <SavingThrowsDisplay selectedChar={ selectedChar }/>
      </div>
    </div>
  );
};
