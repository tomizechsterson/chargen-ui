import React from 'react';

const ADD2CharacterDetails = (props) => {
    const {selectedChar} = props;
    const isOneSelected = Boolean(selectedChar);

    return (
        <div>
            {isOneSelected && <p>{selectedChar.name}</p>}
            {!isOneSelected && <p>No character selected</p>}
        </div>
    );
};
export default ADD2CharacterDetails;