import React, {Component} from 'react';

export default class AssignmentDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedStat: '', selectedRoll: ''};
    }

    handleSelectStat(stat) {
        if(this.state.selectedStat === stat)
            this.setState({selectedStat: ''});
        else
            this.setState({selectedStat: stat});
    }

    handleSelectRoll(roll) {
        if(this.state.selectedRoll === roll)
            this.setState({selectedRoll: ''});
        else
            this.setState({selectedRoll: roll});
    }

    handleAssign() {
        if(this.state.selectedStat === 'STR')
            this.props.selectedChar.str = this.state.selectedRoll;
        else if(this.state.selectedStat === 'DEX')
            this.props.selectedChar.dex = this.state.selectedRoll;
        else if(this.state.selectedStat === 'CON')
            this.props.selectedChar.con = this.state.selectedRoll;
        else if(this.state.selectedStat === 'INT')
            this.props.selectedChar.int = this.state.selectedRoll;
        else if(this.state.selectedStat === 'WIS')
            this.props.selectedChar.wis = this.state.selectedRoll;
        else if(this.state.selectedStat === 'CHR')
            this.props.selectedChar.chr = this.state.selectedRoll;

        this.setState({selectedStat: '', selectedRoll: ''});
    }

    clearStat() {
        if(this.state.selectedStat === 'STR')
            this.props.selectedChar.str = undefined;
        else if(this.state.selectedStat === 'DEX')
            this.props.selectedChar.dex = undefined;
        else if(this.state.selectedStat === 'CON')
            this.props.selectedChar.con = undefined;
        else if(this.state.selectedStat === 'INT')
            this.props.selectedChar.int = undefined;
        else if(this.state.selectedStat === 'WIS')
            this.props.selectedChar.wis = undefined;
        else if(this.state.selectedStat === 'CHR')
            this.props.selectedChar.chr = undefined;

        this.setState({selectedStat: ''});
    }

    render() {
        const {selectedChar} = this.props;
        const rollsStyle = {
            color: '#999'
        };
        const assignButtonStyle = {
            display: this.state.selectedStat && this.state.selectedRoll ? 'inline' : 'none'
        };
        const clearButtonStyle = {
            display: this.state.selectedStat ? 'inline' : 'none'
        };

        let strRolls = '', dexRolls = '', conRolls = '', intRolls = '', wisRolls = '', chrRolls = '';
        let strTotal = '', dexTotal = '', conTotal = '', intTotal = '', wisTotal = '', chrTotal = '';

        if(this.props.rolls.length > 0) {
            strRolls = ' (' + this.props.rolls[0].join(' + ') + ')';
            strTotal = this.props.rolls[0].reduce((a, b) => a + b, 0);
            dexRolls = ' (' + this.props.rolls[1].join(' + ') + ')';
            dexTotal = this.props.rolls[1].reduce((a, b) => a + b, 0);
            conRolls = ' (' + this.props.rolls[2].join(' + ') + ')';
            conTotal = this.props.rolls[2].reduce((a, b) => a + b, 0);
            intRolls = ' (' + this.props.rolls[3].join(' + ') + ')';
            intTotal = this.props.rolls[3].reduce((a, b) => a + b, 0);
            wisRolls = ' (' + this.props.rolls[4].join(' + ') + ')';
            wisTotal = this.props.rolls[4].reduce((a, b) => a + b, 0);
            chrRolls = ' (' + this.props.rolls[5].join(' + ') + ')';
            chrTotal = this.props.rolls[5].reduce((a, b) => a + b, 0);
        }

        return (
            <div>
                Selected stat: {this.state.selectedStat}, Selected Roll: {this.state.selectedRoll} <br/>
                <input type='button' onClick={() => this.handleSelectStat('STR')} value='STR' /> {selectedChar.str} {strTotal !== '' && <input type='button' onClick={() => this.handleSelectRoll(strTotal)} value={strTotal} />} <span style={rollsStyle}>{strRolls}</span><br/>
                <input type='button' onClick={() => this.handleSelectStat('DEX')} value='DEX' /> {selectedChar.dex} {dexTotal !== '' && <input type='button' onClick={() => this.handleSelectRoll(dexTotal)} value={dexTotal} />} <span style={rollsStyle}>{dexRolls}</span><br/>
                <input type='button' onClick={() => this.handleSelectStat('CON')} value='CON' /> {selectedChar.con} {conTotal !== '' && <input type='button' onClick={() => this.handleSelectRoll(conTotal)} value={conTotal} />} <span style={rollsStyle}>{conRolls}</span><br/>
                <input type='button' onClick={() => this.handleSelectStat('INT')} value='INT' /> {selectedChar.int} {intTotal !== '' && <input type='button' onClick={() => this.handleSelectRoll(intTotal)} value={intTotal} />} <span style={rollsStyle}>{intRolls}</span><br/>
                <input type='button' onClick={() => this.handleSelectStat('WIS')} value='WIS' /> {selectedChar.wis} {wisTotal !== '' && <input type='button' onClick={() => this.handleSelectRoll(wisTotal)} value={wisTotal} />} <span style={rollsStyle}>{wisRolls}</span><br/>
                <input type='button' onClick={() => this.handleSelectStat('CHR')} value='CHR' /> {selectedChar.chr} {chrTotal !== '' && <input type='button' onClick={() => this.handleSelectRoll(chrTotal)} value={chrTotal} />} <span style={rollsStyle}>{chrRolls}</span><br/>
                <input type='button' onClick={() => this.handleAssign()} value='Assign Stat' style={assignButtonStyle} />
                <input type='button' onClick={() => this.clearStat()} value='Clear Stat' style={clearButtonStyle} />
            </div>
        );
    }
}