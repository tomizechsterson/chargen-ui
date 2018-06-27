import React, {Component} from 'react';

export default class RollOnce extends Component {
    constructor(props) {
        super(props);

        this.state = {str: 0, dex: 0, con: 0, int: 0, wis: 0, chr: 0};

        this.rollStats = this.rollStats.bind(this);
    }

    rollStats() {
        let {selectedChar} = this.props;
        const xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:42000/api/ADD2Character/rollstats/rollonce', true);
        xhr.onload = function() {
            const data = JSON.parse(xhr.responseText);
            selectedChar.str = data[0].reduce((a, b) => a + b, 0);
            console.log(data);
        };
        xhr.send();

        this.setState({str: selectedChar.str});
    }

    render() {
        const {selectedChar} = this.props;
        return (
            <div>
                <input type='button' onClick={this.rollStats} value='Roll Stats' /><br/>
                <p>
                    STR: {this.state.str} <br/>
                    DEX: {selectedChar.dex} <br/>
                    CON: {selectedChar.con} <br/>
                    INT: {selectedChar.int} <br/>
                    WIS: {selectedChar.wis} <br/>
                    CHR: {selectedChar.chr} <br/>
                </p>
            </div>
        );
    }
}