import React, {Component} from 'react';
import RollOnceDisplay from './RollOnceDisplay';

export default class RollOnce extends Component {
    constructor(props) {
        super(props);

        this.state = {selectedChar: {}, rolls: []};

        this.rollStats = this.rollStats.bind(this);
    }

    rollStats() {
        let {selectedChar} = this.props;
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:42000/api/ADD2Character/rollstats/rollonce', true);
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

    render() {
        return (
            <div>
                <input type='button' onClick={this.rollStats} value='Roll Stats' /><br/>
                <RollOnceDisplay selectedChar={this.state.selectedChar} rolls={this.state.rolls} />
            </div>
        );
    }
}