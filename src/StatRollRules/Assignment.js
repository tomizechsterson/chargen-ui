import React, {Component} from 'react';
import AssignmentDisplay from './AssignmentDisplay';

export default class Assignment extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    rollStats() {
        let currentChar = {...this.state.selectedChar};
        currentChar.str = currentChar.dex = currentChar.con =
            currentChar.int = currentChar.wis = currentChar.chr = undefined;
        let statRolls = [];

        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:42000/api/ADD2Character/rollstats/assignment', true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            for(let i = 0; i < data.length; i++) {
                statRolls.push({id: i, assigned: false, text: ' (' + data[i].join(' + ') + ')', value: data[i].reduce((a, b) => a + b, 0)});
            }
            this.setState({rolls: statRolls, selectedChar: currentChar});
        }.bind(this);
        xhr.send();
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
        return (
            <div>
                <input type='button' onClick={this.rollStats} value='Roll Stats' /><br/>
                <p>Assign 6 rolls to stats</p>
                <AssignmentDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}