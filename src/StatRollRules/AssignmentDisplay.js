import React, {Component} from 'react';

export default class AssignmentDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedStat: '', selectedRoll: undefined};
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

                <input type='button' onClick={() => this.handleSelectStat('STR')} value='STR' /> {selectedChar.str}
                {strRoll && <input type='button' onClick={() => this.handleSelectRoll(strRoll)} value={strRoll.value} disabled={strRoll.assigned} />}
                {strRoll && <span style={rollsStyle}>{strRoll.text}</span>}<br/>
                <input type='button' onClick={() => this.handleSelectStat('DEX')} value='DEX' /> {selectedChar.dex}
                {dexRoll && <input type='button' onClick={() => this.handleSelectRoll(dexRoll)} value={dexRoll.value} disabled={dexRoll.assigned} />}
                {dexRoll && <span style={rollsStyle}>{dexRoll.text}</span>}<br/>
                <input type='button' onClick={() => this.handleSelectStat('CON')} value='CON' /> {selectedChar.con}
                {conRoll && <input type='button' onClick={() => this.handleSelectRoll(conRoll)} value={conRoll.value} disabled={conRoll.assigned} />}
                {conRoll && <span style={rollsStyle}>{conRoll.text}</span>}<br/>
                <input type='button' onClick={() => this.handleSelectStat('INT')} value='INT' /> {selectedChar.int}
                {intRoll && <input type='button' onClick={() => this.handleSelectRoll(intRoll)} value={intRoll.value} disabled={intRoll.assigned} />}
                {intRoll && <span style={rollsStyle}>{intRoll.text}</span>}<br/>
                <input type='button' onClick={() => this.handleSelectStat('WIS')} value='WIS' /> {selectedChar.wis}
                {wisRoll && <input type='button' onClick={() => this.handleSelectRoll(wisRoll)} value={wisRoll.value} disabled={wisRoll.assigned} />}
                {wisRoll && <span style={rollsStyle}>{wisRoll.text}</span>}<br/>
                <input type='button' onClick={() => this.handleSelectStat('CHR')} value='CHR' /> {selectedChar.chr}
                {chrRoll && <input type='button' onClick={() => this.handleSelectRoll(chrRoll)} value={chrRoll.value} disabled={chrRoll.assigned} />}
                {chrRoll && <span style={rollsStyle}>{chrRoll.text}</span>}<br/>
                <input type='button' onClick={() => this.handleAssign()} value='Assign' disabled={this.disableAssignButton()} />
                <input type='button' onClick={() => this.resetAssignments()} value='Reset' disabled={this.disableResetButton()} />
            </div>
        );
    }
}