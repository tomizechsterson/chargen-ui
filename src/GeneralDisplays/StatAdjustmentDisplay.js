import React from 'react';

const StatAdjustmentDisplay = (props) => {
    const {text, stat, adjustment} = props;
    const displayStyle = {
        color: '#999',
        paddingLeft: '10px'
    };
    let adjustmentText = '';

    if(adjustment)
        adjustmentText = '( ' + adjustment + ' )';

    return(
        <div>
            {text} {stat}
            <span style={displayStyle}>{adjustmentText}</span>
        </div>
    );
};
export default StatAdjustmentDisplay;
