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

        let strRoll = undefined, dexRoll = undefined, conRoll = undefined,
            intRoll = undefined, wisRoll = undefined, chrRoll = undefined;
        let selectedRollText = '';
        if(this.state.selectedRoll)
            selectedRollText = this.state.selectedRoll.value;

        if(this.props.rolls.length > 0) {
            strRoll = rolls[0]; dexRoll = rolls[1]; conRoll = rolls[2];
            intRoll = rolls[3]; wisRoll = rolls[4]; chrRoll = rolls[5];
        }

        return (
            <div>
                Selected Stat: {this.state.selectedStat}, Selected Roll: {selectedRollText} <br/>

                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'STR'} charStat={selectedChar.str} roll={strRoll} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'DEX'} charStat={selectedChar.dex} roll={dexRoll} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CON'} charStat={selectedChar.con} roll={conRoll} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'INT'} charStat={selectedChar.int} roll={intRoll} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'WIS'} charStat={selectedChar.wis} roll={wisRoll} rollStyle={rollsStyle} />
                <AssignmentControl onSelectStat={this.handleSelectStat} onSelectRoll={this.handleSelectRoll}
                                   stat={'CHR'} charStat={selectedChar.chr} roll={chrRoll} rollStyle={rollsStyle} />

                <input type='button' onClick={() => this.handleAssign()} value='Assign' disabled={this.disableAssignButton()} />
                <input type='button' onClick={() => this.resetAssignments()} value='Reset' disabled={this.disableResetButton()} />
            </div>
        );
    }
}