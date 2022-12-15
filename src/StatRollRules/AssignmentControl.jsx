import React from 'react';

export default function AssignmentControl ({ stat, charStat, rolls, onSelectStat, onSelectRoll }) {
  const rollStyle = {
    color: '#999'
  };
  if (rolls.length === 1) {
    const roll = rolls[0];
    return (
      <div data-cy={ 'singleAssignmentSelector' + stat }>
        <input
          type='button'
          onClick={ () => onSelectStat(stat) }
          value={ stat }
        />
        { charStat }
        {
          roll &&
          <input
            data-cy={ 'roll' + roll.id }
            type='button'
            onClick={ () => onSelectRoll(roll) }
            value={ roll.value }
            disabled={ roll.assigned }
          />
        }
        {
          roll &&
          <span data-testid={`${stat}_roll`} style={ rollStyle }>{ roll.text }</span>
        }
      </div>
    );
  } else {
    return (
      <div data-cy={'doubleAssignmentSelector' + stat}>
        <input
          type='button'
          onClick={ () => onSelectStat(stat) }
          value={ stat }
        />
        { charStat }
        {
          rolls[0] &&
          <input
            data-cy={ 'roll' + rolls[0].id }
            type='button'
            onClick={ () => onSelectRoll(rolls[0]) }
            value={ rolls[0].value }
            disabled={ rolls[0].assigned }
          />
        }
        {
          rolls[0] &&
          <span data-testid={`${stat}_roll1`} style={ rollStyle }>{ rolls[0].text }</span>
        }
        {
          rolls[1] &&
          <input
            data-cy={ 'roll' + rolls[1].id }
            type='button'
            onClick={ () => onSelectRoll(rolls[1]) }
            value={ rolls[1].value }
            disabled={ rolls[1].assigned }
          />
        }
        {
          rolls[1] &&
          <span data-testid={`${stat}_roll2`} style={ rollStyle }>{ rolls[1].text }</span>
        }
      </div>
    );
  }
};
