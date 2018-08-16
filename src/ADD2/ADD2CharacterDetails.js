import React from 'react';
import ADD2DisplayCompleted from './ADD2DisplayCompleted';
import ADD2CharacterCreation from './ADD2CharacterCreation';

const ADD2CharacterDetails = (props) => {
    const {selectedChar, onDelete, onUpdate} = props;
    const isOneSelected = Boolean(selectedChar);
    const completeStep = 2;

    return (
        <div>
            {isOneSelected && selectedChar.completionStep === completeStep &&
            <ADD2DisplayCompleted selectedChar={selectedChar} onDelete={onDelete} />}
            {isOneSelected && selectedChar.completionStep < completeStep &&
            <ADD2CharacterCreation selectedChar={selectedChar} onUpdate={onUpdate} />}
            {!isOneSelected && <p>No character selected</p>}
        </div>
    );
};
export default ADD2CharacterDetails;