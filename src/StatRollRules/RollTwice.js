import React, {Component} from 'react';
import RollTwiceDisplay from './RollTwiceDisplay';

export default class RollTwice extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    static getHigherRoll(roll1, roll2) {
        let total1 = roll1.reduce((a, b) => a + b, 0);
        let total2 = roll2.reduce((a, b) => a + b, 0);

        return total1 > total2 ? total1 : total2;
    }

    rollStats() {
        const {selectedChar, gateway} = this.props;
        gateway.rollStats('rollstats/rolltwice', function(response) {
            selectedChar.str = RollTwice.getHigherRoll(response[0], response[1]);
            selectedChar.dex = RollTwice.getHigherRoll(response[2], response[3]);
            selectedChar.con = RollTwice.getHigherRoll(response[4], response[5]);
            selectedChar.int = RollTwice.getHigherRoll(response[6], response[7]);
            selectedChar.wis = RollTwice.getHigherRoll(response[8], response[9]);
            selectedChar.chr = RollTwice.getHigherRoll(response[10], response[11]);
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
                <p>The higher of two rolls is selected for each ability score</p>
                <RollTwiceDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}