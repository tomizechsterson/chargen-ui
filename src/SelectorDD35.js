import React from 'react';
import DD35Characters from "./DD35/DD35Characters";
import ServerGatewayDD35 from "./ServerGatewayDD35";

const SelectorDD35 = () => {
    return (
        <DD35Characters gateway={new ServerGatewayDD35()}/>
    );
};
export default SelectorDD35;