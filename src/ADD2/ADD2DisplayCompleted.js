import React from 'react';
import StatsDisplay from "./StatsDisplay";

const ADD2DisplayCompleted = (props) => {
    const {selectedChar} = props;
    return (
        <div>
            <h2>Character Details</h2>
            <div>
                <h4>{selectedChar.name}</h4>
                <p>Played by: {selectedChar.playedBy}</p>
                <p>Race: {selectedChar.race} Gender: {selectedChar.gender} Class: {selectedChar.className}</p>
                <p>Age: {selectedChar.age} Height: {selectedChar.height} Weight: {selectedChar.weight}</p>
                <StatsDisplay selectedChar={selectedChar}/>
            </div>
        </div>
    );
};
export default ADD2DisplayCompleted;