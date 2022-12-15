import React from 'react';
import ADD2Characters from '../ADD2/ADD2Characters';

export default function SelectorADD2 ({ gateway }) {
  return (
    <div>
      <ADD2Characters
        serverGateway={ gateway }
      />
    </div>
  );
};
