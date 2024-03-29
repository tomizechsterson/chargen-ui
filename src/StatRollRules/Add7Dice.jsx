import React, { Component } from 'react';
import Add7DiceDisplay from "./Add7DiceDisplay";

export default class Add7Dice extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedChar: {}, rolls: [] };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.rollStats = this.rollStats.bind(this);
  }

  async rollStats() {
    const { gateway } = this.props;
    let currentChar = { ...this.state.selectedChar };
    currentChar.str = currentChar.dex = currentChar.con =
      currentChar.int = currentChar.wis = currentChar.chr = 8;
    let statRolls = [];

    const rolls = await gateway.rollStats('rollstats/AddSevenDice');
    for (let i = 0; i < rolls.length; i++) {
      statRolls.push({ id: i, assigned: false, value: rolls[i][0] });
    }
    this.setState({ rolls: statRolls, selectedChar: currentChar });
  }

  handleUpdate() {
    const { rolls, selectedChar } = this.state;
    if (rolls.length === 0) {
      alert('must roll stats and assign all to save');
    } else if (rolls.some((r) => {
      return !r.assigned
    })) {
      alert('must assign all rolls to save');
    } else {
      // noinspection DuplicatedCode
      this.props.selectedChar.str = selectedChar.str;
      this.props.selectedChar.dex = selectedChar.dex;
      this.props.selectedChar.con = selectedChar.con;
      this.props.selectedChar.int = selectedChar.int;
      this.props.selectedChar.wis = selectedChar.wis;
      this.props.selectedChar.chr = selectedChar.chr;
      this.props.selectedChar.completionStep++;
      this.props.onUpdate(this.props.selectedChar);
    }
  }

  render() {
    return (
      <div>
        <button onClick={ this.rollStats }>Roll Stats</button>
        <p>All stats start at 8, and 7 dice are added</p>
        <Add7DiceDisplay selectedChar={ this.state.selectedChar } rolls={ this.state.rolls }/>
        <button onClick={ this.handleUpdate }>Save Stats</button>
      </div>
    );
  }
}
