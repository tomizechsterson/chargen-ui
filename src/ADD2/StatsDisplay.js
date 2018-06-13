import React from 'react';

const StatsDisplay = (props) => {
    const {selectedChar} = props;
    return (
        <p>
            STR: {selectedChar.str} <br/>
            DEX: {selectedChar.dex} <br/>
            CON: {selectedChar.con} <br/>
            INT: {selectedChar.int} <br/>
            WIS: {selectedChar.wis} <br/>
            CHR: {selectedChar.chr} <br/>
        </p>
    );
};
export default StatsDisplay