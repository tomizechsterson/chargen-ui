import React, {Component} from 'react';
import RollOnceDisplay from './RollOnceDisplay';

export default class RollOnce extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    rollStats() {
        const {selectedChar, apiUrl} = this.props;
        const xhr = new XMLHttpRequest();
        xhr.open('get', apiUrl + 'rollstats/rollonce', true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            selectedChar.str = data[0].reduce((a, b) => a + b, 0);
            selectedChar.dex = data[1].reduce((a, b) => a + b, 0);
            selectedChar.con = data[2].reduce((a, b) => a + b, 0);
            selectedChar.int = data[3].reduce((a, b) => a + b, 0);
            selectedChar.wis = data[4].reduce((a, b) => a + b, 0);
            selectedChar.chr = data[5].reduce((a, b) => a + b, 0);
            this.setState({rolls: data, selectedChar: selectedChar});
        }.bind(this);
        xhr.send();
    }

    handleUpdate() {
        const {selectedChar, onUpdate} = this.props;
        if(this.state.rolls.length === 0) {
            alert('must roll stats to save');
        }
        else {
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
    }

    render() {
        return (
            <div>
                <input type='button' onClick={this.rollStats} value='Roll Stats' /><br/>
                <RollOnceDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}