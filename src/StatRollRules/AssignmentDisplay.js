import React, {Component} from 'react';

export default class AssignmentDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedStat: '', selectedRoll: ''};

        this.handleSelectStat = this.handleSelectStat.bind(this);
        this.handleSelectRoll = this.handleSelectRoll.bind(this);
    }

    assignStat(stat, roll) {
        if(stat === 'STR')
            this.props.selectedChar.str = roll;
        else if(stat === 'DEX')
            this.props.selectedChar.dex = roll;
        else if(stat === 'CON')
            this.props.selectedChar.con = roll;
        else if(stat === 'INT')
            this.props.selectedChar.int = roll;
        else if(stat === 'WIS')
            this.props.selectedChar.wis = roll;
        else if(stat === 'CHR')
            this.props.selectedChar.chr = roll;
    }

    handleSelectStat(stat) {
        if(this.state.selectedStat === stat)
            this.setState({selectedStat: ''});
        else {
            if(this.state.selectedRoll !== '') {
                console.log('assigning ' + this.state.selectedRoll + ' to stat ' + stat);
                this.assignStat(stat, this.state.selectedRoll);
            }
            else
                this.setState({selectedStat: stat});
        }
    }

    handleSelectRoll(roll) {
        this.setState({selectedRoll: roll});
    }

    render() {
        const {selectedChar} = this.props;
        const rollsStyle = {
            color: '#999'
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
            </div>
        );
    }
}