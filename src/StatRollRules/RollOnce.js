import React, {Component} from 'react';
import RollOnceDisplay from './RollOnceDisplay';

export default class RollOnce extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async rollStats() {
        const {selectedChar, gateway} = this.props;
        const stats = await gateway.rollStatsNew('rollstats/rollonce');
        selectedChar.str = stats[0].reduce((a, b) => a + b, 0);
        selectedChar.dex = stats[1].reduce((a, b) => a + b, 0);
        selectedChar.con = stats[2].reduce((a, b) => a + b, 0);
        selectedChar.int = stats[3].reduce((a, b) => a + b, 0);
        selectedChar.wis = stats[4].reduce((a, b) => a + b, 0);
        selectedChar.chr = stats[5].reduce((a, b) => a + b, 0);
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
                <RollOnceDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
                <input type='button' onClick={this.handleUpdate} value='Save Stats' />
            </div>
        );
    }
}