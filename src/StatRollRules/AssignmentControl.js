import React from 'react';

const AssignmentControl = (props) => {
    const {stat, charStat, roll, rollStyle} = props;
    return (
        <div>
            <input type='button' onClick={() => props.onSelectStat(stat)} value={stat} /> {charStat}
            {roll && <input type='button' onClick={() => props.onSelectRoll(roll)} value={roll.value} disabled={roll.assigned} />}
            {roll && <span style={rollStyle}>{roll.text}</span>}
        </div>
    );
};
export default AssignmentControl;