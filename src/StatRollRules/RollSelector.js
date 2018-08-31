import React from 'react';

const RollSelector = (props) => {
    const {rolls, onSelectRoll} = props;
    const buttons = rolls.map(function(roll) {
        return <button key={roll.id} onClick={() => onSelectRoll(roll)} disabled={roll.assigned}>{roll.value}</button>
    });

    return (
        <div>
            {buttons}
        </div>
    );
};
export default RollSelector;