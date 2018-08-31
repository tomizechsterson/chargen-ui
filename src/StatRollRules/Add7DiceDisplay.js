import React, {Component} from 'react';
import RollSelector from "./RollSelector";

export default class Add7DiceDisplay extends Component {
    constructor(props){
        super(props);

        this.state = {selectedStat: '', selectedRoll: undefined};

        this.handleSelectRoll = this.handleSelectRoll.bind(this);
    }

    handleSelectStat(stat) {
        if(this.state.selectedStat === stat)
            this.setState({selectedStat: ''});
        else
            this.setState({selectedStat: stat});
    }

    handleSelectRoll(roll) {
        if(this.state.selectedRoll && this.state.selectedRoll.id === roll.id)
            this.setState({selectedRoll: undefined});
        else
            this.setState({selectedRoll: roll});
    }

    handleAssign() {
        const {selectedChar, rolls} = this.props;
        const {selectedStat, selectedRoll} = this.state;

        if(selectedStat === 'STR')
            selectedChar.str += selectedRoll.value;
        else if(selectedStat === 'DEX')
            selectedChar.dex += selectedRoll.value;
        else if(selectedStat === 'CON')
            selectedChar.con += selectedRoll.value;
        else if(selectedStat === 'INT')
            selectedChar.int += selectedRoll.value;
        else if(selectedStat === 'WIS')
            selectedChar.wis += selectedRoll.value;
        else if(selectedStat === 'CHR')
            selectedChar.chr += selectedRoll.value;

        rolls.find(roll => roll.id === selectedRoll.id).assigned = true;
        this.setState({selectedRoll: undefined});
    }

    handleReset() {
        const {selectedChar, rolls} = this.props;
        selectedChar.str = selectedChar.dex = selectedChar.con =
            selectedChar.int = selectedChar.wis = selectedChar.chr = 8;
        rolls[0].assigned = rolls[1].assigned = rolls[2].assigned = rolls[3].assigned =
            rolls[4].assigned = rolls[5].assigned = rolls[6].assigned = false;
        this.setState({selectedStat: '', selectedRoll: undefined});
    }

    disableAssignButton() {
        return !this.state.selectedStat || !this.state.selectedRoll;
    }

    disableResetButton() {
        const {rolls} = this.props;
        return rolls.every(roll => !roll.assigned);
    }

    render() {
        const {selectedChar, rolls} = this.props;
        const {selectedRoll, selectedStat} = this.state;

        let selectedRollText = '';
        if(selectedRoll)
            selectedRollText = selectedRoll.value;

        return (
            <div>
                Selected Stat: {selectedStat}, Selected Roll: {selectedRollText} <br/>
                <button onClick={() => this.handleSelectStat('STR')}>STR</button> {selectedChar.str} <br/>
                <button onClick={() => this.handleSelectStat('DEX')}>DEX</button> {selectedChar.dex} <br/>
                <button onClick={() => this.handleSelectStat('CON')}>CON</button> {selectedChar.con} <br/>
                <button onClick={() => this.handleSelectStat('INT')}>INT</button> {selectedChar.int} <br/>
                <button onClick={() => this.handleSelectStat('WIS')}>WIS</button> {selectedChar.wis} <br/>
                <button onClick={() => this.handleSelectStat('CHR')}>CHR</button> {selectedChar.chr} <br/>
                <RollSelector rolls={rolls} onSelectRoll={this.handleSelectRoll}/>
                <button onClick={() => this.handleAssign()} disabled={this.disableAssignButton()}>Assign</button>
                <button onClick={() => this.handleReset()} disabled={this.disableResetButton()}>Reset</button>
            </div>
        );
    }
}