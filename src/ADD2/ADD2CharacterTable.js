import React from 'react';
import './ADD2CharacterTable.css';

const ADD2CharacterTable = (props) => {

    const completeStep = 2;
    const entries = props.characters;
    const rowItems = entries.map(function(item) {
        return <tr key={item.id} onClick={() => props.onCharacterSelect(item.id)}>
            <td>{item.name}</td>
            <td>{item.playedBy}</td>
            <td>{item.completionStep === completeStep ? 'Yes' : 'No'}</td>
        </tr>
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Played By</th>
                <th>Completed?</th>
            </tr>
            </thead>
            <tbody>
            {rowItems}
            </tbody>
        </table>
    );
};
export default ADD2CharacterTable;