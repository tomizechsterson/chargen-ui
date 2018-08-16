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
        if(this.state.selectedStat === 'STR')
            this.props.selectedChar.str = this.state.selectedRoll.value;
        else if(this.state.selectedStat === 'DEX')
            this.props.selectedChar.dex = this.state.selectedRoll.value;
        else if(this.state.selectedStat === 'CON')
            this.props.selectedChar.con = this.state.selectedRoll.value;
        else if(this.state.selectedStat === 'INT')
            this.props.selectedChar.int = this.state.selectedRoll.value;
        else if(this.state.selectedStat === 'WIS')
            this.props.selectedChar.wis = this.state.selectedRoll.value;
        else if(this.state.selectedStat === 'CHR')
            this.props.selectedChar.chr = this.state.selectedRoll.value;

        const id = this.state.selectedRoll.id;
        this.props.rolls.find(roll => roll.id === id).assigned = true;
        this.setState({selectedStat: '', selectedRoll: undefined});
    }

    resetAssignments() {
        this.props.selectedChar.str = undefined; this.props.rolls[0].assigned = false;
        this.props.selectedChar.dex = undefined; this.props.rolls[1].assigned = false;
        this.props.selectedChar.con = undefined; this.props.rolls[2].assigned = false;
        this.props.selectedChar.int = undefined; this.props.rolls[3].assigned = false;
        this.props.selectedChar.wis = undefined; this.props.rolls[4].assigned = false;
        this.props.selectedChar.chr = undefined; this.props.rolls[5].assigned = false;
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
        const {selectedChar} = this.props;
        const {rolls} = this.props;
        const rollsStyle = {
            color: '#999'
        };

        let roll0 = undefined, roll1 = undefined, roll2 = undefined, roll3 = undefined,
            roll4 = undefined, roll5 = undefined, roll6 = undefined, roll7 = undefined,
            roll8 = undefined, roll9 = undefined, roll10 = undefined, roll11 = undefined;
        let selectedRollText = '';
        if(this.state.selectedRoll)
            selectedRollText = this.state.selectedRoll.value;

        if(this.props.rolls.length > 0) {
            roll0 = rolls[0]; roll1 = rolls[1]; roll2 = rolls[2]; roll3 = rolls[3];
            roll4 = rolls[4]; roll5 = rolls[5]; roll6 = rolls[6]; roll7 = rolls[7];
            roll8 = rolls[8]; roll9 = rolls[9]; roll10 = rolls[10]; roll11 = rolls[11];
        }

        return (
            <div>
                Selected Stat: {this.state.selectedStat}, Selected Roll: {selectedRollText} <br/>

                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'STR'} charStat={selectedChar.str} rolls={[roll0, roll1]} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'DEX'} charStat={selectedChar.dex} rolls={[roll2, roll3]} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CON'} charStat={selectedChar.con} rolls={[roll4, roll5]} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'INT'} charStat={selectedChar.int} rolls={[roll6, roll7]} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'WIS'} charStat={selectedChar.wis} rolls={[roll8, roll9]} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CHR'} charStat={selectedChar.chr} rolls={[roll10, roll11]} rollStyle={rollsStyle} />

                <input type='button' onClick={() => this.handleAssign()} value='Assign' disabled={this.disableAssignButton()} />
                <input type='button' onClick={() => this.resetAssignments()} value='Reset' disabled={this.disableResetButton()} />
            </div>
        );
    }
}