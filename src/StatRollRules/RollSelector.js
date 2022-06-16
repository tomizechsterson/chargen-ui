import React from 'react';

export default function RollSelector ({ rolls, onSelectRoll }) {
  const buttons = rolls.map(function(roll) {
    return <button
      key={ roll.id }
      onClick={ () => onSelectRoll(roll) }
      disabled={ roll.assigned }
    >
      { roll.value }
    </button>
  });

  return (
    <div data-testid='add7Rolls' data-cy='add7Rolls'>
      {buttons}
    </div>
  );
};
