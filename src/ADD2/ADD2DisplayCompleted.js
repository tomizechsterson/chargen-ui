import React from 'react';

const ADD2DisplayCompleted = (props) => {
    return (
        <div>
            <h2>Character Details</h2>
            <div>
                <h3>{props.selectedCharacter.name}</h3>
                <p>Played by: {props.selectedCharacter.playedBy}</p>
            </div>
        </div>
    );
};
export default ADD2DisplayCompleted;