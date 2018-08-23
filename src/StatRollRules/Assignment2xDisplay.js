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

        let strRoll1 = undefined, strRoll2 = undefined, dexRoll1 = undefined, dexRoll2 = undefined,
            conRoll1 = undefined, conRoll2 = undefined, intRoll1 = undefined, intRoll2 = undefined,
            wisRoll1 = undefined, wisRoll2 = undefined, chrRoll1 = undefined, chrRoll2 = undefined;
        if(rolls.length > 0) {
            strRoll1 = rolls[0]; strRoll2 = rolls[1]; dexRoll1 = rolls[2]; dexRoll2 = rolls[3];
            conRoll1 = rolls[4]; conRoll2 = rolls[5]; intRoll1 = rolls[6]; intRoll2 = rolls[7];
            wisRoll1 = rolls[8]; wisRoll2 = rolls[9]; chrRoll1 = rolls[10]; chrRoll2 = rolls[11];
        }

        let selectedRollText = '';
        if(selectedRoll)
            selectedRollText = selectedRoll.value;

        return (
            <div>
                Selected Stat: {selectedStat}, Selected Roll: {selectedRollText} <br/>

                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'STR'} charStat={selectedChar.str} rolls={[strRoll1, strRoll2]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'DEX'} charStat={selectedChar.dex} rolls={[dexRoll1, dexRoll2]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CON'} charStat={selectedChar.con} rolls={[conRoll1, conRoll2]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'INT'} charStat={selectedChar.int} rolls={[intRoll1, intRoll2]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'WIS'} charStat={selectedChar.wis} rolls={[wisRoll1, wisRoll2]} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CHR'} charStat={selectedChar.chr} rolls={[chrRoll1, chrRoll2]} />

                <input type='button' onClick={() => this.handleAssign()} value='Assign' disabled={this.disableAssignButton()} />
                <input type='button' onClick={() => this.resetAssignments()} value='Reset' disabled={this.disableResetButton()} />
            </div>
        );
    }
}