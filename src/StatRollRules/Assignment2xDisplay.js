import React, {Component} from 'react';
import AssignmentControl from "./AssignmentControl";

export default class Assignment2xDisplay extends Component {
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
        const {selectedStat, selectedRoll} = this.state;
        const {selectedChar, rolls} = this.props;

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
        selectedChar.str = undefined; rolls[0].assigned = false; rolls[1].assigned = false;
        selectedChar.dex = undefined; rolls[2].assigned = false; rolls[3].assigned = false;
        selectedChar.con = undefined; rolls[4].assigned = false; rolls[5].assigned = false;
        selectedChar.int = undefined; rolls[6].assigned = false; rolls[7].assigned = false;
        selectedChar.wis = undefined; rolls[8].assigned = false; rolls[9].assigned = false;
        selectedChar.chr = undefined; rolls[10].assigned = false; rolls[11].assigned = false;
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

        let roll0 = undefined, roll1 = undefined, roll2 = undefined, roll3 = undefined,
            roll4 = undefined, roll5 = undefined, roll6 = undefined, roll7 = undefined,
            roll8 = undefined, roll9 = undefined, roll10 = undefined, roll11 = undefined;
        if(rolls.length > 0) {
            roll0 = rolls[0]; roll1 = rolls[1]; roll2 = rolls[2]; roll3 = rolls[3];
            roll4 = rolls[4]; roll5 = rolls[5]; roll6 = rolls[6]; roll7 = rolls[7];
            roll8 = rolls[8]; roll9 = rolls[9]; roll10 = rolls[10]; roll11 = rolls[11];
        }

        let selectedRollText = '';
        if(selectedRoll)
            selectedRollText = selectedRoll.value;

        return (
            <div>
                Selected Stat: {selectedStat}, Selected Roll: {selectedRollText} <br/>

                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'STR'} charStat={selectedChar.str} rolls={[roll0, roll1]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'DEX'} charStat={selectedChar.dex} rolls={[roll2, roll3]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CON'} charStat={selectedChar.con} rolls={[roll4, roll5]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'INT'} charStat={selectedChar.int} rolls={[roll6, roll7]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'WIS'} charStat={selectedChar.wis} rolls={[roll8, roll9]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CHR'} charStat={selectedChar.chr} rolls={[roll10, roll11]} />

                <input type='button' onClick={() => this.handleAssign()} value='Assign' disabled={this.disableAssignButton()} />
                <input type='button' onClick={() => this.resetAssignments()} value='Reset' disabled={this.disableResetButton()} />
            </div>
        );
    }
}