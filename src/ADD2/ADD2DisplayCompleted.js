import React from 'react';
import StatsDisplay from '../GeneralDisplays/StatsDisplay';
import VitalsDisplay from '../GeneralDisplays/VitalsDisplay';
import SavingThrowsDisplay from '../GeneralDisplays/SavingThrowsDisplay';

const ADD2DisplayCompleted = (props) => {
    const {selectedChar} = props;
    return (
        <div>
            <h2>Character Details</h2>
            <div>
                <h4>{selectedChar.name}</h4>
                <VitalsDisplay selectedChar={selectedChar}/>
                <StatsDisplay selectedChar={selectedChar}/>
                <SavingThrowsDisplay selectedChar={selectedChar}/>
                <button onClick={() => props.onDelete(selectedChar.id)} >Delete</button>
            </div>
        </div>
    );
};
export default ADD2DisplayCompleted;