import React, {Component} from 'react';
import AssignmentControl from './AssignmentControl';

export default class AssignmentDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedStat: '', selectedRoll: undefined};

        this.handleSelectStat = this.handleSelectStat.bind(this);
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
            selectedChar.str = selectedRoll.value;
        else if(selectedStat === 'DEX')
            selectedChar.dex = selectedRoll.value;
        else if(selectedStat === 'CON')
            selectedChar.con = selectedRoll.value;
        else if(selectedStat === 'INT')
            selectedChar.int = selectedRoll.value;
        else if(selectedStat === 'WIS')
            selectedChar.wis = selectedRoll.value;
        else if(selectedStat === 'CHR')
            selectedChar.chr = selectedRoll.value;

        const id = selectedRoll.id;
        rolls.find(roll => roll.id === id).assigned = true;
        this.setState({selectedStat: '', selectedRoll: undefined});
    }

    resetAssignments() {
        const {selectedChar, rolls} = this.props;
        selectedChar.str = undefined; rolls[0].assigned = false;
        selectedChar.dex = undefined; rolls[1].assigned = false;
        selectedChar.con = undefined; rolls[2].assigned = false;
        selectedChar.int = undefined; rolls[3].assigned = false;
        selectedChar.wis = undefined; rolls[4].assigned = false;
        selectedChar.chr = undefined; rolls[5].assigned = false;
        this.setState({selectedStat: '', selectedRoll: undefined});
    }

    disableAssignButton() {
        return !this.state.selectedStat || !this.state.selectedRoll;
    }

    disableResetButton() {
        const {selectedChar} = this.props;
        return !selectedChar.str && !selectedChar.dex && !selectedChar.con
            && !selectedChar.int && !selectedChar.wis && !selectedChar.chr;
    }

    render() {
        const {selectedChar, rolls} = this.props;
        const {selectedRoll, selectedStat} = this.state;

        let strRoll = undefined, dexRoll = undefined, conRoll = undefined,
            intRoll = undefined, wisRoll = undefined, chrRoll = undefined;
        if(rolls.length > 0) {
            strRoll = rolls[0]; dexRoll = rolls[1]; conRoll = rolls[2];
            intRoll = rolls[3]; wisRoll = rolls[4]; chrRoll = rolls[5];
        }

        let selectedRollText = '';
        if(selectedRoll)
            selectedRollText = selectedRoll.value;

        return (
            <div>
                Selected Stat: {selectedStat}, Selected Roll: {selectedRollText} <br/>

                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'STR'} charStat={selectedChar.str} rolls={[strRoll]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'DEX'} charStat={selectedChar.dex} rolls={[dexRoll]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CON'} charStat={selectedChar.con} rolls={[conRoll]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'INT'} charStat={selectedChar.int} rolls={[intRoll]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'WIS'} charStat={selectedChar.wis} rolls={[wisRoll]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CHR'} charStat={selectedChar.chr} rolls={[chrRoll]} />

                <input type='button' onClick={() => this.handleAssign()} value='Assign' disabled={this.disableAssignButton()} />
                <input type='button' onClick={() => this.resetAssignments()} value='Reset' disabled={this.disableResetButton()} />
            </div>
        );
    }
}