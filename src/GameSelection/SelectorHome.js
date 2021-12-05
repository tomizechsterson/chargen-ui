import React from 'react';

const SelectorHome = (props) => {
  const { onSelectService } = props;
  return (
    <div>
      <p>To get started, select a data store below, and select a game above.</p>
      <select onChange={ onSelectService }>
        <option value='' />
        <option value='local'>Local Storage</option>
        <option value='netcore'>.NET Core</option>
      </select>
    </div>
  );
};
export default SelectorHome;
