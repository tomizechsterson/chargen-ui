import React from 'react';
import ADD2Characters from '../ADD2/ADD2Characters';
import ServerGatewayADD2 from '../DataAccess/ServerGatewayADD2';
import internalTestData from "../ADD2/internalTestData";

const SelectorADD2 = () => {
  return (
    <div>
      <ADD2Characters
        useTestData={ true }
        testData={ internalTestData }
        serverGateway={ new ServerGatewayADD2() }
      />
    </div>
  );
};
export default SelectorADD2;
