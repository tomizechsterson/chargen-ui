import React, {Component} from 'react';
import AssignmentDisplay from './AssignmentDisplay';
import Assignment2xDisplay from './Assignment2xDisplay';

export default class Assignment extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async rollStats() {
        const {double, gateway} = this.props;
        let currentChar = {...this.state.selectedChar};
        currentChar.str = currentChar.dex = currentChar.con =
            currentChar.int = currentChar.wis = currentChar.chr = undefined;
        let statRolls = [];
        const serviceMethod = double ? 'assignmentDouble' : 'assignment';

        const rolls = await gateway.rollStatsNew('rollstats/' + serviceMethod);
        for(let i = 0; i < rolls.length; i++) {
            statRolls.push({id: i, assigned: false, text: ' (' + rolls[i].join(' + ') + ')', value: rolls[i].reduce((a, b) => a + b, 0)});
        }
        this.setState({rolls: statRolls, selectedChar: currentChar});
    }

    handleUpdate() {
        const {selectedChar} = this.state;
        if(!selectedChar.str || !selectedChar.dex || !selectedChar.con
            || !selectedChar.int || !selectedChar.wis || !selectedChar.chr) {
            alert('must assign all stats to save');
        }
        else {
            this.props.selectedChar.str = selectedChar.str;
            this.props.selectedChar.dex = selectedChar.dex;
            this.props.selectedChar.con = selectedChar.con;
            this.props.selectedChar.int = selectedChar.int;
            this.props.selectedChar.wis = selectedChar.wis;
            this.props.selectedChar.chr = selectedChar.chr;
            this.props.selectedChar.completionStep++;
            this.props.onUpdate(this.props.selectedChar);
        }
    }

    render() {
        const {double} = this.props;
        const {selectedChar, rolls} = this.state;
        const pText = double ? 'Roll 12 and assign 6 to stats' : 'Assign 6 rolls to stats';
        return (
            <div>
                <input type='button' onClick={this.rollStats} value='Roll Stats' /><br/>
                <p>{pText}</p>
                {double && <Assignment2xDisplay selectedChar={selectedChar} rolls={rolls} />}
                {!double && <AssignmentDisplay selectedChar={selectedChar} rolls={rolls} />}
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}