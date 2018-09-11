import React, {Component} from 'react';
import StatAdjustmentDisplay from "../GeneralDisplays/StatAdjustmentDisplay";

export default class ADD2RaceSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedRace: '', adjustments: undefined, selectedGender: ''};

        this.handleRaceChange = this.handleRaceChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleRaceChange(e) {
        this.setState({selectedRace: e.target.value});
        this.props.gateway.getAdjustments(e.target.value, function(response) {
            this.setState({adjustments: response});
        }.bind(this), function(error) {
            console.error(error);
        });
    }

    handleGenderChange(e) {
        this.setState({selectedGender: e.target.value});
    }

    handleUpdate() {
        const {selectedRace, adjustments, selectedGender} = this.state;
        const {selectedChar, onUpdate} = this.props;

        if(!selectedRace)
            alert('must select a race to save');
        else if(!selectedGender)
            alert('must select a gender to save');
        else {
            selectedChar.str += adjustments.str ? adjustments.str : 0;
            selectedChar.dex += adjustments.dex ? adjustments.dex : 0;
            selectedChar.con += adjustments.con ? adjustments.con : 0;
            selectedChar.int += adjustments.int ? adjustments.int : 0;
            selectedChar.wis += adjustments.wis ? adjustments.wis : 0;
            selectedChar.chr += adjustments.chr ? adjustments.chr : 0;
            selectedChar.race = selectedRace;
            selectedChar.gender = selectedGender;
            selectedChar.completionStep++;
            onUpdate(selectedChar);
        }
    }

    render() {
        const {selectedChar} = this.props;
        const {adjustments} = this.state;
        let id = 0;
        const options = selectedChar.availableRaces && selectedChar.availableRaces.map(function(item) {
            return <option key={id++} value={item}>{item}</option>
        });
        return (
            <div>
                <StatAdjustmentDisplay text={'STR: '} stat={selectedChar.str} adjustment={adjustments && adjustments.str}/>
                <StatAdjustmentDisplay text={'DEX: '} stat={selectedChar.dex} adjustment={adjustments && adjustments.dex}/>
                <StatAdjustmentDisplay text={'CON: '} stat={selectedChar.con} adjustment={adjustments && adjustments.con}/>
                <StatAdjustmentDisplay text={'INT: '} stat={selectedChar.int} adjustment={adjustments && adjustments.int}/>
                <StatAdjustmentDisplay text={'WIS: '} stat={selectedChar.wis} adjustment={adjustments && adjustments.wis}/>
                <StatAdjustmentDisplay text={'CHR: '} stat={selectedChar.chr} adjustment={adjustments && adjustments.chr}/>
                Select race:
                <select onChange={this.handleRaceChange}>
                    <option key={-1} value='' />
                    {options}
                </select>
                Select Gender:
                <input type='radio' name='gender' value='M' id='m' onChange={this.handleGenderChange}/><label htmlFor='m'>Male</label>
                <input type='radio' name='gender' value='F' id='f' onChange={this.handleGenderChange}/><label htmlFor='f'>Female</label>
                <br/>
                <button onClick={this.handleUpdate}>Save</button>
            </div>
        );
    }
}