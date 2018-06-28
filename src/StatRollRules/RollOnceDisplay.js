import React from 'react';

const RollOnceDisplay = (props) => {
    const {selectedChar} = props;
    const rollsStyle = {
        color: '#999'
    };

    let strRolls = '';
    let dexRolls = '';
    let conRolls = '';
    let intRolls = '';
    let wisRolls = '';
    let chrRolls = '';

    if(props.rolls[0] !== undefined)
        strRolls = props.rolls[0].join(' + ');
    if(props.rolls[1] !== undefined)
        dexRolls = props.rolls[1].join(' + ');
    if(props.rolls[2] !== undefined)
        conRolls = props.rolls[2].join(' + ');
    if(props.rolls[3] !== undefined)
        intRolls = props.rolls[3].join(' + ');
    if(props.rolls[4] !== undefined)
        wisRolls = props.rolls[4].join(' + ');
    if(props.rolls[5] !== undefined)
        chrRolls = props.rolls[5].join(' + ');

    return (
        <p>
            STR: {selectedChar.str} <span style={rollsStyle}>({strRolls})</span> <br/>
            DEX: {selectedChar.dex} <span style={rollsStyle}>({dexRolls})</span><br/>
            CON: {selectedChar.con} <span style={rollsStyle}>({conRolls})</span><br/>
            INT: {selectedChar.int} <span style={rollsStyle}>({intRolls})</span><br/>
            WIS: {selectedChar.wis} <span style={rollsStyle}>({wisRolls})</span><br/>
            CHR: {selectedChar.chr} <span style={rollsStyle}>({chrRolls})</span><br/>
        </p>
    );
};
export default RollOnceDisplay;