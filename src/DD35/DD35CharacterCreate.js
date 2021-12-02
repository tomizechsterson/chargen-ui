import React, { Component } from 'react';

export default class DD35CharacterCreate extends Component {
  render() {
    const { onClose, selectedChar } = this.props;

    return (
      <div>
        <h4>{selectedChar.name}</h4>
        <button onClick={ () => onClose() }>Close</button>
      </div>
    );
  }
}
