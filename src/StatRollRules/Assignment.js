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
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:42000/api/ADD2Character/rollstats/assignment', true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            this.setState({rolls: data});
        }.bind(this);
        xhr.send();
    }

    handleUpdate() {
        const {selectedChar} = this.state;
        if(selectedChar.str === 0 || selectedChar.dex === 0 || selectedChar.con === 0
            || selectedChar.int === 0 || selectedChar.wis === 0 || selectedChar.chr === 0) {
            alert('must assign stats to save');
        }
        else {
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