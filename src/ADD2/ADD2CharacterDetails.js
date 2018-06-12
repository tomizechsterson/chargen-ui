import React from 'react';

const ADD2CharacterDetails = (props) => {
    const {selectedChar} = props;
    const isOneSelected = Boolean(selectedChar);
    const completeStep = 2;

    return (
        <div>
            {isOneSelected && selectedChar.completionStep === completeStep && <div>
                <button type="button" onClick={() => props.onDelete(selectedChar.id)}>Delete</button>
                <p>{selectedChar.name}</p></div>}
            {isOneSelected && selectedChar.completionStep < completeStep && <div>Creation component</div>}
            {!isOneSelected && <p>No character selected</p>}
        </div>
    );
};
export default ADD2CharacterDetails;