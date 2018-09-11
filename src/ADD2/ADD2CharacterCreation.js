import React from 'react';
import ADD2StatRoll from './ADD2StatRoll';
import ADD2RaceSelection from "./ADD2RaceSelection";
import ADD2ClassSelection from "./ADD2ClassSelection";

const ADD2CharacterCreation = (props) => {
    const {selectedChar, onUpdate, gateway} = props;
    return (
        <div>
            <h2>Character Creation</h2>
            <h3>{selectedChar.name}</h3>
            {selectedChar.completionStep === 1 &&
            <ADD2StatRoll selectedChar={selectedChar} gateway={gateway}
                          onUpdate={onUpdate} />}
            {selectedChar.completionStep === 2 &&
            <ADD2RaceSelection selectedChar={selectedChar} gateway={gateway}
                               onUpdate={onUpdate}/>}
            {selectedChar.completionStep === 3 &&
            <ADD2ClassSelection selectedChar={selectedChar} gateway={gateway}
                                onUpdate={onUpdate}/>}
        </div>
    );
};
export default ADD2CharacterCreation;