import React from 'react';

const StatsDisplay = (props) => {
    const {selectedChar} = props;
    return (
        <div>
            <p>
                STR: {selectedChar.str} <br/>
                DEX: {selectedChar.dex} <br/>
                CON: {selectedChar.con} <br/>
                INT: {selectedChar.int} <br/>
                WIS: {selectedChar.wis} <br/>
                CHR: {selectedChar.chr} <br/>
            </p>
            <p>
                HP: {selectedChar.hp} <br/>
                Movement Rate: {selectedChar.moveRate} <br/>
                Funds: {selectedChar.funds} gp
            </p>
        </div>
    );
};
export default StatsDisplay;
