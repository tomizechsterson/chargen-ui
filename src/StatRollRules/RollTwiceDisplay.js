import React from 'react';

const RollTwiceDisplay = (props) => {
    const {selectedChar} = props;
    const rollsStyle = {
        color: '#999'
    };

    let formattedRollText = (roll) => {
        return '(' + roll.reduce((a, b) => a + b, 0) + ':  ' + roll.join(' + ') + ')';
    };

    let strRolls = '';
    let dexRolls = '';
    let conRolls = '';
    let intRolls = '';
    let wisRolls = '';
    let chrRolls = '';

    if(props.rolls.length > 0) {
        strRolls = formattedRollText(props.rolls[0]) + ', ' + formattedRollText(props.rolls[1]);
        dexRolls = formattedRollText(props.rolls[2]) + ', ' + formattedRollText(props.rolls[3]);
        conRolls = formattedRollText(props.rolls[4]) + ', ' + formattedRollText(props.rolls[5]);
        intRolls = formattedRollText(props.rolls[6]) + ', ' + formattedRollText(props.rolls[7]);
        wisRolls = formattedRollText(props.rolls[8]) + ', ' + formattedRollText(props.rolls[9]);
        chrRolls = formattedRollText(props.rolls[10]) + ', ' + formattedRollText(props.rolls[11]);
    }

    return (
        <p>
            STR: {selectedChar.str} <span style={rollsStyle}>{strRolls}</span><br/>
            DEX: {selectedChar.dex} <span style={rollsStyle}>{dexRolls}</span><br/>
            CON: {selectedChar.con} <span style={rollsStyle}>{conRolls}</span><br/>
            INT: {selectedChar.int} <span style={rollsStyle}>{intRolls}</span><br/>
            WIS: {selectedChar.wis} <span style={rollsStyle}>{wisRolls}</span><br/>
            CHR: {selectedChar.chr} <span style={rollsStyle}>{chrRolls}</span><br/>
        </p>
    );
};
export default RollTwiceDisplay;