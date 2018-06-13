import React from 'react';
import ADD2DisplayCompleted from "./ADD2DisplayCompleted";

const ADD2CharacterDetails = (props) => {
    const {selectedChar} = props;
    const isOneSelected = Boolean(selectedChar);
    const completeStep = 2;

    return (
        <div>
            {isOneSelected && selectedChar.completionStep === completeStep &&
            <ADD2DisplayCompleted selectedChar={selectedChar} />}
            {isOneSelected && selectedChar.completionStep < completeStep && <div>Creation component</div>}
            {!isOneSelected && <p>No character selected</p>}
        </div>
    );
};
export default ADD2CharacterDetails;