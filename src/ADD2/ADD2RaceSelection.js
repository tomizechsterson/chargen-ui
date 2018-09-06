import React, {Component} from 'react';

export default class ADD2RaceSelection extends Component {
    render() {
        const {selectedChar} = this.props;
        return (
            <div>
                STR: {selectedChar.str} <br/>
                DEX: {selectedChar.dex} <br/>
                CON: {selectedChar.con} <br/>
                INT: {selectedChar.int} <br/>
                WIS: {selectedChar.wis} <br/>
                CHR: {selectedChar.chr} <br/>
            </div>
        );
    }
}