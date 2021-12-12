import React from 'react';
import ADD2Characters from '../ADD2/ADD2Characters';

const SelectorADD2 = (props) => {
  const { gateway } = props;

  return (
    <div>
      <ADD2Characters
        serverGateway={ gateway }
      />
    </div>
  );
};
export default SelectorADD2;
