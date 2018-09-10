import React, {Component} from 'react';

export default class ADD2RaceSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedRace: null};
    }

    render() {
        const {selectedChar} = this.props;
        let id = 0;
        const options = selectedChar.availableRaces.map(function(item) {
            return <option key={id++} value={item}>{item}</option>
        });
        return (
            <div>
                STR: {selectedChar.str} <br/>
                DEX: {selectedChar.dex} <br/>
                CON: {selectedChar.con} <br/>
                INT: {selectedChar.int} <br/>
                WIS: {selectedChar.wis} <br/>
                CHR: {selectedChar.chr} <br/>
                Select race:
                <select>
                    {options}
                </select>
            </div>
        );
    }
}