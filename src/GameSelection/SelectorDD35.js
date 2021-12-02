import React from 'react';
import DD35Characters from "../DD35/DD35Characters";
import ServerGatewayDD35 from "../DataAccess/ServerGatewayDD35";
import characters from "../DD35/localTestData";

const SelectorDD35 = () => {
  return (
    <DD35Characters
      gateway={ new ServerGatewayDD35() }
      useService={ false }
      localSeedData={ characters }
    />
  );
};
export default SelectorDD35;
