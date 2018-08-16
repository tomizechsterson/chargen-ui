import React from 'react';

const RollOnceDisplay = (props) => {
    const {selectedChar, rolls} = props;
    const rollsStyle = {
        color: '#999'
    };

    let strRolls = '';
    let dexRolls = '';
    let conRolls = '';
    let intRolls = '';
    let wisRolls = '';
    let chrRolls = '';

    if(rolls.length > 0) {
        strRolls = rolls[0].join(' + ');
        dexRolls = rolls[1].join(' + ');
        conRolls = rolls[2].join(' + ');
        intRolls = rolls[3].join(' + ');
        wisRolls = rolls[4].join(' + ');
        chrRolls = rolls[5].join(' + ');
    }

    return (
        <p>
            STR: {selectedChar.str} <span style={rollsStyle}>({strRolls})</span><br/>
            DEX: {selectedChar.dex} <span style={rollsStyle}>({dexRolls})</span><br/>
            CON: {selectedChar.con} <span style={rollsStyle}>({conRolls})</span><br/>
            INT: {selectedChar.int} <span style={rollsStyle}>({intRolls})</span><br/>
            WIS: {selectedChar.wis} <span style={rollsStyle}>({wisRolls})</span><br/>
            CHR: {selectedChar.chr} <span style={rollsStyle}>({chrRolls})</span><br/>
        </p>
    );
};
export default RollOnceDisplay;