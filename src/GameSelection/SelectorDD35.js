import React from 'react';
import DD35Characters from "../DD35/DD35Characters";

const SelectorDD35 = (props) => {
  const { gateway } = props;

  return (
    <DD35Characters
      gateway={ gateway }
    />
  );
};
export default SelectorDD35;
