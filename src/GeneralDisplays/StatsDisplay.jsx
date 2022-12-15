import React from 'react';

export default function StatsDisplay ({ selectedChar }) {
  return (
    <div>
      <p>
        STR: {selectedChar.str} <br/>
        DEX: {selectedChar.dex} <br/>
        CON: {selectedChar.con} <br/>
        INT: {selectedChar.int} <br/>
        WIS: {selectedChar.wis} <br/>
        CHR: {selectedChar.chr} <br/>
      </p>
      <p>
        HP: {selectedChar.hp} <br/>
        Movement Rate: {selectedChar.moveRate} <br/>
        Funds: {selectedChar.funds} gp
      </p>
    </div>
  );
};
