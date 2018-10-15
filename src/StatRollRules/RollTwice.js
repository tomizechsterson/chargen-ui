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

    async rollStats() {
        const {selectedChar, gateway} = this.props;
        const stats = await gateway.rollStatsNew('rollstats/rolltwice');
        selectedChar.str = RollTwice.getHigherRoll(stats[0], stats[1]);
        selectedChar.dex = RollTwice.getHigherRoll(stats[2], stats[3]);
        selectedChar.con = RollTwice.getHigherRoll(stats[4], stats[5]);
        selectedChar.int = RollTwice.getHigherRoll(stats[6], stats[7]);
        selectedChar.wis = RollTwice.getHigherRoll(stats[8], stats[9]);
        selectedChar.chr = RollTwice.getHigherRoll(stats[10], stats[11]);
        this.setState({rolls: stats, selectedChar: selectedChar});
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