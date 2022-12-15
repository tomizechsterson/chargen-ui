import React from 'react';

export default function StatAdjustmentDisplay ({ text, stat, adjustment }) {
  const displayStyle = {
    color: '#999',
    paddingLeft: '10px'
  };
  let adjustmentText = '';

  if (adjustment)
    adjustmentText = '( ' + adjustment + ' )';

  return (
    <div>
      {text} {stat}
      <span style={displayStyle}>{adjustmentText}</span>
    </div>
  );
};
