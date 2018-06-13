import React from 'react';
import './ADD2CharacterTable.css';

const ADD2CharacterTable = (props) => {

    const completeStep = 2;
    const entries = props.characters;
    const rowItems = entries.map(function(item) {
        return <tr key={item.id} onClick={() => props.onSelect(item.id)}>
            <td>{item.name}</td>
            <td>{item.race}</td>
            <td>{item.className}</td>
            <td>{item.completionStep === completeStep ? 'Yes' : 'No'}</td>
        </tr>
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Race</th>
                <th>Class</th>
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