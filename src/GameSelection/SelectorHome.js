import React from 'react';

export default function SelectorHome ({ onSelectService, selectedService }) {
  return (
    <div>
      <p>To get started, select a data store below, and select a game above.</p>
      <select data-cy='serviceSelect' value={ selectedService } onChange={ onSelectService }>
        <option value='' />
        <option value='local'>Local Storage</option>
        <option value='netcore'>.NET Core</option>
      </select>
    </div>
  );
};
