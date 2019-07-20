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
        const rolls = await gateway.rollStats('rollstats/rolltwice');
        selectedChar.str = RollTwice.getHigherRoll(rolls[0], rolls[1]);
        selectedChar.dex = RollTwice.getHigherRoll(rolls[2], rolls[3]);
        selectedChar.con = RollTwice.getHigherRoll(rolls[4], rolls[5]);
        selectedChar.int = RollTwice.getHigherRoll(rolls[6], rolls[7]);
        selectedChar.wis = RollTwice.getHigherRoll(rolls[8], rolls[9]);
        selectedChar.chr = RollTwice.getHigherRoll(rolls[10], rolls[11]);
        this.setState({rolls: rolls, selectedChar: selectedChar});
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
                <button onClick={this.rollStats}>Roll Stats</button><br/>
                <p>The higher of two rolls is selected for each ability score</p>
                <RollTwiceDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <button onClick={this.handleUpdate}>Save Stats</button>
            </div>
        );
    }
}
