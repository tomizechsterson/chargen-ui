import React from 'react';

const AssignmentControl = (props) => {
    const {stat, charStat, rolls} = props;
    const rollStyle = {
        color: '#999'
    };
    if(rolls.length === 1) {
        const roll = rolls[0];
        return (
            <div>
                <input type='button' onClick={() => props.onSelectStat(stat)} value={stat} /> {charStat}
                {roll && <input type='button' onClick={() => props.onSelectRoll(roll)} value={roll.value} disabled={roll.assigned} />}
                {roll && <span style={rollStyle}>{roll.text}</span>}
            </div>
        );
    }
    else {
        return (
            <div>
                <input type='button' onClick={() => props.onSelectStat(stat)} value={stat} /> {charStat}
                {rolls[0] && <input type='button' onClick={() => props.onSelectRoll(rolls[0])} value={rolls[0].value} disabled={rolls[0].assigned} />}
                {rolls[0] && <span style={rollStyle}>{rolls[0].text}</span>}
                {rolls[1] && <input type='button' onClick={() => props.onSelectRoll(rolls[1])} value={rolls[1].value} disabled={rolls[1].assigned} />}
                {rolls[1] && <span style={rollStyle}>{rolls[1].text}</span>}
            </div>
        );
    }

};
export default AssignmentControl;