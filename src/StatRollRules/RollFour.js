import React, {Component} from 'react';
import RollFourDisplay from './RollFourDisplay';

export default class RollFour extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    static addThreeLargest(roll) {
        const sorted = roll.sort(function(a, b) {return b - a});
        let total = 0;
        for(let i = 0; i < 3; i++) {
            total += sorted[i];
        }
        return total;
    }

    async rollStats() {
        const {selectedChar, gateway} = this.props;
        const rolls = await gateway.rollStatsNew('rollstats/rollfour');
        selectedChar.str = RollFour.addThreeLargest(rolls[0]);
        selectedChar.dex = RollFour.addThreeLargest(rolls[1]);
        selectedChar.con = RollFour.addThreeLargest(rolls[2]);
        selectedChar.int = RollFour.addThreeLargest(rolls[3]);
        selectedChar.wis = RollFour.addThreeLargest(rolls[4]);
        selectedChar.chr = RollFour.addThreeLargest(rolls[5]);
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
                <input type='button' onClick={this.rollStats} value='Roll Stats' /><br/>
                <p>Only the three highest rolls are added to the ability score</p>
                <RollFourDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}