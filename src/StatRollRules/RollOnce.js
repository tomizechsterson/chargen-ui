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
        const {selectedChar, gateway} = this.props;
        gateway.rollOnce(function(response) {
            selectedChar.str = response[0].reduce((a, b) => a + b, 0);
            selectedChar.dex = response[1].reduce((a, b) => a + b, 0);
            selectedChar.con = response[2].reduce((a, b) => a + b, 0);
            selectedChar.int = response[3].reduce((a, b) => a + b, 0);
            selectedChar.wis = response[4].reduce((a, b) => a + b, 0);
            selectedChar.chr = response[5].reduce((a, b) => a + b, 0);
            this.setState({rolls: response, selectedChar: selectedChar});
        }.bind(this), function(error) {
            console.error(error);
        });
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