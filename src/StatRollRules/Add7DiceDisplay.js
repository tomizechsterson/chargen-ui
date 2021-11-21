import React, { Component } from 'react';
import RollSelector from "./RollSelector";

export default class Add7DiceDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedStat: '', selectedRoll: undefined };

    this.handleSelectRoll = this.handleSelectRoll.bind(this);
  }

  handleSelectStat(stat) {
    if (this.state.selectedStat === stat)
      this.setState({ selectedStat: '' });
    else
      this.setState({ selectedStat: stat });
  }

  handleSelectRoll(roll) {
    if (this.state.selectedRoll && this.state.selectedRoll.id === roll.id)
      this.setState({ selectedRoll: undefined });
    else
      this.setState({ selectedRoll: roll });
  }

  handleAssign() {
    const { selectedChar, rolls } = this.props;
    const { selectedStat, selectedRoll } = this.state;
    let exceeds18 = false;

    if (selectedStat === 'STR' && !Add7DiceDisplay.statWillExceedThreshold(selectedChar.str, selectedRoll.value))
      selectedChar.str += selectedRoll.value;
    else if (selectedStat === 'DEX' && !Add7DiceDisplay.statWillExceedThreshold(selectedChar.dex, selectedRoll.value))
      selectedChar.dex += selectedRoll.value;
    else if (selectedStat === 'CON' && !Add7DiceDisplay.statWillExceedThreshold(selectedChar.dex, selectedRoll.value))
      selectedChar.con += selectedRoll.value;
    else if (selectedStat === 'INT' && !Add7DiceDisplay.statWillExceedThreshold(selectedChar.dex, selectedRoll.value))
      selectedChar.int += selectedRoll.value;
    else if (selectedStat === 'WIS' && !Add7DiceDisplay.statWillExceedThreshold(selectedChar.dex, selectedRoll.value))
      selectedChar.wis += selectedRoll.value;
    else if (selectedStat === 'CHR' && !Add7DiceDisplay.statWillExceedThreshold(selectedChar.dex, selectedRoll.value))
      selectedChar.chr += selectedRoll.value;
    else
      exceeds18 = true;

    if (exceeds18)
      alert('Stat cannot exceed 18');
    else
      rolls.find(roll => roll.id === selectedRoll.id).assigned = true;

    this.setState({ selectedRoll: undefined });
  }

  handleReset() {
    const { selectedChar, rolls } = this.props;
    selectedChar.str = selectedChar.dex = selectedChar.con =
      selectedChar.int = selectedChar.wis = selectedChar.chr = 8;
    rolls[0].assigned = rolls[1].assigned = rolls[2].assigned = rolls[3].assigned =
      rolls[4].assigned = rolls[5].assigned = rolls[6].assigned = false;
    this.setState({ selectedStat: '', selectedRoll: undefined });
  }

  disableAssignButton() {
    return !this.state.selectedStat || !this.state.selectedRoll;
  }

  disableResetButton() {
    const { rolls } = this.props;
    return rolls.every(roll => !roll.assigned);
  }

  static statWillExceedThreshold(charStat, selectedRollValue) {
    return charStat + selectedRollValue > 18;
  }

  render() {
    const { selectedChar, rolls } = this.props;
    const { selectedRoll, selectedStat } = this.state;

    let selectedRollText = '';
    if (selectedRoll)
      selectedRollText = selectedRoll.value;

    return (
      <div data-cy='statAssignmentDiv'>
        Selected Stat: {selectedStat}, Selected Roll: {selectedRollText} <br/>
        <button data-cy='add7Stat' onClick={ () => this.handleSelectStat('STR') }>STR</button>
        {selectedChar.str} <br/>
        <button data-cy='add7Stat' onClick={ () => this.handleSelectStat('DEX') }>DEX</button>
        {selectedChar.dex} <br/>
        <button data-cy='add7Stat' onClick={ () => this.handleSelectStat('CON') }>CON</button>
        {selectedChar.con} <br/>
        <button data-cy='add7Stat' onClick={ () => this.handleSelectStat('INT') }>INT</button>
        {selectedChar.int} <br/>
        <button data-cy='add7Stat' onClick={ () => this.handleSelectStat('WIS') }>WIS</button>
        {selectedChar.wis} <br/>
        <button data-cy='add7Stat' onClick={ () => this.handleSelectStat('CHR') }>CHR</button>
        {selectedChar.chr} <br/>
        <RollSelector rolls={rolls} onSelectRoll={this.handleSelectRoll}/>
        <button onClick={ () => this.handleAssign() } disabled={ this.disableAssignButton() }>Assign</button>
        <button onClick={ () => this.handleReset() } disabled={ this.disableResetButton() }>Reset</button>
      </div>
    );
  }
}
