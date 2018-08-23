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
        const {selectedChar} = this.props;
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'https://add2ent.azurewebsites.net/api/ADD2Character/rollstats/rolltwice', true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            selectedChar.str = RollTwice.getHigherRoll(data[0], data[1]);
            selectedChar.dex = RollTwice.getHigherRoll(data[2], data[3]);
            selectedChar.con = RollTwice.getHigherRoll(data[4], data[5]);
            selectedChar.int = RollTwice.getHigherRoll(data[6], data[7]);
            selectedChar.wis = RollTwice.getHigherRoll(data[8], data[9]);
            selectedChar.chr = RollTwice.getHigherRoll(data[10], data[11]);
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
                <p>The higher of two rolls is selected for each ability score</p>
                <RollTwiceDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}