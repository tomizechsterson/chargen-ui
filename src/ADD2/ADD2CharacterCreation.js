import React from 'react';

const ADD2CharacterCreation = (props) => {
    const {selectedChar} = props;
    return (
        <div>
            <h2>Character Creation</h2>
            <h3>{selectedChar.name}</h3>
        </div>
    );
};
export default ADD2CharacterCreation;