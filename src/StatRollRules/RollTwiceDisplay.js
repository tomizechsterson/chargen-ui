import React from 'react';

const RollTwiceDisplay = (props) => {
    const {selectedChar} = props;
    const rollsStyle = {
        color: '#999'
    };

    let formatRollText = (roll) => {
        return '(' + roll.reduce((a, b) => a + b, 0) + ':  ' + roll.join(' + ') + ')';
    };

    let strRolls = '';
    let dexRolls = '';
    let conRolls = '';
    let intRolls = '';
    let wisRolls = '';
    let chrRolls = '';

    if(props.rolls.length > 0) {
        strRolls = formatRollText(props.rolls[0]) + ', ' + formatRollText(props.rolls[1]);
        dexRolls = formatRollText(props.rolls[2]) + ', ' + formatRollText(props.rolls[3]);
        conRolls = formatRollText(props.rolls[4]) + ', ' + formatRollText(props.rolls[5]);
        intRolls = formatRollText(props.rolls[6]) + ', ' + formatRollText(props.rolls[7]);
        wisRolls = formatRollText(props.rolls[8]) + ', ' + formatRollText(props.rolls[9]);
        chrRolls = formatRollText(props.rolls[10]) + ', ' + formatRollText(props.rolls[11]);
    }

    return (
        <p>
            STR: {selectedChar.str} <span style={rollsStyle}>{strRolls}</span> <br/>
            DEX: {selectedChar.dex} <span style={rollsStyle}>{dexRolls}</span><br/>
            CON: {selectedChar.con} <span style={rollsStyle}>{conRolls}</span><br/>
            INT: {selectedChar.int} <span style={rollsStyle}>{intRolls}</span><br/>
            WIS: {selectedChar.wis} <span style={rollsStyle}>{wisRolls}</span><br/>
            CHR: {selectedChar.chr} <span style={rollsStyle}>{chrRolls}</span><br/>
        </p>
    );
};
export default RollTwiceDisplay;