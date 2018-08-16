import React from 'react';
import ADD2StatRoll from './ADD2StatRoll';

const ADD2CharacterCreation = (props) => {
    const {selectedChar} = props;
    return (
        <div>
            <h2>Character Creation</h2>
            <h3>{selectedChar.name}</h3>
            {selectedChar.completionStep < 2 &&
            <ADD2StatRoll selectedChar={selectedChar}
                          onUpdate={props.onUpdate} />}
        </div>
    );
};
export default ADD2CharacterCreation;