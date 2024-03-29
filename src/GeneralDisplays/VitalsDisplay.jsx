import React from 'react';

export default function VitalsDisplay ({ selectedChar }) {
  const feet = (inches) => {
    return Math.trunc(inches / 12);
  };
  const inches = (total) => {
    return total % 12;
  };
  return (
    <div>
      <p>
        Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className} Alignment: {selectedChar.alignment}
        <br/>
        Age: {selectedChar.age} Height: {feet(selectedChar.height)}'{inches(selectedChar.height)}"
        Weight: {selectedChar.weight}
      </p>
    </div>
  );
};
