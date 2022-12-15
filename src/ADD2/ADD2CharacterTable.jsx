import React from 'react';
import './ADD2CharacterTable.css';

export default function ADD2CharacterTable ({ characters, onSelect }) {
  const completeStep = 6;
  const rowItems = characters.map(function(item) {
    return <tr key={item.id} onClick={ () => onSelect(item.id) }>
      <td>{item.name}</td>
      <td>{item.race}</td>
      <td>{item.className}</td>
      <td>{item.completionStep === completeStep ? 'Yes' : 'No'}</td>
    </tr>
  });

  if (rowItems.length > 0) {
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
  } else {
    return (
      <p>No characters have been created. Enter a name in the field above and click Create to begin</p>
    );
  }
};
