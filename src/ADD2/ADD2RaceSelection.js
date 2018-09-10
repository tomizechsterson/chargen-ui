import React, {Component} from 'react';

export default class ADD2RaceSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedRace: ''};

        this.handleRaceChange = this.handleRaceChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleRaceChange(e) {
        this.setState({selectedRace: e.target.value});
    }

    handleUpdate() {
        const {selectedRace} = this.state;
        if(!selectedRace)
            alert('must select a race to save');
        else {
            this.props.selectedChar.race = selectedRace;
            this.props.selectedChar.completionStep++;
            this.props.onUpdate(this.props.selectedChar);
        }
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
                <select onChange={this.handleRaceChange}>
                    <option key={-1} value='' />
                    {options}
                </select>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}