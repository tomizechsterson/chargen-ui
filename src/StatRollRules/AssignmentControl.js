import React from 'react';

const AssignmentControl = (props) => {
    return (
        <div>
            <input type='button' onClick={() => props.onSelectStat(props.stat)} value={props.stat} /> {props.charStat}
            {props.roll && <input type='button' onClick={() => props.onSelectRoll(props.roll)} value={props.roll.value} disabled={props.roll.assigned} />}
            {props.roll && <span style={props.rollStyle}>{props.roll.text}</span>}
        </div>
    );
};
export default AssignmentControl;