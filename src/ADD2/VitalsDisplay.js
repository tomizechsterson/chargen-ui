import React from 'react';

const VitalsDisplay = (props) => {
    const {selectedChar} = props;
    return (
        <div>
            <p>Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className}</p>
            <p>Age: {selectedChar.age} Height: {selectedChar.height} Weight: {selectedChar.weight}</p>
        </div>
    );
};
export default VitalsDisplay;