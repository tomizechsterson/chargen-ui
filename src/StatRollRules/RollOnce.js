import React, { Component } from 'react';
import RollOnceDisplay from './RollOnceDisplay';

export default class RollOnce extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedChar: {}, rolls: [] };

    this.rollStats = this.rollStats.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async rollStats() {
    const { selectedChar, gateway } = this.props;
    const rolls = await gateway.rollStats('rollstats/rollonce');
    selectedChar.str = rolls[0].reduce((a, b) => a + b, 0);
    selectedChar.dex = rolls[1].reduce((a, b) => a + b, 0);
    selectedChar.con = rolls[2].reduce((a, b) => a + b, 0);
    selectedChar.int = rolls[3].reduce((a, b) => a + b, 0);
    selectedChar.wis = rolls[4].reduce((a, b) => a + b, 0);
    selectedChar.chr = rolls[5].reduce((a, b) => a + b, 0);
    this.setState({ rolls: rolls, selectedChar: selectedChar });
  }

  handleUpdate() {
    const { selectedChar, onUpdate } = this.props;
    if (this.state.rolls.length === 0) {
      alert('must roll stats to save');
    } else {
      selectedChar.completionStep++;
      onUpdate(selectedChar);
    }
  }

  render() {
    return (
      <div>
        <button onClick={ this.rollStats }>Roll Stats</button>
        <br/>
        <p>Standard Stat Rolling. Roll once per stat and that's it.</p>
        <RollOnceDisplay selectedChar={ this.state.selectedChar } rolls={ this.state.rolls }/>
        <button onClick={ this.handleUpdate }>Save Stats</button>
      </div>
    );
  }
}
