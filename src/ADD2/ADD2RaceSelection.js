import React, {Component} from 'react';

export default class ADD2RaceSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {races: [], selectedRace: null};
    }

    componentDidMount() {
        const {gateway, selectedChar} = this.props;
        gateway.getRaces(selectedChar, function(response) {
            this.setState({races: response});
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    render() {
        const {races} = this.state;
        const {selectedChar} = this.props;
        const options = races.map(function(item) {
            let id = 0;
            return <option key={id + 1} value={item}>{item}</option>
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